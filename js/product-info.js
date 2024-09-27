const productID = localStorage.getItem(`productID`);

const pageNameContainer = document.getElementById("page-name-container");

const productInfoContainer = document.getElementById("product-info-container");

function showProductInfo(productInfo) {
  productInfoContainer.innerHTML = `<div class="row">
    
    <div id="carouselControls" class="carousel slide col-lg-6 col-md-12" data-bs-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
        <img src="${productInfo.images[0]}" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="${productInfo.images[1]}" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="${productInfo.images[2]}" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="${productInfo.images[3]}" class="d-block w-100" alt="...">
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>

    <div class="col-lg-6 col-sm-12">
    <h5 class="card-title product-name">${productInfo.name}</h5>
    <p class="product-soldCount" style="width: 108.1875px;">${productInfo.soldCount} vendidos</p>
    <p class="card-text product-description">${productInfo.description}</p>
    <p class="product-price" >${productInfo.cost} ${productInfo.currency}</p>
    <button class="btn btn-dark" style="width: 226px; height: 40px;">Agregar al carrito</button>

    </div>

    </div>`;
}

function showCategory(categoryName) {
  pageNameContainer.innerHTML += `
    <div style="display: flex; align-items: center; margin-bottom: 30px;">
    <a href="products.html" style="text-decoration: none;">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" style="cursor: pointer; color: black; stoke: black; margin: 2px; margin-bottom: 10px;" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16";>
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
      </svg>   
    </a>
      <h2 class="fw-bold" style="margin-left: 8px;">${categoryName}</h2>
    </div>`;
}
// Fetch and show product info
getJSONData(
  `https://japceibal.github.io/emercado-api/products/${productID}.json`
).then(function (resultObj) {
  if (resultObj.status === "ok") {
    productInfo = resultObj.data;
    showCategory(productInfo.category);
    showProductInfo(productInfo);
  }
});

// URL de comentarios para cada producto
const PRODUCT_COMMENTS_URL = PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE;

// Fetch para la seccion de los comentarios
getJSONData(PRODUCT_COMMENTS_URL).then(function (resultObj) {
  if (resultObj.status === "ok") {
    showFirstProductComments(resultObj.data)
  }
});

// Función para mostrar hasta los primeros 3 comentarios del producto
function showFirstProductComments(productComments) {
  let commentsContainer = document.getElementById("product-comments-container");

  if (productComments.length === 0) {
    commentsContainer.innerHTML += `
      <p class="m-1 text-secondary">No existen calificaciones para el producto seleccionado.</p>
    `
    return
  }

  let shortCommentsList = productComments.slice(0, 3);
  for (comment of shortCommentsList) {
    commentsContainer.innerHTML += `
        <div class="col mb-2">
          <div class="card h-100">
            <div class="card-body">
              <p>${drawStars(comment.score)}</p>
              <h6 class="card-title">${comment.user}</h6>
              <p class="text-secondary">${comment.dateTime}</p>
              <p class="card-text">${comment.description}</p>
            </div>
          </div>
        </div>
        `
  }

  let allCommentContainer = document.getElementById('all-comments-button')
  if (productComments.length > 3) {
    updateCommentsModal(productComments)

    let button = document.createElement("button");
    button.type = "button"
    button.classList = "mt-3 p-2 btn-text"
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#exampleModalScrollable');
    button.innerHTML = "Ver todas las calificaciones";
    allCommentContainer.appendChild(button);
  }
}

// Funcion para actualizar el modal con todos los comentarios
function updateCommentsModal(productComments) {
  let modalContent = document.getElementById('all-comments-modal');
  for (comment of productComments) {
    modalContent.innerHTML += `
        <div class="card mb-2">
            <div class="card-body">
            <p>${drawStars(comment.score)}</p>
            <h5 class="card-title">${comment.user}</h5>
            <p class="text-secondary">${comment.dateTime}</p>
            <p class="card-text">${comment.description}</p>
          </div>
        </div>
      `
  }

}

// Funcion para dibujar las estrellas
function drawStars(rating) {
  let ratingHTML = ""
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      ratingHTML += '<span class="fa fa-star checked-star"></span>';
    } else {
      ratingHTML += '<span class="fa fa-star not-checked-star"></span>';
    }
  }
  return ratingHTML;
}

