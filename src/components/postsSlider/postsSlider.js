const matchesSlider = document.querySelector(".postsSlider__inner");
if (matchesSlider) {
  new Swiper(".postsSlider__inner", {
    spaceBetween: 24,
    speed: 1000,
    slidesPerView: "auto",
    navigation: {
      nextEl: ".postsSlider__arrow--next",
      prevEl: ".postsSlider__arrow--prev",
    },
    breakpoints: {
      0: {
        spaceBetween: 8,
      },
      480: {
        spaceBetween: 24,
      },
    },
  });
}
