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

    // Verificar si la cookie o almacenamiento local de sesión existe
    if (document.cookie.split('; ').find(row => row.startsWith('session=')) || localStorage.getItem('session')) {
        // Si la cookie o almacenamiento local existe, redirigir a index.html
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

        // Configurar la cookie y almacenamiento local de sesión
        document.cookie = "session=true; path=/"; // Cookie sin fecha de expiración
        localStorage.setItem('session', 'true');
        console.log("Sesión configurada en cookie y localStorage.");

        // Redirigir al usuario autenticado usando replace() para evitar volver atrás
        window.location.replace('index.html');
    });
});
