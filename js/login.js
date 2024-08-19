document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("form");
    const userInput = document.getElementById("user");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    console.log("Login script cargado.");

    // Verificar si la cookie de sesión ya existe
    if (document.cookie.split('; ').find(row => row.startsWith('session='))) {
        // Si la cookie existe, redirigir a index.html
        window.location.replace('index.html');
        return;
    }

    // Mostrar/ocultar la contraseña
    togglePassword.addEventListener("change", function() {
        passwordInput.type = togglePassword.checked ? "text" : "password";
    });
    
        // Validar que los campos no estén vacíos
        if (username === "" || password === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

    // Manejar el envío del formulario
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        const username = userInput.value.trim();
        const password = passwordInput.value.trim();

        console.log("Formulario enviado.");


        // Configurar la cookie de sesión
        document.cookie = "session=true; path=/"; // Cookie sin fecha de expiración
        console.log("Cookie configurada.");

        // Redirigir al usuario autenticado usando replace() para evitar volver atrás
        window.location.replace('index.html');
    });
});