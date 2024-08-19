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

    // Verificar si el almacenamiento de sesión existe
    if (sessionStorage.getItem('session')) {
        // Si el almacenamiento de sesión existe, redirigir a index.html
        window.location.replace('index.html');
        return;
    }

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

        // Configurar el almacenamiento de sesión
        sessionStorage.setItem('session', 'true');
        console.log("Sesión configurada en sessionStorage.");

        // Redirigir al usuario autenticado usando replace() para evitar volver atrás
        window.location.replace('index.html');
    });
});

