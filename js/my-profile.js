// const userInfoKeys= ["userFirstName", "userSecondName", "userLast", "userSecondLast", "userPhone"];


// Funcion para mostrar el mail con el que ingreso el usuario en el campo E-mail
showEmailValue()

function showEmailValue() {
  let emailInput = document.getElementById("validationCustom05");
  let emailValue = getCookie("sessionUser");
  emailInput.value = emailValue;
}

function storeFieldValue(keyName, elementID){
  return (storedField= localStorage.setItem(keyName, document.getElementById(elementID).value));
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
      } else{

          let userFirstName= storeFieldValue('userFirstName', 'validationCustom01');
          let userLast= storeFieldValue('userLast', 'validationCustom03');
          let userSecondName= storeFieldValue('userSecondName', 'validationCustom02');
          let userSecondLast= storeFieldValue('userSecondLast', 'validationCustom04');
          let userPhone= storeFieldValue('userPhone', 'validationCustom06');

      }

      form.classList.add('was-validated')
    }, false)
  })
})()
