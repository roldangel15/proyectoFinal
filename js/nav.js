import { getAlojamientos, renderCards } from '/js/main.js';

const elEncabezado = document.getElementById('encabezado');


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

function barraNavExpandida( ) {
  
  //  REEMPLAZA COMPLETAMENTE el contenido del encabezado
  elEncabezado.innerHTML = `
    <div class="relative z-20 max-w-5xl mx-auto mt-4 md:mt-10 px-4">
      <div class="flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-2">
        <div class="flex-1 px-6 py-2 rounded-full hover:bg-gray-100 cursor-pointer transition relative">
          <label class="block text-xs font-bold text-gray-800 tracking-wide">LOCATION</label>
          <input id="inputLocation" type="text" placeholder="Where to?" value="" class="text-sm text-gray-700 w-full outline-none bg-transparent" />
          <- aqui podemos agregar las coincidencias de la busqueda ->
        </div>
        <div class="h-8 w-px bg-gray-300 hidden md:block"></div>
        <div class="flex-1 px-6 py-2 rounded-full hover:bg-gray-100 cursor-pointer transition relative">
          <label class="block text-xs font-bold text-gray-800 tracking-wide">GUESTS</label>
          <input id="inputGuests" type="text" placeholder="Add guests" value="" class="text-sm text-gray-700 w-full outline-none bg-transparent" readonly />
          
        </div>
        <button id="btnSearchExpanded" class="bg-[#FF385C] hover:bg-[#E0314F] text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 transition ml-2">
          <img src="./src/images/icons/search.svg" alt="search" class="h-5 w-5">
          <span>Search</span>
        </button>
      </div>
    </div>
  `;

}


barraNavReplegada();

const inputLugares = document.getElementById('lugares');

inputLugares.addEventListener('click',barraNavExpandida);

