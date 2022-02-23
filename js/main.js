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
  sliderImagesDesk = document.querySelectorAll(".images-container .img-box:not(.selected-image)");

sliderImagesDesk.forEach((e) => {
  e.addEventListener("click", (x) => {
    previewImgDesk.querySelector("img").src = x.target.dataset.src;
    sliderImagesDesk.forEach(z=> z.classList.remove("slected-image"))
    e.classList.add("slected-image")
  });
});
