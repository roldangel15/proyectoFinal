async function leerDatos() {
    try {
        const respuesta = await fetch('/stays.json');
        if (!respuesta.ok) {
            throw new Error(`Error al cargar el archivo: ${respuesta.statusText}`);
        }
        
        const datos = await respuesta.json(); // Convierte a objeto o arreglo
        
        return datos;
       
    } catch (error) {
        console.error("Hubo un error:", error);
    }
}

export function renderCards(lista) {
  const departamentos = document.getElementById('departamentos');
  const stayContador = document.getElementById('stayContador');
  
  if (!departamentos) return;
  
  if (!lista || lista.length === 0) {
    departamentos.innerHTML = `
      <div class="col-span-full text-center py-12 text-red-500">
        <p class="text-lg font-semibold">No se pudieron cargar los alojamientos.</p>
        <p class="text-sm mt-2 text-gray-600">Hubo error de red al cargar la pagina.</p>
      </div>
    `;
    if (stayContador) stayContador.textContent = `0 stays`;
    return;
  }

  let cardDepartamentos = "";
  for (const alojamiento of lista) {
    
    cardDepartamentos += `
      <div class="space-y-3">
        <div class="aspect-[4/3] w-full border-2 border-blue-500 rounded-3xl overflow-hidden">
          <img src="${alojamiento.photo}" alt="${alojamiento.title}" class="w-full h-full object-cover">
        </div>
        <div class="flex justify-between items-start">
          <div>
            ${alojamiento.superHost ? `<span class="text-xs font-bold border border-gray-800 rounded-full px-2 py-1 uppercase">Super Host</span>` : ''}
            <p class="mt-2 text-sm text-gray-500">${alojamiento.type} · ${alojamiento.beds}</p>
          </div>
          <div class="flex items-center text-sm">
            <span class="text-red-500 mr-1">★</span> ${alojamiento.rating}
          </div>
        </div>
        <p class="font-semibold">${alojamiento.title}</p>
      </div>
    `;
  }
  departamentos.innerHTML = cardDepartamentos;
  if (stayContador) {
    stayContador.textContent = `${lista.length} stays`;
  }
}


let alojamientos = [];

export async function initApp() {
  alojamientos = await leerDatos();
  renderCards(alojamientos);
}


export function getAlojamientos() {
  return alojamientos;
}

// Iniciar la aplicación automáticamente al cargar el módulo
initApp();