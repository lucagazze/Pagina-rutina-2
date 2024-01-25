document.addEventListener("DOMContentLoaded", function () {
    filterResults(); // Cargar resultados iniciales

    document.getElementById("programType").addEventListener("change", filterResults);
    document.getElementById("experienceLevel").addEventListener("change", filterResults);
    document.getElementById("daysPerWeek").addEventListener("change", filterResults);
});

function filterResults() {
    var programType = document.getElementById("programType").value;
    var experienceLevel = document.getElementById("experienceLevel").value;
    var daysPerWeek = document.getElementById("daysPerWeek").value;

    var posts = document.querySelectorAll(".post");

    posts.forEach(function (post) {
        var categories = post.getAttribute("data-category").split(' '); // Cambiado para manejar múltiples categorías
        var level = post.getAttribute("data-level");
        var days = post.getAttribute("data-days");

        var showProgram = programType === "all" || categories.includes(programType);
        var showLevel = experienceLevel === "all" || (level && level.split(' ').includes(experienceLevel));
        var showDays = daysPerWeek === "all" || days.split(' ').includes(daysPerWeek);

        if (showProgram && showLevel && showDays) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("icon-menu").addEventListener("click", mostrar_menu);

    function mostrar_menu() {
        document.getElementById("show-menu").classList.toggle('show-lateral');
    }

    // Scroll up
    document.getElementById("button-up").addEventListener("click", scrollUp);

    function scrollUp() {
        var currentScroll = document.documentElement.scrollTop;

        if (currentScroll > 0) {
            window.requestAnimationFrame(scrollUp);
            window.scrollTo(0, currentScroll - (currentScroll / 10));
        }
    }

    var buttonUp = document.getElementById("button-up");

    window.onscroll = function () {
        var scroll = document.documentElement.scrollTop;

        if (scroll > 500) {
            buttonUp.style.transform = "scale(1)";
        } else if (scroll < 500) {
            buttonUp.style.transform = "scale(0)";
        }
    };
});
