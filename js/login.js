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

