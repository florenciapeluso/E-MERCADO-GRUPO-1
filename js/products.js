var catID = localStorage.getItem("catID");
let productData = []
let searchQuery = "";

const PRODUCT_DATA_URL =
  `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

const productContainer = document.getElementById("card-container"); // "Traemos" utilizando el DOM el div de class "card-container" para colocar la información en él

const pageNameContainer = document.getElementById("page-name-container"); // "Traemos" utilizando el DOM el div de class "page-name" para colocar la información en él



/** Función que recibe el nombre de la categoría e imprime como título
 * Productos
 * Categoría 
**/

function showCategory(categoryName) {
  pageNameContainer.innerHTML += `
    <h2 class="fw-bold">${categoryName}</h2>`;
}

/**
 * Función que recibe por parámetro un array con los datos que se mostrarán en el DOM
 * Los datos se mostrarán dentro del div de id "big-product-container" y por cada ítem se está creando una nueva product-card en la cual se
 * imprime el campo "catName" del JSON, y los campos "name", "description", "cost", "currency", "soldCount", y "image" de cada item de productArray.
 */

function limitarCaracteres(texto, limite = 50) {
  // Si el texto es más corto que el límite, lo devolvemos tal cual
  if (texto.length <= limite) {
    return texto;
  }

  // Cortamos el texto al límite de caracteres
  let textoLimitado = texto.slice(0, limite);

  // Añadimos puntos suspensivos
  return textoLimitado + '...';
}

// Funcion para filtrar productos
function filterProducts(productArray) {
  let filteredProducts = productArray.filter(
    (product) => {
      let productName = product.name.toUpperCase();
      let productDescription = product.description.toUpperCase();
      let query = searchQuery.toUpperCase();

      // Se debe modificar la siguiente linea para que tome valor true solo cuando
      // el producto actual se encuentra en el rango de precio definido por el fitro
      // Ejemplo: product.cost >= min && product.cost <= max
      let isInPriceRange = true

      return (productName.includes(query) || productDescription.includes(query)) && isInPriceRange;
    }
  )

  // Aquí abajo se hace el ordenamiento, que debe guardarse en otra variable 
  // y llamar al showProductData con la lista ya ordenada.

  showProductData(filteredProducts);
}

function showProductData(productArray) {
  productContainer.innerHTML = "";
  // Iteramos sobre los productos y los insertamos en el HTML
  for (const item of productArray) {
    productContainer.innerHTML += `<div class="col-sm-6 col-lg-4">
                <div class="card mb-3">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}" id="productImage">
                    <div class="card-body">
                        <h5 class="card-title product-name" id="productName">${item.name}</h5>
                        <p class="card-text product-description">` + limitarCaracteres(item.description) + `</p>
                        <div class="row">
                            <div class="col-6 product-price">
                                <p>${item.cost} ${item.currency}</p>
                            </div>
                            <div class="col-6 text-center">
                                <p class="product-soldCount">${item.soldCount} vendidos</p>
                            </div>
                        </div>
                        <div class="row mx-auto">
                            <button class="btn btn-dark">Añadir al carrito</button>
                        </div>
                    </div>
                </div>
            </div>`;
  }
}

// Para borrar el contenido de la barra de busqueda
const searchInput = document.querySelector('.search-input');
const clearIcon = document.querySelector('.clear-icon');

searchInput.addEventListener('input', function () {
  clearIcon.style.display = this.value.length ? 'block' : 'none';
  onSearchQueryChange(this.value);
});

clearIcon.addEventListener('click', function () {
  searchInput.value = '';
  onSearchQueryChange('');
  this.style.display = 'none';
  searchInput.focus();
});

function onSearchQueryChange(query) {
  searchQuery = query;
  filterProducts(productData.products);
}

function getProductID(productArray){
  let cards=  document.getElementsByClassName("card");
for (let i=0; i<productArray.length; i++){
  cards[i].addEventListener("click", function(){
    localStorage.setItem("productID", productArray[i].id);
    
    window.location= "product-info.html";
  })

}}
/* 
  for (item of productArray){
    document.getElementById("productName").addEventListener("click", function() {
      localStorage.setItem("productID", item.id);
      window.location = "product-info.html";
})};
  for (item of productArray){
    document.getElementById("productImage").addEventListener("click", function() {
      localStorage.setItem("productID", item.id);
      window.location = "product-info.html";
});

}}
*/

// Fetch and show product data
getJSONData(PRODUCT_DATA_URL).then(function (resultObj) {
  if (resultObj.status === "ok") {
    productData = resultObj.data;
    showCategory(productData.catName);
    showProductData(productData.products);
    getProductID(productData.products);
  }
});