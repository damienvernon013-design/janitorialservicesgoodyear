(function () {
  var KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
  var params = new URLSearchParams(window.location.search);
  var stored = {};

  try {
    var existing = sessionStorage.getItem("utm_data");
    if (existing) stored = JSON.parse(existing);
  } catch (e) {}

  var hasNew = false;
  KEYS.forEach(function (key) {
    var value = params.get(key);
    if (value) {
      stored[key] = value;
      hasNew = true;
    }
  });

  if (hasNew) {
    stored.landing_page = window.location.pathname;
    stored.first_seen = stored.first_seen || new Date().toISOString();
    try {
      sessionStorage.setItem("utm_data", JSON.stringify(stored));
    } catch (e) {}
  }

  document.querySelectorAll('input[name="utm_source"]').forEach(function (field) {
    if (stored.utm_source) field.value = stored.utm_source;
    else if (!field.value) field.value = "direct";
  });
})();
