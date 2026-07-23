const coordinates = listing.geometry.coordinates;

const map = L.map("map").setView(
  [coordinates[1], coordinates[0]],
  9
);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

L.marker([coordinates[1], coordinates[0]])
  .addTo(map)
  .bindPopup(
    `<h4>${listing.title}</h4>
     <p>Exact Location will be provided after booking</p>`
  )
  .openPopup();