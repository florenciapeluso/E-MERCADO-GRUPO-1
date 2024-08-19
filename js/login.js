document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("form");
    const userInput = document.getElementById("user");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    console.log("Login script cargado.");

    // Mostrar/ocultar la contraseña
    togglePassword.addEventListener("change", function() {
        passwordInput.type = togglePassword.checked ? "text" : "password";
    });

    // Manejar el envío del formulario
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        const username = userInput.value.trim();
        const password = passwordInput.value.trim();

        console.log("Formulario enviado.");

        // Validar que los campos no estén vacíos
        if (username === "" || password === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Guardar la sesión en una cookie
        document.cookie = `sessionUser=${username}; path=/;`;


        // Redirigir al usuario a la página de inicio (o cualquier otra)
        window.location.href = "index.html";
    });

    // Verificar si hay una sesión activa
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const sessionUser = getCookie("sessionUser");

    if (sessionUser) {
        console.log(`Sesión activa para: ${sessionUser}`);
        // Redirigir al usuario automáticamente si ya tiene una sesión activa
        window.location.href = "index.html";
    } else {
        console.log("No hay una sesión activa.");
    }
});


