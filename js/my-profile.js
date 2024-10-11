// const userInfoKeys= ["userFirstName", "userSecondName", "userLast", "userSecondLast", "userPhone"]

let username= getCookie('sessionUser');
let userData= JSON.parse(localStorage.getItem(username));
let fields= ['firstname', 'secondname', 'lastname', 'secondlastname', 'userphone'];

buildUserData();
showFieldValues();

// Constructor del objeto a usar para guardar la información del usuario, guardar la info del usuario en una variable, pasar todo al localStorage
function buildUserData(){
  if (localStorage.getItem(username) == null){
    userData= {firstname:'',secondname:'',lastname:'',secondlastname:'',userphone:''};
  }
  return (userData);

}


function storeUserData(){
  let fieldValue='';
 

  fields.forEach(field => {
    fieldValue=document.getElementById(field).value;

    userData[field]= fieldValue;
  }
 
  )
  return(userData);      
  }



function localUserData(userData){
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
    let fieldInput= document.getElementById(field)
    let fieldValue= userData[field];
    fieldInput.value= fieldValue;

  })

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
      else{
        userData= storeUserData();
        localUserData(userData)


       
      }
      form.classList.add('was-validated')
    }, false)
  })
})()

console.log(localStorage)

console.log(userData)
