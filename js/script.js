
function drag(event) {
    event.dataTransfer.setData("text", event.target.id)
}

function allowDrop(event) {
    event.preventDefault()
}

document.addEventListener('DOMContentLoaded', function () {
    const pendientes = document.getElementById('pendientes');
    const procesos = document.getElementById('procesos');
    const completados = document.getElementById('completados');

    fetch('http://173.230.135.41:8080/tablero/tarea/')  // Reemplaza con la URL de tu API
        .then(response => response.json())
        .then(data => {
            data.forEach(tarea => {

	 const divElemento = document.createElement('div');
         divElemento.classList.add('tarea')
//         divTarea.setAttribute('id', tarea.id)
         divElemento.setAttribute('draggable', true)
         divElemento.setAttribute('ondragstart', 'drag(event)')
	 const p1 = document.createElement('p');
	 p1.textContent = tarea.nombre;

         const p2 = document.createElement('p');
         p2.textContent = tarea.descripcion;

	 const p3 = document.createElement('p');
         p3.textContent = 'Jorge Segovia';

         divElemento.appendChild(p1);
         divElemento.appendChild(p2);
         divElemento.appendChild(p3);


    // Agrega el nuevo div con los elementos al div específico
    //    miDiv.appendChild(divElemento);

//                const listItem = document.createElement('li');
  //              listItem.textContent = `Nombre de la tarea: ${tarea.nombre}`;

                // Verificar el estado de la tarea y adjuntarla al contenedor correspondiente
                if (tarea.estado === 'P') {
                    pendientes.appendChild(divElemento);
                } else if (tarea.estado === 'I') {
                    procesos.appendChild(divElemento);
                } else if (tarea.estado === 'F') {
                    completados.appendChild(divElemento);
                } else {
                    // Si el estado es desconocido, puedes manejarlo de acuerdo a tus necesidades
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
});

