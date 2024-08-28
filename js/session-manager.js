// Obtener cookie dado el nombre
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Redireccionar al Login en caso de que no esté autenticado
function redirectToLogin(sessionUser) {
    if (!sessionUser) {
        window.location.replace("login.html");
    }
}

// Redireccionar al Home en caso de que esté autenticado
function redirectToHome(sessionUser) {
    if (sessionUser) {
        // Redirigir al usuario automáticamente si ya tiene una sesión activa
        window.location.replace("index.html");
    }
}

// Chequear estado de la sesión y redireccionar a la página correspondiente
function checkSession() {
    const URL = window.location.href;
    const sessionUser = getCookie("sessionUser");

    if (URL.includes('login.html')) {
        redirectToHome(sessionUser);
    } else {
        redirectToLogin(sessionUser);
    }
}

checkSession();

document.addEventListener("DOMContentLoaded", function(){
    // Obtener el nombre del usuario desde la cookie
    const userName = getCookie('sessionUser');
    
    // Mostrar el nombre en la barra de navegación
    if (userName) {
        document.getElementById('user-name').innerHTML = userName;
    } })

