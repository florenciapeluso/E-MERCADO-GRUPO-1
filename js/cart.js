// modo noche
const user = getCookie("sessionUser");

function enableDayMode() {
  document.body.classList.add("day-mode");
  document.body.classList.remove("night-mode");
  localStorage.setItem(`${user}-theme`, "day");
  document.getElementById("theme-toggle").checked = false;

  const elements = document.querySelectorAll(".card-body, .navbar"); //reconoce los elementos para agregarlos al css luego
  elements.forEach((el) => {
    el.classList.add("day-mode");
    el.classList.remove("night-mode");
  });
}

function enableNightMode() {
  document.body.classList.add("night-mode");
  document.body.classList.remove("day-mode");
  localStorage.setItem(`${user}-theme`, "night");
  document.getElementById("theme-toggle").checked = true;

  const elements = document.querySelectorAll(".card-body, .navbar");
  elements.forEach((el) => {
    el.classList.add("night-mode");
    el.classList.remove("day-mode");
  });
}

function loadTheme() {
  const savedTheme = localStorage.getItem(`${user}-theme`);
  if (savedTheme === "night") {
    enableNightMode();
  } else {
    enableDayMode();
  }
}

document.addEventListener("DOMContentLoaded", loadTheme);

// evento para el toggle de modo
document.getElementById("theme-toggle").addEventListener("change", function () {
  if (this.checked) {
    enableNightMode();
  } else {
    enableDayMode();
  }
});

// Función para cargar los productos del carrito
function cargarProductos() {
  const cartKey = getCookie("sessionUser") + "-cart";
  const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
  const container = document.getElementById("data-container");
  const summaryContainer = document.querySelector(".cart-summary"); 
  container.innerHTML = "";
  let subtotal = 0;

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div style="
        color: black; 
        padding: 20px; 
        text-align: center; 
        width: 50%; 
        top: 50%; 
        left: 50%; 
        transform: translate(50%, 50%);
      ">
        No tienes productos en tu carrito
      </div>
    `;
    document.getElementById("order-total").textContent = "USD $0.00";
    summaryContainer.style.display = "none"; 
    return; 
  } else {
    summaryContainer.style.display = "block"; 
  }

  cartItems.forEach((item, index) => {
    const productCard = document.createElement("div");
    productCard.className = "col-md-12 mb-1 cart-item d-flex align-items-center justify-content-center";
    productCard.innerHTML = `
      <div class="d-flex flex-column flex-md-row align-items-center p-3 border-bottom h-100">
        <img src="${item.img}" alt="${item.name}" class="product-img mr-3" style="width: 150px; height: auto; border-radius:8px;">
        <div class="flex-grow-1 text-center text-md-left">
          <h5 class="product-name m-3">${item.name}</h5>
          <p class="m-3">${item.currency} ${item.price}</p>
        </div>
        <div class="d-flex justify-content-center justify-content-md-start align-items-center mx-5">
          <div class="btn-group" role="group" aria-label="Cantidad">
            <button class="btn btn-outline-secondary btn-sm quantity-btn restar">
              <i class="bi bi-dash"></i>
            </button>
            <span class="mx-2" id="amount-${index}">${item.amount}</span>
            <button class="btn btn-outline-secondary btn-sm quantity-btn sumar">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>
        <p class="product-total font-weight-bold ml-4 mb-0" id="total-${index}">${item.currency} ${(item.price * item.amount).toFixed(2)}</p>
        <button class="btn btn-link text-danger p-0 m-5 delete-btn" data-index="${index}">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" style="color: black;">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>
        </button>
      </div>
    `;

    // Función para actualizar cantidad
    function actualizarcantidad(index, change, cartItems) {
      const item = cartItems[index];
      item.amount += change;
      if (item.amount < 1) item.amount = 1;

      const cartKey = getCookie("sessionUser") + "-cart";
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
      showCartBadge();

      const amountElement = document.getElementById(`amount-${index}`);
      amountElement.textContent = item.amount;

      const totalElement = document.getElementById(`total-${index}`);
      totalElement.textContent = `USD $${(item.price * item.amount).toFixed(2)}`;

      let subtotal = 0;
      cartItems.forEach((cartItem) => {
        subtotal += cartItem.price * cartItem.amount;
      });
      document.getElementById("order-total").textContent = `USD $${subtotal.toFixed(2)}`;
    }

    // Agregar event listener para eliminar el producto
    const deleteBtn = productCard.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => eliminarProducto(index));

    const restarBtn = productCard.querySelector(".restar");
    const sumarBtn = productCard.querySelector(".sumar");

    restarBtn.addEventListener("click", () => actualizarcantidad(index, -1, cartItems));
    sumarBtn.addEventListener("click", () => actualizarcantidad(index, 1, cartItems));

    container.appendChild(productCard);

    //Suma del total que se implementara en proximas entregas
    // subtotal += item.price * item.amount;
  });

  document.getElementById("order-total").textContent = `USD $${subtotal.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  const cartKey = getCookie("sessionUser") + "-cart";
  let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
  cartItems.splice(index, 1);
  localStorage.setItem(cartKey, JSON.stringify(cartItems));
  cargarProductos(); 
  showCartBadge(); 
}


document.addEventListener("DOMContentLoaded", cargarProductos);
