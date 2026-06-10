//importamos las dos funciones que usaremosde main.js
import { getAlojamientos, renderCards } from '/js/main.js';

// por "elEncabezado" cambiaremos de manera dinamica la barra de navegacion
const elEncabezado = document.getElementById('encabezado');

// el objeto "filtros" se usara para actualizar y realizar los filtros de busqueda
let filtros = {
  location: '',
  adultos: 0,
  menores: 0
};

/**
 * 
 * @returns aplica los filtros de busqueda por lugar y nro de huespedes que provee el Apartamento y actualiza segun el filtro la grilla de apartamentos disponibles
 * 
 */
function aplicarFiltros() {
  const todos = getAlojamientos();
  if (!todos || todos.length === 0) return;

  const filtrados = todos.filter(a => {
    const coincideLocation = !filtros.location || 
      a.city.toLowerCase().includes(filtros.location.toLowerCase()) || 
      a.country.toLowerCase().includes(filtros.location.toLowerCase());
    
     const totalGuests = filtros.adultos + filtros.menores;
     const coincideGuests = totalGuests === 0 || a.maxGuests >= totalGuests;

    return coincideLocation && coincideGuests;
  });

  renderCards(filtrados);
}



/**
 * 
 * @returns en la barra de navegacion en la parte de de Guests despliega el cuadro para aumentar el numero de Huespedes, adultos y niños o menores
 */

function agregarNavHuesped() {
  return `
    <div class="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-30">
      <div class="mb-6">
        <h3 class="text-base font-bold text-gray-900">Adults</h3>
        <p class="text-sm text-gray-400 mb-3">Ages 13 or above</p>
        <div class="flex items-center gap-4">
          <button class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 transition text-lg font-light" data-action="disminuye-adultos">−</button>
          <span id="cantAdultos" class="text-base font-medium text-gray-800 w-6 text-center">${filtros.adultos}</span>
          <button class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 transition text-lg font-light" data-action="aumenta-adultos">+</button>
        </div>
      </div>
      <div class="h-px bg-gray-100 mb-6"></div>
      <div>
        <h3 class="text-base font-bold text-gray-900">Children</h3>
        <p class="text-sm text-gray-400 mb-3">Ages 0-12</p>
        <div class="flex items-center gap-4">
          <button class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 transition text-lg font-light" data-action="disminuye-menores">−</button>
          <span id="cantMenores" class="text-base font-medium text-gray-800 w-6 text-center">${filtros.menores}</span>
          <button class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 transition text-lg font-light" data-action="aumenta-menores">+</button>
        </div>
      </div>
    </div>
  `;
}
/**
 * funcion que se encarga de aumentar o desplegar en la parte de abajo de Location de la barra de navegacion las coincidencias de busqueda
 * @param {es el texto que escribe en "Location"} valorBusqueda 
 * @returns las coincidencias de busqueda que se desplegaran
 */
function agregarNavLocation(valorBusqueda)
{ 
  const alojamientos = getAlojamientos();
  if (!alojamientos) return '';
  
  
  const ciudades = alojamientos
  .reduce((acc, a) => {
    if (!acc.some(item => item.city === a.city && item.country === a.country)) {
      acc.push({ city: a.city, country: a.country });
    }
    return acc;
  }, [])
  .sort((a, b) => a.city.localeCompare(b.city));

  const ciudadesFiltradas = ciudades.filter(c => c.city.toLowerCase().includes(valorBusqueda.toLowerCase()));
  
  
  
   
  let html = `
    <div class="absolute top-full left-0 mt-3 w-full min-w-[300px] md:min-w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-30">
      <div class="px-6 py-4 border-b border-gray-100">
        <h3 class="text-sm font-bold text-gray-900">Search destinations</h3>
        <p class="text-xs text-gray-500 mt-1">Try searching for a city, region, or country</p>
      </div>
      <div class="py-2 max-h-80 overflow-y-auto">
  `;  

  if (ciudadesFiltradas.length === 0 && valorBusqueda) {
    html += `<div class="px-6 py-8 text-center"><p class="text-sm text-gray-500">No destinations found for "${valorBusqueda}"</p></div>`;
  } else {
    ciudadesFiltradas.forEach(ciudad => {
      html += `
        <div class="px-6 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3 transition" data-action="select-city" data-ciudad="${ciudad.city}">
          <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <img src="./src/images/icons/location.svg" alt="location" class="h-5 w-5">
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-semibold text-gray-900">${ciudad.city}, ${ciudad.country}</h4>
            <p class="text-xs text-gray-500 mt-0.5">City in ${ciudad.country}</p>
          </div>
        </div>
      `;
    });
  }
 
 html += `
      </div>

    </div>
  `;
  return html;


}

