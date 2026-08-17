(function () {
  var form = document.querySelector(".quote-box form");
  if (!form) return;

  var statusEl = document.createElement("p");
  statusEl.className = "form-status";
  statusEl.setAttribute("role", "status");
  form.appendChild(statusEl);

  function getUtmSource() {
    try {
      var stored = JSON.parse(sessionStorage.getItem("utm_data") || "{}");
      return stored.utm_source || "direct";
    } catch (e) {
      return "direct";
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    statusEl.textContent = "Sending your request…";

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    var formData = new FormData(form);
    var payload = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      business: formData.get("business"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      sqft: formData.get("sqft"),
      service: formData.get("service"),
      notes: formData.get("notes"),
      utm_source: getUtmSource(),
    };

    fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(function () {
        form.reset();
        statusEl.textContent =
          "Thanks — your request was received. We'll reply by the next business day.";
        statusEl.classList.add("form-status-success");
      })
      .catch(function () {
        statusEl.textContent =
          "Something went wrong sending your request. Please call (866) 958-8773 instead.";
        statusEl.classList.add("form-status-error");
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
})();
