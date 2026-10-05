const infoAccordionButtons = document.querySelectorAll(".js-info-accordion");

infoAccordionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const isOpen = this.getAttribute("aria-expanded") === "true";

    infoAccordionButtons.forEach((otherButton) => {
      if (otherButton === this) return;

      otherButton.setAttribute("aria-expanded", "false");
    });

    this.setAttribute("aria-expanded", String(!isOpen));
  });
});