/** 
 * Actualiza los datos en lo concerniente a Guests de la barra de navegacion
*/
function actualizarHuespedNav() {
  const cantAdultos = document.getElementById('cantAdultos');
  const cantMenores = document.getElementById('cantMenores');
  const inputGuests = document.getElementById('huespedes');
  
  if (cantAdultos) cantAdultos.textContent = filtros.adultos;
  if (cantMenores) cantMenores.textContent = filtros.menores;
  
  const totalGuests = filtros.adultos + filtros.menores;
  if (inputGuests) {
    inputGuests.value = totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : '';
  }
}

/**
 * Muestra la barra de navegacion resumida a 3 bontones
 */

function barraNavReplegada() {

  const locationValue = filtros.location || '';
  const totalGuests = filtros.adultos + filtros.menores;
  const guestsValue = totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : '';

  elEncabezado.innerHTML = `
    <nav class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 mb-8">
      <img
        src="./src/images/icons/logo-f7862584.svg"
        alt="logo-windbnb"
        class="p-4 lg:px-10 lg:py-6"
      />
      <span class="flex px-7 py-5 relative justify-center lg:w-1/2 lg:justify-center">
        <input
          type="text"
          readonly
          class="p-2.5 rounded-l-2xl shadow w-33 outline-none cursor-pointer"
          placeholder="  Add location"
          id="lugares"
          value="${locationValue}"
        />
        <input
          class="p-2.5 shadow w-33 outline-none cursor-pointer"
          type="text"
          readonly
          placeholder="   Add guests"
          id="huespedes"
          value="${guestsValue}"
        />
        <button id="btnSearch" class="p-3.5 shadow rounded-r-2xl lg:right-20 cursor-pointer">
          <img src="./src/images/icons/search.svg" alt="search-icon" class="w-4" />
        </button>
      </span>
    </nav>
  `;
}

/**
 * Muestra la barra de navegacion desplegada segun la busqueda que se desea realizar
 */

