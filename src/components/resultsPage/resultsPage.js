const resultsFilterButton = document.querySelector(".js-results-filter");
const resultsFilterClose = document.querySelector(".js-results-filter-close");
const resultsMobileFilter = document.querySelector(".js-results-mobile-filter");

if (resultsFilterButton && resultsMobileFilter) {
  resultsFilterButton.addEventListener("click", function () {
    resultsMobileFilter.classList.add("is-open");
    resultsMobileFilter.setAttribute("aria-hidden", "false");
    resultsFilterButton.setAttribute("aria-expanded", "true");

    document.body.style.overflow = "hidden";
  });
}

if (resultsFilterClose && resultsMobileFilter) {
  resultsFilterClose.addEventListener("click", function () {
    resultsMobileFilter.classList.remove("is-open");
    resultsMobileFilter.setAttribute("aria-hidden", "true");

    if (resultsFilterButton) {
      resultsFilterButton.setAttribute("aria-expanded", "false");
    }

    document.body.style.overflow = "";
  });
}

const resultsRows = document.querySelectorAll(".js-results-row");

resultsRows.forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest(".resultsPageMobileRow");
    const isOpen = row.classList.contains("is-open");

    document
      .querySelectorAll(".resultsPageMobileRow.is-open")
      .forEach((openRow) => {
        openRow.classList.remove("is-open");

        const openButton = openRow.querySelector(".js-results-row");

        if (openButton) {
          openButton.setAttribute("aria-expanded", "false");
        }
      });

    if (!isOpen) {
      row.classList.add("is-open");
      this.setAttribute("aria-expanded", "true");
    }
  });
});
