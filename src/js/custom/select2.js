if (
  typeof window.jQuery !== "undefined" &&
  typeof window.jQuery.fn.select2 !== "undefined"
) {
  $(".js-select").each(function () {
    const select = $(this);
    const isMultiple = this.multiple;

    select.select2({
      width: "100%",
      placeholder: select.data("placeholder") || "",
      closeOnSelect: !isMultiple,
      allowClear: false,
      minimumResultsForSearch: Infinity,

      templateResult: function (option) {
        if (!option.id) {
          return option.text;
        }

        const optionEl = document.createElement("span");
        optionEl.className = "customSelectOption";

        const check = document.createElement("span");
        check.className = "customSelectOption__check";

        const text = document.createElement("span");
        text.className = "customSelectOption__text";
        text.textContent = option.text;

        optionEl.appendChild(check);
        optionEl.appendChild(text);

        return optionEl;
      },
    });

    const select2Container = select.next(".select2-container");
    const selection = select2Container.find(".select2-selection");

    /*
     * Multiple Select2 nemá vlastní arrow.
     * Přidáme stejnou strukturu jako používá single select.
     */
    if (
      isMultiple &&
      !selection.find(".select2-selection__arrow").length
    ) {
      selection.append(`
        <span
          class="select2-selection__arrow"
          role="presentation"
        >
          <b role="presentation"></b>
        </span>
      `);
    }

    if (!isMultiple) {
      return;
    }

    /*
     * Inline input necháme kvůli placeholderu,
     * ale vyhledávání probíhá až v dropdownu.
     */
    const selectionSearch = select2Container.find(
      ".select2-search__field"
    );

    selectionSearch.attr("readonly", true);

    /*
     * Dropdown search pro multiple
     */
    select.on("select2:open", function () {
      const dropdown = document.querySelector(
        ".select2-container--open .select2-dropdown"
      );

      if (!dropdown) {
        return;
      }

      let searchWrap = dropdown.querySelector(
        ".customSelectDropdownSearch"
      );

      if (!searchWrap) {
        searchWrap = document.createElement("div");
        searchWrap.className = "customSelectDropdownSearch";

        const searchInput = document.createElement("input");

        searchInput.type = "search";
        searchInput.className =
          "customSelectDropdownSearch__input";

        searchInput.autocomplete = "off";

        searchInput.placeholder =
          select.data("search-placeholder") ||
          select.data("placeholder") ||
          "Začněte psát jméno";

        searchWrap.appendChild(searchInput);

        dropdown.insertBefore(
          searchWrap,
          dropdown.firstChild
        );

        searchInput.addEventListener("input", function () {
          const select2 = select.data("select2");

          if (!select2) {
            return;
          }

          select2.trigger("query", {
            term: this.value,
          });
        });
      }

      const searchInput = searchWrap.querySelector(
        ".customSelectDropdownSearch__input"
      );

      if (!searchInput) {
        return;
      }

      searchInput.value = "";

      setTimeout(function () {
        searchInput.focus();
      }, 0);
    });
  });
}