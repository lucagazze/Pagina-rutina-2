document.addEventListener("DOMContentLoaded", function () {
    var inputSearch = document.getElementById("inputSearch");
    var searchButton = document.getElementById("searchButton");
    var boxSearch = document.getElementById("box-search");
    var searchTermDisplay = document.getElementById("searchTermDisplay");
    var searchOptions = document.getElementById("searchOptions");

    var currentSearchTerm = "";

    searchButton.addEventListener("click", function () {
        filterResults();
        showHideBoxSearch();
        updateSearchTermDisplay();
    });

    inputSearch.addEventListener("input", function () {
        loadSearchOptions();
    });

    inputSearch.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            filterResults();
            showHideBoxSearch();
            updateSearchTermDisplay();
            event.preventDefault();
        }
    });

    // Nuevos eventos para filtrar directamente al seleccionar una opción
    searchOptions.addEventListener("change", function () {
        filterResults();
        updateSearchTermDisplay();
        hideSearchBox();
    });

    // Nuevo evento para filtrar directamente al hacer clic en una opción sugerida
    searchOptions.addEventListener("click", function () {
        // Verificar si la opción seleccionada es válida (no el título "Elige una opción")
        if (searchOptions.value !== "") {
            filterResults();
            updateSearchTermDisplay();
            hideSearchBox();
        }
    });

    document.getElementById("icon-search").addEventListener("click", toggle_buscador);
    document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);

    function toggle_buscador() {
        var barsSearch = document.getElementById("ctn-bars-search");
        var coverCtnSearch = document.getElementById("cover-ctn-search");

        if (barsSearch && coverCtnSearch) {
            if (barsSearch.style.top === "80px") {
                ocultar_buscador();
            } else {
                mostrar_buscador();
            }
        }
    }

    function mostrar_buscador() {
        var barsSearch = document.getElementById("ctn-bars-search");
        var coverCtnSearch = document.getElementById("cover-ctn-search");

        if (barsSearch && coverCtnSearch) {
            barsSearch.style.top = "80px";
            coverCtnSearch.style.display = "block";
            inputSearch.focus();
            showHideBoxSearch();
        }
    }

    function ocultar_buscador() {
        hideSearchBox();
    }

    function hideSearchBox() {
        var barsSearch = document.getElementById("ctn-bars-search");
        var coverCtnSearch = document.getElementById("cover-ctn-search");

        if (barsSearch && coverCtnSearch) {
            barsSearch.style.top = "-10px";
            coverCtnSearch.style.display = "none";
            showHideBoxSearch();
        }
    }

    function filterResults() {
        currentSearchTerm = inputSearch.value.trim().toLowerCase();
        var posts = document.querySelectorAll(".post");

        posts.forEach(function (post) {
            var title = post.querySelector("h2").textContent.trim().toLowerCase();
            var showPost = title.includes(currentSearchTerm);

            if (showPost) {
                post.style.display = "block";
            } else {
                post.style.display = "none";
            }
        });
    }

    function showHideBoxSearch() {
        if (boxSearch) {
            if (inputSearch.value === "") {
                boxSearch.style.display = "none";
            } else {
                boxSearch.style.display = "block";
            }
        }
    }

    function updateSearchTermDisplay() {
        if (searchTermDisplay) {
            searchTermDisplay.textContent = currentSearchTerm;
        }
    }

    function loadSearchOptions() {
        var titles = document.querySelectorAll(".post h2");

        // Limpiar opciones existentes
        searchOptions.innerHTML = "";

        // Crear nuevas opciones
        titles.forEach(function (title) {
            var newOption = document.createElement("option");
            newOption.value = title.textContent.trim();
            searchOptions.appendChild(newOption);
        });
    }
});
