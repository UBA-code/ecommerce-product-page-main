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

navLayer.addEventListener("click", e=> {
  if (e.target.classList.contains("layer-active")) {
    e.target.classList.remove("layer-active")
    nav.classList.remove("active");
  }
})