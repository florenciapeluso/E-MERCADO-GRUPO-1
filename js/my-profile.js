// Funcion para mostrar el mail con el que ingreso el usuario en el campo E-mail
showEmailValue()

function showEmailValue() {
  let emailInput = document.getElementById("validationCustom05");
  let emailValue = getCookie("sessionUser");
  emailInput.value = emailValue;
}


// Validacion del formulario al enviar
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()