document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    // Manejo del formulario de login
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("user").value;
        const password = document.getElementById("password").value;

        // Aquí iría la lógica para verificar credenciales (puedes usar fetch para una API, etc.)
        if (username === "usuario" && password === "contraseña") {
            sessionStorage.setItem("auth", "true");
            window.location.href = "portada.html";
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });
});

// Verificar si la sesión está activa al cargar la página
window.onload = function() {
    if (sessionStorage.getItem("auth") !== "true") {
        window.location.href = "login.html";
    }
};
