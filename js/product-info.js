const productID= localStorage.getItem(`productID`);




const pageNameContainer = document.getElementById("page-name-container");

const productInfoContainer= document.getElementById("product-info-container");

function showProductInfo(productInfo){
    productInfoContainer.innerHTML=
    `<div class="row">
    
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
    <p>${productInfo.name}</p>
    <p>${productInfo.soldCount} vendidos</p>
    <p>${productInfo.description}</p>
    <p>${productInfo.cost} ${productInfo.currency}</p>
    <button>Agregar al carrito</button>

    </div>

    </div>`}
            

function showCategory(categoryName) {
    pageNameContainer.innerHTML += `
      <h2 class="fw-bold">${categoryName}</h2>`;
  }



// Fetch and show product info
getJSONData(`https://japceibal.github.io/emercado-api/products/${productID}.json`).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productInfo = resultObj.data;
      showCategory(productInfo.category);
      showProductInfo(productInfo);
    }
  }); 
