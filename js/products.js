const PRODUCT_DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // URL con los datos a mostrar (en este caso, solo autos)

const productContainer = document.getElementById("big-product-container"); // "Traemos" utilizando el DOM el div de class "product-container" para colocar la información en él

const pageNameContainer = document.getElementById("page-name-container") // "Traemos" utilizando el DOM el div de class "page-name" para colocar la información en él

/** Función que recibe el nombre de la categoría e imprime como título 
 * Productos 
 * Categoría */

function showCategory(categoryName){
    pageNameContainer.innerHTML += 
    `<h1>Productos</h1>
    <h2>${categoryName}</h2>`
}


/**
 * Función que recibe por parámetro un array con los datos que se mostrarán en el DOM
 * Los datos se mostrarán dentro del div de id "big-product-container" y por cada ítem se está creando una nueva product-card en la cual se
 * imprime el campo "catName" del JSON, y los campos "name", "description", "cost", "currency", "soldCount", y "image" de cada item de productArray.
 */


function showProductData(productArray) {
  //itera sobre los elementos del array
  for (const item of productArray) {
    productContainer.innerHTML+= `<div class="product-card">

    <img src=${item.image} class="product-image">

    <p class="product-name">${item.name}</p>

    <p class="product-description">${item.description}</p>

    <p class="product-price">${item.cost} ${item.currency}</p>

    <p class="product-soldCount">${item.soldCount} vendidos</p>
    
    </div>`
}
}


getJSONData(PRODUCT_DATA_URL).then(function(resultObj){
  if (resultObj.status === "ok")
  {
      let productData = resultObj.data;
      showCategory(productData.catName);
      showProductData(productData.products);

  }})

