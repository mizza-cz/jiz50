document.querySelectorAll(".programPage").forEach((page) => {
  const tabs = page.querySelectorAll(".js-program-tab");
  const panels = page.querySelectorAll(".js-program-panel");

  const events = page.querySelectorAll(".js-program-event");
  const details = page.querySelectorAll("[data-event-detail]");

  const program = page.querySelector(".programPage__program");
  const detailWrapper = page.querySelector(".js-program-detail");
  const detailClose = page.querySelector(".js-program-detail-close");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const target = this.dataset.tab;

      tabs.forEach((item) => {
        item.classList.toggle("is-active", item === this);
      });

      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.panel === target);
      });
    });
  });

  events.forEach((event) => {
    event.addEventListener("click", function () {
      const target = this.dataset.event;

      events.forEach((item) => {
        item.classList.toggle("is-active", item === this);
      });

      details.forEach((detail) => {
        detail.classList.toggle(
          "is-active",
          detail.dataset.eventDetail === target
        );
      });

      if (window.innerWidth < 992) {
        program.classList.add("is-detail-open");
        detailWrapper.classList.add("is-open");
      }
    });
  });

  if (detailClose) {
    detailClose.addEventListener("click", function () {
      program.classList.remove("is-detail-open");
      detailWrapper.classList.remove("is-open");
    });
  }

  page.querySelectorAll(".js-program-day").forEach((day) => {
    day.addEventListener("click", function () {
      page.querySelectorAll(".js-program-day").forEach((item) => {
        item.classList.remove("is-active");
      });

      this.classList.add("is-active");
    });
  });
});
