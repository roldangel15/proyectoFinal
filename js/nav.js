import { getAlojamientos, renderCards } from '/js/main.js';

const elEncabezado = document.getElementById('encabezado');



function agregarNavHuesped() {
  return `
    <div class="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-30">
      <div class="mb-6">
        <h3 class="text-base font-bold text-gray-900">Adults</h3>
        <p class="text-sm text-gray-400 mb-3">Ages 13 or above</p>
        <div class="flex items-center gap-4">
          <button class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 transition text-lg font-light" data-action="adults-minus">−</button>
          <span id="spanAdults" class="text-base font-medium text-gray-800 w-6 text-center"> </span>
          <button class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 transition text-lg font-light" data-action="adults-plus">+</button>
        </div>
      </div>
      <div class="h-px bg-gray-100 mb-6"></div>
      <div>
        <h3 class="text-base font-bold text-gray-900">Children</h3>
        <p class="text-sm text-gray-400 mb-3">Ages 0-12</p>
        <div class="flex items-center gap-4">
          <button class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 transition text-lg font-light" data-action="children-minus">−</button>
          <span id="spanChildren" class="text-base font-medium text-gray-800 w-6 text-center"> </span>
          <button class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 transition text-lg font-light" data-action="children-plus">+</button>
        </div>
      </div>
    </div>
  `;
}

function agregarNavLocation()
{
   
    let html = `
    <div class="absolute top-full left-0 mt-3 w-full min-w-[300px] md:min-w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-30">
      <div class="px-6 py-4 border-b border-gray-100">
        <h3 class="text-sm font-bold text-gray-900">Search destinations</h3>
        <p class="text-xs text-gray-500 mt-1">Try searching for a city, region, or country</p>
      </div>
      <div class="py-2 max-h-80 overflow-y-auto">

      
        <div class="px-6 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3 transition" data-action="select-city" data-ciudad="">
          <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <img src="./src/images/icons/location.svg" alt="location" class="h-5 w-5">
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-semibold text-gray-900">Cochabamba, Bolivia</h4>
            <p class="text-xs text-gray-500 mt-0.5">City in Finland</p>
          </div>
        </div>
        </div>
      <div class="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <button class="text-xs font-semibold text-[#FF385C] hover:underline" data-action="clear-recent">Clear all</button>
      </div>
    </div>
    `;
    return html;
   

}




function barraNavReplegada() {
   elEncabezado.innerHTML = `
    <nav class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 mb-8">
      <img
        src="/src/images/icons/logo-f7862584.svg"
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
          value=""
        />
        <input
          class="p-2.5 shadow w-33 outline-none cursor-pointer"
          type="text"
          readonly
          placeholder="   Add guests"
          id="huespedes"
          value=""
        />
        <button id="btnSearch" class="p-3.5 shadow rounded-r-2xl lg:right-20 cursor-pointer">
          <img src="/src/images/icons/search.svg" alt="search-icon" class="w-4" />
        </button>
      </span>
    </nav>
  `;
}



function barraNavExpandida(opcion) {
  
   let agregarLocalidadHtml = opcion === 'location' ? agregarNavLocation():'';
  
  let agregarHuespedHtml = opcion === 'huesped' ? agregarNavHuesped():'';
  

  //  REEMPLAZA COMPLETAMENTE el contenido del encabezado
  elEncabezado.innerHTML = `
    <div class="relative z-20 max-w-5xl mx-auto mt-4 md:mt-10 px-4">
      <div class="flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-2">
        <div class="flex-1 px-6 py-2 rounded-full hover:bg-gray-100 cursor-pointer transition relative">
          <label class="block text-xs font-bold text-gray-800 tracking-wide">LOCATION</label>
          <input id="lugares" type="text" placeholder="Where to?" value="" class="text-sm text-gray-700 w-full outline-none bg-transparent" />
          ${agregarLocalidadHtml}
        </div>
        <div class="h-8 w-px bg-gray-300 hidden md:block"></div>
        <div class="flex-1 px-6 py-2 rounded-full hover:bg-gray-100 cursor-pointer transition relative">
          <label class="block text-xs font-bold text-gray-800 tracking-wide">GUESTS</label>
          <input id="huespedes" type="text" placeholder="Add guests" value="" class="text-sm text-gray-700 w-full outline-none bg-transparent" readonly />
          ${agregarHuespedHtml}
        </div>
        <button id="btnSearchExpanded" class="bg-[#FF385C] hover:bg-[#E0314F] text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 transition ml-2">
          <img src="./src/images/icons/search.svg" alt="search" class="h-5 w-5">
          <span>Search</span>
        </button>
      </div>
    </div>
  `;

}


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

});



barraNavReplegada();

/*const inputHuespedes = document.getElementById('huespedes');

inputHuespedes.addEventListener('click',barraNavExpandida('huesped'));




const inputLugares = document.getElementById('lugares');

inputLugares.addEventListener('click',barraNavExpandida('location'));


*/
