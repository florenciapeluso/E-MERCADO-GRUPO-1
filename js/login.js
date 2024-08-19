document.getElementById('btn-submit').addEventListener('click', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    

   
    if (username === 'usuario_valido' && password === 'contraseña_valida') {
        document.cookie = "session=true; path=/;";
        window.location.href = 'portada.html';
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});

// Mostrar/ocultar contraseña
document.getElementById('togglePassword').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    if (this.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});