var jsonData;  // Variable global para almacenar los datos JSON

document.addEventListener("DOMContentLoaded", function () {
    // Cargar JSON de manera asíncrona
    fetch('../excel/Libro1.json')
        .then(response => response.json())
        .then(data => {
            // Asignar datos a la variable global
            jsonData = data;
            // Llamar a la función para cargar tarjetas desde el JSON
            loadCardsFromJSON();
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});

// Función para cargar tarjetas desde el JSON
function loadCardsFromJSON() {
    // Obtén la referencia al contenedor de resultados
    var resultsContainer = document.getElementById("results");

    // Itera sobre los elementos del JSON y crea tarjetas dinámicamente
    jsonData.forEach(cardData => {
        var cardHTML = createCardHTML(cardData);

        // Agrega la tarjeta al contenedor de resultados
        resultsContainer.appendChild(cardHTML);
    });
}

// Función para crear el contenido HTML de la tarjeta
function createCardHTML(data) {
    // Crea el elemento de la tarjeta
    var cardElement = document.createElement("div");
    cardElement.className = "post";
    cardElement.dataset.category = data.categoria.split(); // Unir las etiquetas en una cadena
    cardElement.dataset.level = data.nivel;  // Cambiado de dataset.nivel a dataset.level
    cardElement.dataset.days = data.dias;

    // Añade el contenido de la tarjeta
    cardElement.innerHTML = `
        <div class="ctn-img"><img src="${data.imagen}" alt=""></div>
        <h2>${data.titulo}</h2>
        <ul class="ctn-tag">${createTagListHTML(data.tags)}</ul>
        <a href="${data.href}"><button>leer más</button></a>
    `;

    return cardElement;
}

// Función para crear la lista de etiquetas HTML
function createTagListHTML(tags) {
    // Crea la lista de etiquetas
    return tags.map(tag => `<li>${tag}</li>`).join('');
}
