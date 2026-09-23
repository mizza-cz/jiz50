const startListFilterButton = document.querySelector(
  ".startList__filterButton"
);

const startListMobileFilter = document.querySelector(
  ".js-startList-mobileFilter"
);

if (startListFilterButton && startListMobileFilter) {
  startListFilterButton.addEventListener("click", function () {
    startListMobileFilter.classList.toggle("is-open");
  });
}
