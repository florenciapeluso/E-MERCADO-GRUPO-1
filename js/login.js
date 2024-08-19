document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("form");
    const userInput = document.getElementById("user");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    // Mostrar/ocultar la contraseña
    togglePassword.addEventListener("change", function() {
        passwordInput.type = togglePassword.checked ? "text" : "password";
    });

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        const username = userInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "" || password === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Configurar la cookie de sesión
        document.cookie = "session=true; path=/"; // Cookie sin fecha de expiración

        window.location.href = 'index.html'; // Redirigir al usuario autenticado
    });
});


 // Mostrar/ocultar la contraseña
 togglePassword.addEventListener("change", function() {
    if (togglePassword.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});