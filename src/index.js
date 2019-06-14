import "./style.css";

window.addEventListener("load", () => {
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSign = document.querySelector(".temperature-sign");
  let degreeSection = document.querySelector(".degree-section");
  let loading = document.querySelector(".loading");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";

      const api = `${proxy}https://api.darksky.net/forecast/5d1fbf4f413cee5e39ce51fcf562f86a/${lat},${long}`;

      fetch(api)
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          const { temperature, summary, icon } = data.currently;

          //set dom elements from the api
          let changeInfo = new Promise((resolve, reject) => {
            loading.style.display = "none";
            temperatureDescription.textContent = summary;
            temperatureDegree.textContent = temperature;
            locationTimezone.textContent = data.timezone;
            temperatureSign.textContent = "F";

            setIcon(icon, document.querySelector("#icon1"));
            resolve();
          });

          changeInfo.then(() => {
            degreeSection.addEventListener("click", function() {
              convertTemperature(
                this.querySelector(".temperature-degree").textContent,
                this.querySelector(".temperature-sign").textContent
              );
            });
          });
        });
    });
  }

  function setIcon(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  function convertTemperature(temperature, sign) {
    if (sign === "F") {
      temperatureSign.textContent = "C";
      temperatureDegree.textContent = (((+temperature - 32) * 5) / 9).toFixed(
        2
      );
    } else {
      temperatureSign.textContent = "F";
      temperatureDegree.textContent = ((+temperature * 9) / 5 + 32).toFixed(2);
    }
  }
});
