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

let imagePreview = document.querySelector("section .slider-area .preview-img"),
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
