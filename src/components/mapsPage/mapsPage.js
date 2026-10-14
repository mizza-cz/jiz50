const routeMapElement = document.querySelector(".js-route-map");

if (routeMapElement && typeof L !== "undefined") {
  const API_KEY = "HUMp4IBM7-A3BE-euIBdY0_SovFkS6Ce90fl8MbI37c";
  const MAP_ID = routeMapElement.id;

  function hexToRGB(hex, alpha) {
    return (
      "rgba(" +
      parseInt(hex.slice(1, 3), 16) +
      ", " +
      parseInt(hex.slice(3, 5), 16) +
      ", " +
      parseInt(hex.slice(5, 7), 16) +
      ", " +
      alpha +
      ")"
    );
  }

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

  const icons = {
    circle: L.DivIcon.extend({
      options: {
        className: "",
        html: '<div style="width:8px;height:8px;border-radius:50%;border:2px white solid;background:currentColor"></div>',
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
        html: document.querySelector("#route-map-arrow").innerHTML,
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

  map
    .on("popupopen", function (e) {
      const mapEl = document.getElementById(MAP_ID);

      const mapW = mapEl ? mapEl.clientWidth : window.innerWidth;

      const mapH = mapEl ? mapEl.clientHeight : window.innerHeight;

      const desired = computePopupWidth(mapW, mapH);

      applyPopupWidth(e.popup, desired);

      const content = e.popup._contentNode;

      if (content) {
        content.style.width = "auto";
        content.style.maxWidth = "100%";

        const images = content.querySelectorAll("img");

        images.forEach((img) => {
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
      }
    })
    .on("popupclose", function () {});

  const LogoControl = L.Control.extend({
    options: {
      position: "bottomleft",
    },

    onAdd: function () {
      const container = L.DomUtil.create("div");

      const link = L.DomUtil.create("a", "", container);

      link.setAttribute("href", "https://mapy.cz/");
      link.setAttribute("target", "_blank");

      link.innerHTML = '<img src="https://api.mapy.cz/img/api/logo.svg">';

      L.DomEvent.disableClickPropagation(link);

      return container;
    },
  });

  new LogoControl().addTo(map);

  /*
   * White stroke under the route
   */
  L.GPX.prototype._orig_parse_gpx_data = L.GPX.prototype._parse_gpx_data;

  L.GPX.prototype._parse_gpx_data = function (xml, options) {
    const trk = xml.getElementsByTagName("trk")[0];

    if (trk) {
      const strokeTrk = trk.cloneNode(true);

      strokeTrk.setAttribute("data-trkstroke", true);

      trk.parentNode.insertBefore(strokeTrk, trk);
    }

    return L.GPX.prototype._orig_parse_gpx_data.apply(this, arguments);
  };

  L.GPX.prototype._orig_extract_styling = L.GPX.prototype._extract_styling;

  L.GPX.prototype._extract_styling = function (trk) {
    const values = L.GPX.prototype._orig_extract_styling.apply(this, arguments);

    if (trk.getAttribute("data-trkstroke")) {
      values.color = "white";
      values.opacity = 0.6;
      values.weight = 13;
    } else {
      const color = trk.getAttribute("data-color") || "#082654";

      const el = document.getElementById(MAP_ID);

      if (el) {
        el.style.color = color;
      }

      values.color = hexToRGB(color, 0.8);

      values.opacity = 1;
      values.weight = 7;
    }

    return values;
  };

  const gpx = new L.GPX("files/maps/j50.gpx", {
    async: true,
    markers: {
      startIcon: null,
      endIcon: null,
    },
  }).addTo(map);

  gpx.on("addpoint", function (e) {
    if (e.point_type !== "waypoint") {
      return;
    }

    const mapEl = document.getElementById(MAP_ID);

    const mapW = mapEl ? mapEl.clientWidth : window.innerWidth;

    const mapH = mapEl ? mapEl.clientHeight : window.innerHeight;

    const desired = computePopupWidth(mapW, mapH);

    const popup = e.point.getPopup();

    if (popup) {
      popup.options.maxWidth = desired;
      popup.options.minWidth = desired;
    }

    const iconName = e.element.getAttribute("data-icon") || "circle";

    if (icons[iconName]) {
      e.point.setIcon(new icons[iconName]());
    }

    const rotate = e.element.getAttribute("data-rotate");

    if (rotate && e.point.getIcon().options.html) {
      e.point.getIcon().options.html =
        '<div style="width:fit-content;transform:rotate(' +
        rotate +
        'deg)">' +
        e.point.getIcon().options.html +
        "</div>";
    }
  });

  gpx.on("loaded", function () {
    map.fitBounds(gpx.getBounds());
  });
}
