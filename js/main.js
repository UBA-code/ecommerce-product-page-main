let stockArray = [];

if (window.localStorage.stock) {
  getItemsFromLocalStorage();
}

if (stockArray.length === 0) {
  window.localStorage.clear();
}

let mobileOnly = document.querySelectorAll(".mobile-only"),
  nav = document.querySelector("header .logo-nav nav"),
  navLayer = document.querySelector(".black-layer");

mobileOnly.forEach((e) => {
  e.addEventListener("click", (x) => {
    if (
      x.target.parentElement.classList.contains("nav-btn-open") ||
      x.target.classList.contains("nav-btn-open")
    ) {
      navLayer.classList.add("layer-active");
      nav.classList.add("active");
    }
    if (
      x.target.parentElement.classList.contains("nav-btn-close") ||
      x.target.classList.contains("nav-btn-close")
    ) {
      navLayer.classList.remove("layer-active");
      nav.classList.remove("active");
    }
  });
});

navLayer.addEventListener("click", (e) => {
  if (e.target.classList.contains("layer-active")) {
    e.target.classList.remove("layer-active");
    nav.classList.remove("active");
    if (sliderPreview.classList.contains("sliderActive")) {
      sliderPreview.classList.remove("sliderActive");
    }
  }
});

// start mobile slider

let mobileSlider = document.querySelector(".mobile-silder"),
  mobileSliderLength =
    document.querySelectorAll(".preview-img .img-box").length - 1,
  previewImgMobile = mobileSlider.querySelector(".preview-img"),
  translateNumber = 0;

mobileSlider.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("next-btn") ||
    e.target.parentElement.classList.contains("next-btn")
  ) {
    if (mobileSliderLength > 0) {
      mobileSliderLength--;
      translateNumber += 100;
      previewImgMobile.style.transform = `translateX(-${translateNumber}%)`;
    }
  }
  if (
    e.target.classList.contains("previous-btn") ||
    e.target.parentElement.classList.contains("previous-btn")
  ) {
    if (
      mobileSliderLength <
      document.querySelectorAll(".preview-img .img-box").length - 1
    ) {
      mobileSliderLength++;
      translateNumber -= 100;
      previewImgMobile.style.transform = `translateX(-${translateNumber}%)`;
    }
  }
});

// show selected picture

let previewImgDesk = document.querySelector(".slider-area .preview-img"),
  sliderImagesDesk = document.querySelectorAll(
    ".slider-area .images-container .img-box:not(.slected-image)"
  ),
  sliderImagesDeskAll = document.querySelectorAll(
    ".slider-area .images-container .img-box"
  ),
  imagesContainer = document.querySelector(".slider-area .images-container");

imagesContainer.addEventListener("click", (x) => {
  if (
    x.target.parentElement.classList.contains("slected-image") == false &&
    x.target.parentElement.classList.contains("img-box")
  ) {
    previewImgDesk.querySelector("img").src = x.target.dataset.src;
    sliderImagesDeskAll.forEach((z) => z.classList.remove("slected-image"));
    x.target.parentElement.classList.add("slected-image");
  }
});

// slider for desktop

let imagePreview = document.querySelector(
    "section .slider-area .preview-img img"
  ),
  sliderPreview = document.querySelector(".slider-preview");

imagePreview.addEventListener("click", (_) => {
  sliderPreview.classList.add("sliderActive");
  navLayer.classList.add("layer-active");
  sliderPreview.addEventListener("click", (x) => {
    if (
      x.target.parentElement.classList.contains("slected-image") == false &&
      x.target.parentElement.classList.contains("img-box")
    ) {
      fullScreenImagePreview.src = x.target.dataset.src;
      sliderImagesDeskFullScreenAll.forEach((z) =>
        z.classList.remove("slected-image")
      );
      x.target.parentElement.classList.add("slected-image");
    }
  });
});

let sliderClose = document.querySelector(".slider-preview .slider-close");

sliderClose.addEventListener("click", (_) => {
  sliderPreview.classList.remove("sliderActive");
  navLayer.classList.remove("layer-active");
});

let sliderImagesDeskFullScreen = document.querySelectorAll(
    ".slider-preview .images-container .img-box:not(.slected-image)"
  ),
  sliderImagesDeskFullScreenAll = document.querySelectorAll(
    ".slider-preview .images-container .img-box"
  ),
  fullScreenImagePreview = document.querySelector(
    ".slider-preview .preview-img .preview-img-Element"
  );

let imagesArray = [],
  currentIndex = 0;

for (let i = 0; i < sliderImagesDeskFullScreenAll.length; i++) {
  imagesArray.push(
    sliderImagesDeskFullScreenAll[i].querySelector("img").dataset.src
  );
}

