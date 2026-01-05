document.addEventListener("DOMContentLoaded", () => {
  /* ==================================================
     DARK MODE TOGGLE
  ================================================== */

  const toggleBtn = document.getElementById("darkToggle");
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️ Light Mode";
  }

  // Toggle button click
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️ Light Mode";
      } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙 Dark Mode";
      }
    });
  }

  /* ==================================================
     LEAFLET MAP (Listing Show Page)
  ================================================== */

  const mapDiv = document.getElementById("map");

  if (mapDiv) {
    const lat = parseFloat(mapDiv.dataset.lat);
    const lng = parseFloat(mapDiv.dataset.lng);
    const title = mapDiv.dataset.title || "Location";
    const location = mapDiv.dataset.location || "";

    if (!isNaN(lat) && !isNaN(lng)) {
      const map = L.map("map").setView([lat, lng], 13);

      // OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap"
      }).addTo(map);

      // Marker
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`<b>${title}</b><br>${location}`)
        .openPopup();
    } else {
      mapDiv.innerHTML =
        "<p class='text-muted text-center'>📍 Location not available</p>";
    }
  }
});

