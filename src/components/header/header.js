const body = document.body;

const menuToggle = document.querySelector(".js-nav-toggle");
const searchToggle = document.querySelector(".js-search-open");
const search = document.querySelector(".js-search");

const menuItems = document.querySelectorAll(".js-menu-item");
const menuButtons = document.querySelectorAll(".js-menu-toggle");

const desktopWidth = 1200;

function closeMenus() {
  menuItems.forEach((item) => {
    item.classList.remove("is-open");

    const button = item.querySelector(".js-menu-toggle");

    if (button) {
      button.setAttribute("aria-expanded", "false");
    }
  });
}

function closeMobileNav() {
  body.classList.remove("is-nav-open");

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }

  closeMenus();
}

function closeSearch() {
  body.classList.remove("is-search-open");

  if (search) {
    search.classList.remove("is-open");
  }
}

if (menuToggle) {
  menuToggle.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = body.classList.contains("is-nav-open");

    closeSearch();

    body.classList.toggle("is-nav-open", !isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));

    if (isOpen) {
      closeMenus();
    }
  });
}

if (searchToggle && search) {
  searchToggle.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = search.classList.contains("is-open");

    closeMobileNav();
    closeMenus();

    search.classList.toggle("is-open", !isOpen);
    body.classList.toggle("is-search-open", !isOpen);
  });
}

menuButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const currentItem = button.closest(".js-menu-item");

    if (!currentItem) {
      return;
    }

    const willOpen = !currentItem.classList.contains("is-open");

    closeSearch();

    menuItems.forEach((item) => {
      if (item !== currentItem) {
        item.classList.remove("is-open");

        const otherButton = item.querySelector(".js-menu-toggle");

        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");
        }
      }
    });

    currentItem.classList.toggle("is-open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

document.addEventListener("click", function (event) {
  const clickedInsideMenu = event.target.closest(".headerNav");
  const clickedInsideSearch = event.target.closest(".headerSearch");
  const clickedSearchButton = event.target.closest(".js-search-open");
  const clickedMenuButton = event.target.closest(".js-nav-toggle");

  if (!clickedInsideSearch && !clickedSearchButton) {
    closeSearch();
  }

  if (window.innerWidth >= desktopWidth) {
    if (!clickedInsideMenu) {
      closeMenus();
    }
  }

  if (
    window.innerWidth < desktopWidth &&
    body.classList.contains("is-nav-open") &&
    !clickedInsideMenu &&
    !clickedMenuButton
  ) {
    closeMobileNav();
  }
});

window.addEventListener("resize", function () {
  closeMenus();
  closeSearch();

  body.classList.remove("is-nav-open");

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