sliderPreview.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("next-btn") ||
    e.target.parentElement.classList.contains("next-btn")
  ) {
    if (currentIndex < sliderImagesDeskFullScreenAll.length - 1) {
      currentIndex++;
      fullScreenImagePreview.src = imagesArray[currentIndex];
      sliderImagesDeskFullScreenAll.forEach((e) =>
        e.classList.remove("slected-image")
      );
      sliderImagesDeskFullScreenAll[currentIndex].classList.add(
        "slected-image"
      );
    }
  }
  if (
    e.target.classList.contains("previous-btn") ||
    e.target.parentElement.classList.contains("previous-btn")
  ) {
    if (currentIndex > 0) {
      currentIndex--;
      fullScreenImagePreview.src = imagesArray[currentIndex];
      sliderImagesDeskFullScreenAll.forEach((e) =>
        e.classList.remove("slected-image")
      );
      sliderImagesDeskFullScreenAll[currentIndex].classList.add(
        "slected-image"
      );
    }
  }
});

// stock add and remove

let stockArea = document.querySelector(".stock-and-add-cart");

stockArea.addEventListener("click", (e) => {
  if (e.target.classList.contains("minus-btn")) {
    if (stockArea.querySelector(".stock-length").innerHTML > 0) {
      stockArea.querySelector(".stock-length").innerHTML--;
    }
  }
  if (e.target.classList.contains("plus-btn")) {
    stockArea.querySelector(".stock-length").innerHTML++;
  }
  if (e.target.classList.contains("add-cart")) {
    if (+stockArea.querySelector(".stock-length").innerHTML > 0) {
      addToCart();
      updateCartWhileAdding();
      stockArea.querySelector(".stock-length").innerHTML = "0";
      removeProduct();
      showCheckOutBtn();
    }
  }
});

// get Prouct information
let productName = document.querySelector(
    ".element-info .product-title"
  ).innerHTML,
  productPrice = document.querySelector(
    ".element-info .product-price .price"
  ).innerHTML,
  productImg = document.querySelector("section .slider-area .preview-img img");

function addToCart() {
  // getItemsFromLocalStorage()
  let id = Date.now();
  stockArray.push({
    productImg: productImg.dataset.src,
    name: productName,
    price: productPrice,
    stockSize: stockArea.querySelector(".stock-length").innerHTML,
    productId: id,
  });
  window.localStorage.stock = JSON.stringify(stockArray);
}

function getItemsFromLocalStorage() {
  stockArray = JSON.parse(window.localStorage.stock);
}

let cartAndProfileBox = document.querySelector(".cart-profile"),
  cartPreview = document.querySelector(".cart-profile .cart-preview");

cartAndProfileBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-icon")) {
    cartPreview.classList.toggle("cart-active");
  }
});

// get items from local storage

function showCartProduct() {
  let cartPreview = document.querySelector(
    ".cart-profile .cart-preview .product-box"
  );
  for (let i = 0; i < stockArray.length; i++) {
    let productArea = `
      <div class="product-area" data-id="${stockArray[i].productId}">
        <div class="img">
          <img src="${stockArray[i].productImg}" alt="">
        </div>  
        <div class="product-info">
          <p class="product-title">${stockArray[i].name}</p>
          <div class="price-area">
            <span class="price">$${
              stockArray[i].price
            }</span> &#10005; <span class="Stock-Size">${
      stockArray[i].stockSize
    }</span> <span class="final-price">$${(
      stockArray[i].price * stockArray[i].stockSize
    ).toFixed(2)}</span>
          </div>
        </div>  
        <div class="remove-product-btn">
          <img src="./images/icon-delete.svg" alt="">
        </div>
      </div>
      `;
    cartPreview.innerHTML += productArea;
  }
}

showCartProduct();

function updateCartWhileAdding() {
  let productBox = document.querySelectorAll(
    ".cart-preview .product-box .product-area"
  );
  productBox.forEach((e) => e.remove());
  showCartProduct();
}

// remove product from cart

function removeProduct() {
  let removeBtn = document.querySelectorAll(".remove-product-btn");

  removeBtn.forEach((z) => {
    z.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-product-btn")) {
        // remove product from local storage
        stockArray = stockArray.filter(
          (x) => x.productId != +e.target.parentElement.dataset.id
        );
        window.localStorage.stock = JSON.stringify(stockArray);
        // remove product from page
        e.target.parentElement.remove();
        showCheckOutBtn();
      }
    });
  });
}

removeProduct();

function showCheckOutBtn() {
  let productBox = document.querySelector(".product-box"),
    checkoutBtn = document.querySelector(".checkout-btn"),
    cartLength = document.querySelector(".cart-profile .cart .cart-length");
  if (productBox.children.length === 0) {
    checkoutBtn.style.display = "none";
    let cartEmpty = document.createElement("span");
    cartEmpty.innerHTML = "Your cart is empty.";
    cartEmpty.classList.add("cart-empty");
    cartEmpty.classList.add("cart-empty-active");
    cartPreview.appendChild(cartEmpty);
    cartLength.style.display = "none";
  } else {
    cartLength.style.display = "block";
    cartLength.innerHTML = stockArray.length;
    let cartEmpty = document.querySelector(".cart-empty");
    if (cartEmpty) {
      cartEmpty.remove();
    }
    checkoutBtn.style.display = "block";
  }
}

showCheckOutBtn();
