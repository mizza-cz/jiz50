document.querySelectorAll(".pubs-slider").forEach((slider) => {
  new Swiper(slider, {
    slidesPerView: 2,
    spaceBetween: 16,
    loop: true,
    speed: 800,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
  });
});
