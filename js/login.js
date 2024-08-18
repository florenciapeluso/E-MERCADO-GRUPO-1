document.addEventListener("DOMContentLoaded", function() {
    // referencia a los elementos del form
    const loginForm = document.querySelector("form");
    const userInput = document.getElementById("user");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const btnSubmit = document.getElementById("btn-submit");

    // mostrar/ocultar la contraseña
    togglePassword.addEventListener("change", function() {
        if (togglePassword.checked) {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });

    // validacion del formulario
    loginForm.addEventListener("submit", function(event) {
        // evitar el envio del formulario si hay campos vacios
        if (userInput.value.trim() === "" || passwordInput.value.trim() === "") {
            alert("Por favor, complete todos los campos.");
            event.preventDefault(); 
        } else {
            event.preventDefault();
            console.log("Formulario enviado con éxito.");
            window.location.replace("index.html"); // redirige a index.html una vez que se haya completado los campos del login
        }
    });
});