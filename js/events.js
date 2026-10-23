(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-start]"));
  var countdown = document.querySelector("[data-countdown]");
  var countdownName = document.querySelector("[data-countdown-name]");
  var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-quarter-tab]"));
  var filterStatus = document.querySelector("[data-filter-status]");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".idea-chip"));
  var bringField = document.querySelector("#mitbringen-feld");
  var form = document.querySelector("#event-form");
  var anlass = form ? form.querySelector("select[name='anlass']") : null;

  function pad(value) {
    return value < 10 ? "0" + value : String(value);
  }

  function nextCard(now) {
    var upcoming = cards.filter(function (card) {
      return new Date(card.getAttribute("data-end")).getTime() > now;
    });
    upcoming.sort(function (a, b) {
      return new Date(a.getAttribute("data-start")) - new Date(b.getAttribute("data-start"));
    });
    return upcoming[0] || null;
  }

  function renderCountdown() {
    if (!countdown || !countdownName) return;
    var now = Date.now();
    var card = nextCard(now);
    var days = countdown.querySelector("[data-days]");
    var hours = countdown.querySelector("[data-hours]");
    var minutes = countdown.querySelector("[data-minutes]");
    var seconds = countdown.querySelector("[data-seconds]");
    if (!card) {
      countdownName.textContent = "Programm 2027 ist durch";
      days.textContent = "0";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";
      return;
    }
    var start = new Date(card.getAttribute("data-start")).getTime();
    var label = card.getAttribute("data-label");
    var fallback = document.getElementById("countdown-fallback");
    var when = card.querySelector("time");
    if (fallback && when) fallback.textContent = when.textContent.trim();
    if (start <= now) {
      countdownName.textContent = label + " läuft";
      days.textContent = "0";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";
      return;
    }
    countdownName.textContent = label;
    var diff = Math.floor((start - now) / 1000);
    days.textContent = String(Math.floor(diff / 86400));
    hours.textContent = pad(Math.floor((diff % 86400) / 3600));
    minutes.textContent = pad(Math.floor((diff % 3600) / 60));
    seconds.textContent = pad(diff % 60);
  }

  function selectTab(tab, announce) {
    var quarter = tab.getAttribute("data-quarter-tab");
    tabs.forEach(function (item) {
      var on = item === tab;
      item.setAttribute("aria-selected", on ? "true" : "false");
      item.tabIndex = on ? 0 : -1;
    });
    var visible = 0;
    cards.forEach(function (card) {
      var show = quarter === "alle" || card.getAttribute("data-quarter") === quarter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    var list = document.getElementById("programm-liste");
    if (list) list.setAttribute("aria-labelledby", tab.id);
    if (announce && filterStatus) {
      var label = tab.textContent.replace(/\s+/g, " ").trim();
      filterStatus.textContent = label + ": " + visible + (visible === 1 ? " Anlass" : " Anlässe");
    }
  }

  if (countdown) {
    renderCountdown();
    window.setInterval(renderCountdown, 1000);
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      selectTab(tab, true);
    });
    tab.addEventListener("keydown", function (event) {
      var next = null;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      if (next === null) return;
      event.preventDefault();
      tabs[next].focus();
      selectTab(tabs[next], true);
    });
  });

  function linesOf(value) {
    return value.split(/\n/).map(function (line) {
      return line.trim();
    }).filter(Boolean);
  }

  function syncChips() {
    if (!bringField) return;
    var current = linesOf(bringField.value);
    chips.forEach(function (chip) {
      var idea = chip.getAttribute("data-idea");
      chip.setAttribute("aria-pressed", current.indexOf(idea) !== -1 ? "true" : "false");
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      if (!bringField) return;
      var idea = chip.getAttribute("data-idea");
      var current = linesOf(bringField.value);
      var index = current.indexOf(idea);
      if (index === -1) current.push(idea);
      else current.splice(index, 1);
      bringField.value = current.join("\n");
      syncChips();
      bringField.focus();
    });
  });

  if (bringField) {
    bringField.addEventListener("input", syncChips);
  }

  if (form) {
    form.addEventListener("reset", function () {
      window.setTimeout(syncChips, 0);
    });
  }

  document.querySelectorAll("[data-pick]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!anlass) return;
      anlass.value = link.getAttribute("data-pick");
    });
  });

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-999px";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        area.remove();
      }
    });
  }

  document.querySelectorAll("[data-share]").forEach(function (button) {
    button.addEventListener("click", function () {
      var text = button.getAttribute("data-share");
      var url = button.getAttribute("data-share-url");
      var box = button.parentElement;
      var status = box.querySelector("[data-share-status]");
      if (!status && box.nextElementSibling && box.nextElementSibling.hasAttribute("data-share-status")) {
        status = box.nextElementSibling;
      }
      var payload = text + " " + url;
      function mark(message) {
        if (!status) return;
        status.hidden = false;
        status.textContent = message;
      }
      if (navigator.share) {
        navigator.share({ title: "CryptoZürich", text: text, url: url }).then(function () {
          mark("Teilen ist offen.");
        }).catch(function (error) {
          if (error && error.name === "AbortError") return;
          copyText(payload).then(function () {
            mark("Einladung ist kopiert.");
          }).catch(function () {
            mark("Kopieren hat nicht geklappt. Der Text steht im Button.");
          });
        });
        return;
      }
      copyText(payload).then(function () {
        mark("Einladung ist kopiert.");
      }).catch(function () {
        mark("Kopieren hat nicht geklappt.");
      });
    });
  });
})();
