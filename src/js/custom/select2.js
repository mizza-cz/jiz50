const customSelects = $(".js-custom-select");

if (customSelects.length) {
  customSelects.each(function () {
    const select = $(this);
    const isMultiple = this.multiple;

    select.select2({
      width: "100%",
      placeholder: select.data("placeholder") || "",
      closeOnSelect: !isMultiple,
      allowClear: false,

      templateResult: function (option) {
        if (!option.id) {
          return option.text;
        }

        const selected = select
          .find('option[value="' + option.id + '"]')
          .prop("selected");

        return $(`
          <span class="customSelectOption ${selected ? "is-selected" : ""}">
            <span class="customSelectOption__check"></span>

            <span class="customSelectOption__text">
              ${option.text}
            </span>
          </span>
        `);
      },
    });

    select.on("select2:open", function () {
      const dropdown = $(".select2-container--open .select2-dropdown");

      if (
        dropdown.length &&
        !dropdown.find(".customSelectDropdown__head").length
      ) {
        dropdown.prepend(`
          <div class="customSelectDropdown__head">
            <strong>${select.data("title") || ""}</strong>

            <button
              class="customSelectDropdown__close"
              type="button"
              aria-label="Zavřít"
            >
              ×
            </button>
          </div>
        `);
      }
    });

    if (isMultiple) {
      select.on("select2:select select2:unselect", function () {
        select.select2("close");
        select.select2("open");
      });
    }
  });

  $(document).on("click", ".customSelectDropdown__close", function () {
    $(".select2-container--open").prev("select").select2("close");
  });
}
