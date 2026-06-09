import { getAlojamientos, renderCards } from './main.js';

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

barraNavReplegada();


