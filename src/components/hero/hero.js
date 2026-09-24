const hero = document.querySelector(".hero.swiper");

if (hero) {
  const paginationItems = hero.querySelectorAll(".hero__pagination-item");

  const autoplayDelay = 5000;

  let progressFrame = null;

  function updateProgress(activeIndex) {
    if (progressFrame) {
      cancelAnimationFrame(progressFrame);
    }

    paginationItems.forEach((item) => {
      const progress = item.querySelector(".hero__pagination-progress");

      item.classList.remove("is-active");

      progress.style.transition = "none";
      progress.style.width = "0";
    });

    const activeItem = paginationItems[activeIndex];

    if (!activeItem) {
      return;
    }

    const activeProgress = activeItem.querySelector(
      ".hero__pagination-progress"
    );

    activeItem.classList.add("is-active");

    // force browser to apply width: 0 before new transition
    activeProgress.offsetWidth;

    progressFrame = requestAnimationFrame(function () {
      activeProgress.style.transition = "width " + autoplayDelay + "ms linear";

      activeProgress.style.width = "100%";
    });
  }

  const heroSwiper = new Swiper(hero, {
    slidesPerView: 1,
    loop: true,
    speed: 600,

    autoplay: {
      delay: autoplayDelay,
      disableOnInteraction: false,
    },

    on: {
      init: function () {
        updateProgress(this.realIndex);
      },

      realIndexChange: function () {
        updateProgress(this.realIndex);
      },
    },
  });

  paginationItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      heroSwiper.slideToLoop(index);

      if (heroSwiper.autoplay) {
        heroSwiper.autoplay.start();
      }
    });
  });
}
