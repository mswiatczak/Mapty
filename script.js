"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      const coords = [latitude, longitude];
      const map = L.map("map").setView(coords, 13);
      const key = "0BjcRLLBy3CzjB4WW5gr";
      L.tileLayer(
        `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,
        {
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 1,
          attribution:
            '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
          crossOrigin: true,
        }
      ).addTo(map);

      map.on("click", function (mapEvent) {
        const { lat, lng } = mapEvent.latlng;
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: "running-popup",
            })
          )
          .setPopupContent("Workout")
          .openPopup();
      });
    },
    function () {
      alert("Could not get your position");
    }
  );
}
