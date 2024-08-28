const PRODUCT_DATA_URL =
  "https://japceibal.github.io/emercado-api/cats_products/101.json"; // URL con los datos a mostrar (en este caso, solo autos)

const productContainer = document.getElementById("card-container"); // "Traemos" utilizando el DOM el div de class "product-container" para colocar la información en él

const pageNameContainer = document.getElementById("page-name-container"); // "Traemos" utilizando el DOM el div de class "page-name" para colocar la información en él

/** Función que recibe el nombre de la categoría e imprime como título
 * Productos
 * Categoría */

function showCategory(categoryName) {
  pageNameContainer.innerHTML += `<h1>Productos</h1>
    <h2>${categoryName}</h2>`;
}

/**
 * Función que recibe por parámetro un array con los datos que se mostrarán en el DOM
 * Los datos se mostrarán dentro del div de id "big-product-container" y por cada ítem se está creando una nueva product-card en la cual se
 * imprime el campo "catName" del JSON, y los campos "name", "description", "cost", "currency", "soldCount", y "image" de cada item de productArray.
 */

function limitarCaracteres(texto, limite = 55) {
  // Si el texto es más corto que el límite, lo devolvemos tal cual
  if (texto.length <= limite) {
    return texto;
  }

  // Cortamos el texto al límite de caracteres
  let textoLimitado = texto.slice(0, limite);

  // Añadimos puntos suspensivos
  return textoLimitado + '...';
}

function showProductData(productArray) {
  productContainer.innerHTML = "";
  // Iteramos sobre los productos y los insertamos en el HTML
  for (const item of productArray) {
    productContainer.innerHTML += `<div class="col-sm-6 col-lg-4">
                <div class="card mb-3">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title product-name">${item.name}</h5>
                        <p class="card-text product-description">` + limitarCaracteres(item.description) + `</p>
                        <div class="row">
                            <div class="col-8 product-price">
                                <p>${item.cost} ${item.currency}</p>
                            </div>
                            <div class="col-4 text-center">
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



getJSONData(PRODUCT_DATA_URL).then(function (resultObj) {
  if (resultObj.status === "ok") {
    let productData = resultObj.data;
    showCategory(productData.catName);
    showProductData(productData.products);
  }
});


