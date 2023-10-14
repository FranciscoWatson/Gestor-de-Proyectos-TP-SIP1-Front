function drag(event) {
    event.dataTransfer.setData("text", event.target.id)
}

function allowDrop(event) {
    event.preventDefault()
}

function drop(event) {
    event.preventDefault()
    const data = event.dataTransfer.getData("text")
    event.currentTarget.appendChild(document.getElementById(data))
}

document.addEventListener('DOMContentLoaded', function () {
        var currentURL = window.location.href;
        var url = new URL(currentURL);
        var id = url.searchParams.get('id');

        // Verificar si 'id' tiene un valor
        if (id !== null) {
            console.log("El valor del parámetro 'id' es: " + id);
        } else {
            console.log("El parámetro 'id' no está presente en la URL.");
        }
      
        var apiUrl = 'http://173.230.135.41:8080/tablero/tareas/?id=' + id;

        const pendientes = document.getElementById('pendientes');
        const procesos = document.getElementById('procesos');
        const completados = document.getElementById('completados');

    fetch(apiUrl)  // Reemplaza con la URL de tu API
        .then(response => response.json())
        .then(data => {
            data.forEach(tarea => {

	 const divElemento = document.createElement('div');
         divElemento.classList.add('tarea')
         divElemento.setAttribute('id', tarea.id)
         divElemento.setAttribute('draggable', true)
         divElemento.setAttribute('ondragstart', 'drag(event)')
        
	 const p1 = document.createElement('p');
	 p1.textContent = tarea.nombre;

         const p2 = document.createElement('p');
         p2.textContent = tarea.descripcion;

	 const p3 = document.createElement('p');
         p3.textContent = tarea.usuario;

         divElemento.appendChild(p1);
         divElemento.appendChild(p2);
         divElemento.appendChild(p3);


                if (tarea.estado === 'P') {
                    pendientes.appendChild(divElemento);
                } else if (tarea.estado === 'I') {
                    procesos.appendChild(divElemento);
                } else if (tarea.estado === 'F') {
                    completados.appendChild(divElemento);
                } else {

                }
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
});

