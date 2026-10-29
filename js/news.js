(function () {
  var months = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
  ];

  function formatDate(iso) {
    var parts = String(iso).split("-");
    var month = months[Number(parts[1]) - 1] || "";
    return Number(parts[2]) + ". " + month + " " + parts[0];
  }

  function reportPath(item) {
    if (!item || !/^\d{4}-\d{2}-\d{2}$/.test(item.date || "")) return "";
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug || "")) return "";
    return "/news/" + item.date + "-" + item.slug + ".html";
  }

  var list = document.querySelector("[data-news-list]");
  if (list) {
    var items = (window.CZ_NEWS || []).filter(function (item) {
      return item && !item.draft && reportPath(item);
    });
    items.sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });
    if (items.length) {
      list.textContent = "";
      items.forEach(function (item) {
        var link = document.createElement("a");
        link.className = "news-card";
        link.href = reportPath(item);
        var time = document.createElement("time");
        time.dateTime = item.date;
        time.textContent = formatDate(item.date);
        var title = document.createElement("h2");
        title.textContent = item.title || "";
        var teaser = document.createElement("p");
        teaser.textContent = item.teaser || "";
        link.appendChild(time);
        link.appendChild(title);
        link.appendChild(teaser);
        list.appendChild(link);
      });
    }
  }

  var comments = document.getElementById("remark42");
  var host = (window.CZ_CONFIG && window.CZ_CONFIG.REMARK42_HOST) || "";
  var siteId = (window.CZ_CONFIG && window.CZ_CONFIG.REMARK42_SITE_ID) || "";
  if (!comments || !host || !siteId) return;

  try {
    var canonical = document.querySelector('link[rel="canonical"]');
    var scheme = document.querySelector('meta[name="color-scheme"]');
    var theme = scheme && String(scheme.content).indexOf("light") === 0 ? "light" : "dark";
    var pageUrl = canonical && canonical.href
      ? canonical.href
      : window.location.origin + window.location.pathname;
    window.remark_config = {
      host: host,
      site_id: siteId,
      components: ["embed"],
      url: pageUrl,
      locale: "de",
      theme: theme,
      no_footer: true
    };
    var components = window.remark_config.components;
    var target = document.head || document.body;
    for (var i = 0; i < components.length; i++) {
      var script = document.createElement("script");
      script.type = "module";
      script.async = true;
      script.defer = true;
      script.src = host.replace(/\/$/, "") + "/web/" + components[i] + ".mjs";
      script.onerror = function () {};
      target.appendChild(script);
    }
  } catch (error) {
    return;
  }
})();
