// const userInfoKeys= ["userFirstName", "userSecondName", "userLast", "userSecondLast", "userPhone"]

let username = getCookie('sessionUser');
let userData = JSON.parse(localStorage.getItem(username));
let fields = ['firstname', 'secondname', 'lastname', 'secondlastname', 'userphone'];

buildUserData();
showFieldValues();

// Constructor del objeto a usar para guardar la información del usuario, guardar la info del usuario en una variable, pasar todo al localStorage
function buildUserData() {
  if (localStorage.getItem(username) == null) {
    userData = { firstname: '', secondname: '', lastname: '', secondlastname: '', userphone: '' };
  }
  return userData;
}

function storeUserData() {
  let fieldValue = '';

  fields.forEach(field => {
    fieldValue = document.getElementById(field).value.trim();
    userData[field] = fieldValue;
  })
  return userData;
}

function localUserData(userData) {
  localStorage.setItem(getCookie('sessionUser'), JSON.stringify(userData));
}


// Funcion para mostrar el mail con el que ingreso el usuario en el campo E-mail
showEmailValue();

function showEmailValue() {
  let emailInput = document.getElementById("email");
  let emailValue = getCookie("sessionUser");
  emailInput.value = emailValue;
}

// Función para mostrar los otros campos luego de validar el form

function showFieldValues() {
  fields.forEach(field => {
    let fieldInput = document.getElementById(field)
    let fieldValue = userData[field];
    fieldInput.value = fieldValue;
  })
}


// Validacion del formulario al enviar
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.stopPropagation()
      } else {
        userData = storeUserData();
        localUserData(userData)
        showFieldValues();
        delayRemoveValidation();
      }
      event.preventDefault()
      form.classList.add('was-validated')
    }, false)
  })
})()

function delayRemoveValidation() {
  setTimeout(() => {
    const forms = document.querySelectorAll('.was-validated')
    Array.from(forms).forEach(form => {
      form.classList.remove('was-validated')
    })
  }, 3000);
}


// modo noche
const user = getCookie('sessionUser'); 

function enableDayMode() {
  document.body.classList.add('day-mode');
  document.body.classList.remove('night-mode');
  localStorage.setItem(`${user}-theme`, 'day');
  document.getElementById('theme-toggle').checked = false;

  const elements = document.querySelectorAll('.card-body, .navbar'); //reconoce los elementos para agregarlos al css luego
  elements.forEach(el => {
    el.classList.add('day-mode');
    el.classList.remove('night-mode');
  });

}

function enableNightMode() {
  document.body.classList.add('night-mode');
  document.body.classList.remove('day-mode');
  localStorage.setItem(`${user}-theme`, 'night');
  document.getElementById('theme-toggle').checked = true;

  const elements = document.querySelectorAll('.card-body, .navbar');
  elements.forEach(el => {
    el.classList.add('night-mode');
    el.classList.remove('day-mode');
  });

}

function loadTheme() {
  const savedTheme = localStorage.getItem(`${user}-theme`);
  if (savedTheme === 'night') {
    enableNightMode();
  } else {
    enableDayMode();
  }
}


document.addEventListener('DOMContentLoaded', loadTheme);

// evento para el toggle de modo
document.getElementById('theme-toggle').addEventListener('change', function () {
  if (this.checked) {
    enableNightMode();
  } else {
    enableDayMode();
  }
});