(function () {
  var config = window.CZ_CONFIG || {};
  var endpoint = config.endpoint || "https://api.web3forms.com/submit";
  var key = config.web3formsAccessKey || "";
  var placeholder = "WEB3FORMS_ACCESS_KEY";

  document.querySelectorAll("form[data-cz-form]").forEach(function (form) {
    var shell = form.closest(".form-shell");
    var status = form.querySelector("[data-form-status]");
    var success = shell ? shell.querySelector("[data-form-success]") : null;
    var button = form.querySelector("[type='submit']");
    var buttonLabel = button ? button.textContent : "";
    var keyInput = form.querySelector("input[name='access_key']");

    if (keyInput && key && key !== placeholder) {
      keyInput.value = key;
    }

    form.querySelectorAll("input, textarea, select").forEach(function (field) {
      field.addEventListener("invalid", function () {
        var message = "Bitte dieses Feld ausfüllen.";
        if (field.validity.typeMismatch && field.type === "email") {
          message = "Bitte eine gültige E-Mail angeben.";
        } else if (field.validity.tooShort) {
          message = "Das ist noch etwas kurz.";
        } else if (field.validity.rangeUnderflow || field.validity.rangeOverflow) {
          message = "Bitte eine Zahl zwischen 1 und 4 angeben.";
        } else if (field.type === "checkbox" && field.validity.valueMissing) {
          message = "Bitte bestätige das, damit wir weitermachen können.";
        } else if (field.validity.patternMismatch) {
          message = "Der Transaktions-Hash beginnt mit 0x und hat danach 64 Zeichen.";
        }
        field.setCustomValidity(message);
      });
      function clearCustom() {
        field.setCustomValidity("");
      }
      field.addEventListener("input", clearCustom);
      field.addEventListener("change", clearCustom);
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearStatus();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var honeypot = form.querySelector("input[name='botcheck']");
      if (honeypot && honeypot.checked) {
        showSuccess();
        return;
      }

      if (!key || key === placeholder) {
        showError("Das Formular ist noch nicht freigeschaltet.");
        return;
      }

      if (!button) return;
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      button.textContent = "Wird gesendet …";

      var data = new FormData(form);
      data.set("access_key", key);
      data.set("from_name", "CryptoZürich Website");
      if (!honeypot || !honeypot.checked) data.set("botcheck", "");

      var controller = new AbortController();
      var timer = setTimeout(function () {
        controller.abort();
      }, 20000);

      fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
        signal: controller.signal
      })
        .then(function (response) {
          return response.text().then(function (text) {
            var body = {};
            try {
              body = text ? JSON.parse(text) : {};
            } catch (error) {
              body = {};
            }
            return { ok: response.ok, body: body };
          });
        })
        .then(function (result) {
          if (result.ok && result.body && result.body.success) {
            form.reset();
            if (keyInput) keyInput.value = key;
            showSuccess();
            return;
          }
          showError("Senden hat nicht geklappt. Versuch es in einem Moment noch einmal.");
        })
        .catch(function (error) {
          if (error && error.name === "AbortError") {
            showError("Das hat zu lange gedauert. Versuch es noch einmal.");
            return;
          }
          showError("Senden hat nicht geklappt. Prüfe deine Verbindung und versuch es noch einmal.");
        })
        .finally(function () {
          clearTimeout(timer);
          button.disabled = false;
          button.removeAttribute("aria-busy");
          button.textContent = buttonLabel;
        });
    });

    function clearStatus() {
      if (!status) return;
      status.hidden = true;
      status.textContent = "";
    }

    function showError(message) {
      if (!status) return;
      status.hidden = false;
      status.textContent = message;
      status.focus();
    }

    function showSuccess() {
      clearStatus();
      if (!success) return;
      form.hidden = true;
      success.hidden = false;
      success.focus();
    }
  });

  var brevoUrl = config.BREVO_FORM_URL || "";

  document.querySelectorAll("form[data-brevo-form]").forEach(function (form) {
    var shell = form.closest(".form-shell") || form.parentElement;
    var status = form.querySelector("[data-form-status]");
    var success = shell ? shell.querySelector("[data-form-success]") : null;
    var button = form.querySelector("[type='submit']");
    var buttonLabel = button ? button.textContent : "";
    var email = form.querySelector("input[name='EMAIL']");
    var honeypot = form.querySelector("input[name='email_address_check']");

    form.querySelectorAll("input").forEach(function (field) {
      field.addEventListener("invalid", function () {
        var message = "Bitte eine E-Mail angeben.";
        if (field.validity.typeMismatch) {
          message = "Bitte eine gültige E-Mail angeben.";
        }
        field.setCustomValidity(message);
      });
      field.addEventListener("input", function () {
        field.setCustomValidity("");
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearStatus();
      if (email) email.value = email.value.trim();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (honeypot && honeypot.value) {
        showSuccess();
        return;
      }

      if (!brevoUrl) {
        showError("Das Formular ist noch nicht freigeschaltet.");
        return;
      }

      if (!button || !email) return;
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      button.textContent = "Wird gesendet …";

      var body = new URLSearchParams();
      body.set("EMAIL", email.value.trim());
      body.set("email_address_check", honeypot ? honeypot.value : "");
      body.set("locale", "de");
      body.set("html_type", "simple");

      var controller = new AbortController();
      var timer = setTimeout(function () {
        controller.abort();
      }, 20000);

      fetch(brevoUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
        signal: controller.signal
      })
        .then(function () {
          form.reset();
          showSuccess();
        })
        .catch(function (error) {
          if (error && error.name === "AbortError") {
            showError("Das hat zu lange gedauert. Versuch es noch einmal.");
            return;
          }
          showError("Senden hat nicht geklappt. Prüfe deine Verbindung und versuch es noch einmal.");
        })
        .finally(function () {
          clearTimeout(timer);
          if (!button || button.closest("form").hidden) return;
          button.disabled = false;
          button.removeAttribute("aria-busy");
          button.textContent = buttonLabel;
        });
    });

    function clearStatus() {
      if (!status) return;
      status.hidden = true;
      status.textContent = "";
    }

    function showError(message) {
      if (!status) return;
      status.hidden = false;
      status.textContent = message;
      status.focus();
    }

    function showSuccess() {
      clearStatus();
      if (!success) return;
      form.hidden = true;
      success.hidden = false;
      success.focus();
    }
  });
})();
