(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var header = document.querySelector(".site-header");
  var label = toggle ? toggle.querySelector(".sr-only") : null;
  var main = document.getElementById("inhalt");
  var footer = document.querySelector(".site-footer");

  function setOpen(open, options) {
    if (!nav || !toggle) return;
    var opts = options || {};
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
    if (label) label.textContent = open ? "Menü schliessen" : "Menü öffnen";
    if (main) main.inert = open;
    if (footer) footer.inert = open;
    if (open) {
      var first = nav.querySelector("a");
      if (first) first.focus();
    } else if (opts.restoreFocus) {
      toggle.focus();
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"), { restoreFocus: false });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false, { restoreFocus: true });
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    var desktop = window.matchMedia("(min-width: 861px)");
    var onDesktop = function () {
      if (desktop.matches) setOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onDesktop);
    else if (desktop.addListener) desktop.addListener(onDesktop);
  }

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var params = new URLSearchParams(window.location.search);
  if (params.get("newsletter") === "bestaetigt" && main) {
    var banner = document.createElement("div");
    banner.className = "confirm-banner";
    banner.setAttribute("role", "status");
    var text = document.createElement("p");
    text.textContent = "Danke! Deine Newsletter-Anmeldung ist bestätigt. 🎉";
    var close = document.createElement("button");
    close.type = "button";
    close.textContent = "Schliessen";
    close.addEventListener("click", function () {
      banner.remove();
      params.delete("newsletter");
      var next = window.location.pathname + (params.toString() ? "?" + params.toString() : "") + window.location.hash;
      window.history.replaceState(null, "", next);
    });
    banner.appendChild(text);
    banner.appendChild(close);
    main.insertBefore(banner, main.firstChild);
  }
})();
