const routeMapElement = document.querySelector(".js-route-map");

if (routeMapElement && typeof L !== "undefined") {
  fetch("files/maps/j50.gpx")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("GPX HTTP error: " + response.status);
      }

      return response.text();
    })
    .then(function (gpxDocument) {
      initRouteMap(gpxDocument);
    })
    .catch(function (error) {
      console.error("GPX load error:", error);
    });
}

function initRouteMap(gpxDocument) {
  const API_KEY = "HUMp4IBM7-A3BE-euIBdY0_SovFkS6Ce90fl8MbI37c";

  const MAP_ID = routeMapElement.id;

  function computePopupWidth(mapW, mapH) {
    const el = document.getElementById(MAP_ID);

    const w =
      typeof mapW === "number" && !isNaN(mapW)
        ? mapW
        : el
        ? el.clientWidth
        : window.innerWidth;

    const h =
      typeof mapH === "number" && !isNaN(mapH)
        ? mapH
        : el
        ? el.clientHeight
        : window.innerHeight;

    if (!h || isNaN(h)) {
      return 320;
    }

    let desired = Math.round(h * 0.8625);

    desired = Math.min(desired, Math.round(w * 0.95));

    desired = Math.min(desired, Math.round(window.innerWidth * 0.95));

    desired = Math.min(desired, 960);
    desired = Math.max(desired, 320);

    return desired;
  }

  function applyPopupWidth(popup, desiredPx) {
    try {
      popup.options.maxWidth = desiredPx;
      popup.options.minWidth = desiredPx;

      const container = popup._container;

      if (container) {
        const wrapper = container.querySelector(
          ".leaflet-popup-content-wrapper"
        );

        if (wrapper) {
          wrapper.style.width = desiredPx + "px";

          wrapper.style.maxWidth = desiredPx + "px";

          wrapper.style.minWidth = desiredPx + "px";
        }
      }

      popup.update();
    } catch (e) {}
  }

  const arrowElement = document.querySelector("#route-map-arrow");

  const icons = {
    circle: L.DivIcon.extend({
      options: {
        className: "",
        html: '<div style="width:8px;height:8px;border-radius:50%;border:2px solid white;background:currentColor"></div>',
        iconAnchor: [7, 7],
      },
    }),

    refresh: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/enervit.png",
        iconAnchor: [6, 6],
      },
    }),

    refresh_top: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/enervit_top.png",
        iconAnchor: [6, 19],
      },
    }),

    refresh_left: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/enervit_left.png",
        iconAnchor: [68, 6],
      },
    }),

    refresh_topleft: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/enervit_topleft.png",
        iconAnchor: [68, 19],
      },
    }),

    refreshwax: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/enervit-swix.png",
        iconAnchor: [6, 6],
      },
    }),

    refreshwax_top: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/enervit-swix_top.png",
        iconAnchor: [6, 19],
      },
    }),

    refreshwax_left: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/enervit-swix_left.png",
        iconAnchor: [118, 6],
      },
    }),

    refreshwax_topleft: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/enervit-swix_topleft.png",
        iconAnchor: [118, 19],
      },
    }),

    dr_max_topright: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/dr-max-right.png",
        iconAnchor: [68, 6],
      },
    }),

    dr_max_topleft: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/dr-max-left.png",
        iconAnchor: [6, 6],
      },
    }),

    orlen: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/orlen_bottom.png",
        iconAnchor: [68, 6],
      },
    }),

    ceska_mincovna: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/ceska_mincovna_bottom_right.png",
        iconAnchor: [66, 70],
      },
    }),

    cez: L.Icon.extend({
      options: {
        iconUrl: "images/content/map/cez_topright.png",
        iconAnchor: [68, 19],
      },
    }),

    arrow: L.DivIcon.extend({
      options: {
        className: "",
        html: arrowElement ? arrowElement.innerHTML : "",
        iconAnchor: [13, 13],
      },
    }),
  };

  const map = L.map(MAP_ID, {
    gestureHandling: true,
    zoomControl: false,
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: "topright",
      forcePseudoFullscreen: true,
    },
  });

  map.setView([49.85, 15.5], 7);

  const TILE_URL =
    "https://api.mapy.cz/v1/maptiles/winter/256/{z}/{x}/{y}?apikey=" + API_KEY;

  L.tileLayer(TILE_URL, {
    minZoom: 6,
    maxZoom: 19,
    attribution:
      '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
  }).addTo(map);

  L.control
    .zoom({
      position: "topright",
    })
    .addTo(map);

  const LogoControl = L.Control.extend({
    options: {
      position: "bottomleft",
    },

    onAdd: function () {
      const container = L.DomUtil.create("div");

      const link = L.DomUtil.create("a", "", container);

      link.setAttribute("href", "https://mapy.cz/");

      link.setAttribute("target", "_blank");

      link.innerHTML =
        '<img src="https://api.mapy.cz/img/api/logo.svg" alt="Mapy.cz">';

      L.DomEvent.disableClickPropagation(link);

      return container;
    },
  });

  new LogoControl().addTo(map);

  map.on("popupopen", function (e) {
    const mapEl = document.getElementById(MAP_ID);

    const mapW = mapEl ? mapEl.clientWidth : window.innerWidth;

    const mapH = mapEl ? mapEl.clientHeight : window.innerHeight;

    const desired = computePopupWidth(mapW, mapH);

    applyPopupWidth(e.popup, desired);

    const content = e.popup._contentNode;

    if (!content) {
      return;
    }

    content.style.width = "auto";
    content.style.maxWidth = "100%";

    const images = content.querySelectorAll("img");

    images.forEach(function (img) {
      if (img.complete) {
        return;
      }

      img.addEventListener("load", function () {
        applyPopupWidth(e.popup, desired);
      });
    });

    setTimeout(function () {
      applyPopupWidth(e.popup, desired);
    }, 0);
  });

  const gpx = new L.GPX(gpxDocument, {
    async: true,

    markers: {
      startIcon: null,
      endIcon: null,
    },

    polyline_options: {
      color: "#E34D1D",
      opacity: 0.85,
      weight: 7,
    },
  }).addTo(map);

  gpx.on("addpoint", function (e) {
    if (e.point_type !== "waypoint") {
      return;
    }

    const iconName = e.element.getAttribute("data-icon") || "circle";

    if (icons[iconName]) {
      e.point.setIcon(new icons[iconName]());
    }

    const rotate = e.element.getAttribute("data-rotate");

    if (
      rotate &&
      e.point.getIcon() &&
      e.point.getIcon().options &&
      e.point.getIcon().options.html
    ) {
      e.point.getIcon().options.html =
        '<div style="width:fit-content;transform:rotate(' +
        rotate +
        'deg)">' +
        e.point.getIcon().options.html +
        "</div>";
    }

    const popup = e.point.getPopup();

    if (popup) {
      const mapEl = document.getElementById(MAP_ID);

      const mapW = mapEl ? mapEl.clientWidth : window.innerWidth;

      const mapH = mapEl ? mapEl.clientHeight : window.innerHeight;

      const desired = computePopupWidth(mapW, mapH);

      popup.options.maxWidth = desired;

      popup.options.minWidth = desired;
    }
  });

  gpx.on("loaded", function () {
    console.log("GPX LOADED");

    const bounds = gpx.getBounds();

    if (bounds && bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [20, 20],
      });
    }
  });

  gpx.on("error", function (error) {
    console.error("GPX ERROR:", error);
  });

  window.addEventListener("resize", function () {
    map.invalidateSize();
  });
}