function barraNavExpandida(opcion = 'location') {
  
  const totalGuests = filtros.adultos + filtros.menores;
  const guestsText = totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : '';

  let agregarLocalidadHtml = opcion === 'location' ? agregarNavLocation(filtros.location):'';
  let agregarHuespedHtml = opcion === 'huesped' ? agregarNavHuesped():'';
  

  //  REEMPLAZA COMPLETAMENTE el contenido del encabezado
    elEncabezado.innerHTML = `
   <nav class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 mb-8"> 
    <img
        src="./src/images/icons/logo-f7862584.svg"
        alt="logo-windbnb"
        class="p-4 lg:px-10 lg:py-6"
      />

    <div class="relative z-20 max-w-5xl mx-auto mt-4 md:mt-10 px-4">
      
      <div class="flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-2 hover:shadow-lg border border-gray-200 focus-within:border-[#FF385C] focus-within:ring-4 focus-within:ring-[#FF385C]/10 focus-within:-translate-y-1 p-2 gap-2 md:gap-0 transition-all duration-300">
        <div class="flex-1 px-6 py-2 rounded-full hover:bg-gray-100 cursor-pointer transition relative">
          <label class="block text-xs font-bold text-gray-800 tracking-wide">LOCATION</label>
          <input id="lugares" type="text" placeholder="Where to?" value="${filtros.location}" class="text-sm text-gray-700 w-full outline-none bg-transparent" />
          ${agregarLocalidadHtml}
        </div>
        <div class="h-8 w-px bg-gray-300 hidden md:block"></div>
        <div class="flex-1 px-6 py-2 rounded-full hover:bg-gray-100 cursor-pointer transition relative">
          <label class="block text-xs font-bold text-gray-800 tracking-wide">GUESTS</label>
          <input id="huespedes" type="text" placeholder="Add guests" value="${guestsText}" class="text-sm text-gray-700 w-full outline-none bg-transparent" readonly />
          ${agregarHuespedHtml}
        </div>
        <button id="btnSearchExpanded" class="bg-[#FF385C] hover:bg-[#E0314F] text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 transition ml-2">
          <img src="./src/images/icons/search.svg" alt="search" class="h-5 w-5">
          <span>Search</span>
        </button>
      </div>
    </div>
  </nav>
  `;
   setTimeout(() => {
    
    const input = opcion === 'location' ? document.getElementById('lugares') : document.getElementById('huespedes');
    
    if (input) {
      input.focus();
      if (opcion === 'location') {
        
        const val = input.value;
        input.value = '';
        input.value = val;
      }
    }
  }, 0);

}


//-----------------------------------------

// control y  delegacion de eventos delegacion
//--------------------

document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-action]') || e.target;
  const action = target.getAttribute('data-action');
  
  if (target.id === 'lugares') {
    e.preventDefault();
    barraNavExpandida('location');
    return;
  }
 
  if (target.id === 'huespedes') {
    e.preventDefault();
    barraNavExpandida('huesped');
    return;
   
  }

  if (target.id === 'btnSearch') {
    aplicarFiltros();
    return;
  }

  if (target.id === 'lugares' || target.closest('#lugares')) {
    barraNavExpandida('location');
    return;
  }

  if (target.id === 'huespedes' || target.closest('#huespedes')) {
    barraNavExpandida('huesped');
    return;
  }


  if (action === 'select-city') {
    const ciudad = target.getAttribute('data-ciudad') || target.closest('[data-ciudad]').getAttribute('data-ciudad');
    filtros.location = ciudad;
    aplicarFiltros();
    barraNavReplegada();
    return;
  }

  if (action === 'aumenta-adultos') {
    filtros.adultos++;
    actualizarHuespedNav();
    aplicarFiltros();
    return;
  }
  if (action === 'disminuye-adultos' && filtros.adultos > 0) {
    filtros.adultos--;
    actualizarHuespedNav();
    aplicarFiltros();
    return;
  }
  if (action === 'aumenta-menores') {
    filtros.menores++;
    actualizarHuespedNav();
    aplicarFiltros();
    return;
  }
  if (action === 'disminuye-menores' && filtros.menores > 0) {
    filtros.menores--;
    actualizarHuespedNav();
    aplicarFiltros();
    return;
  }

  if (target.id === 'btnSearchExpanded' || target.closest('#btnSearchExpanded')) {
    aplicarFiltros();
    barraNavReplegada();
    return;
  }
  // Cerrar al hacer clic fuera
  const searchContainer = document.querySelector('.relative.z-20');
  if (searchContainer && !searchContainer.contains(e.target)) {
    barraNavReplegada();
  }
});

document.addEventListener('input', (e) => {
  if (e.target.id === 'lugares') {
    filtros.location = e.target.value.trim(); //almacenamos cada caracter que escribe
    const locationContenedor = e.target.parentElement;
    const existMenuDesplegable = locationContenedor.querySelector('.absolute');
  
    if (existMenuDesplegable) {
      existMenuDesplegable.outerHTML = agregarNavLocation(filtros.location);
    }
    aplicarFiltros();
  }
});

barraNavReplegada();


