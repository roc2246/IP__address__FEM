const getAddress = {
  APIkey: process.env.API_KEY,
  IPinput: document.getElementsByClassName("get-info__input")[0],
  submitQuery: document.getElementsByClassName("get-info__submit")[0],
  getData: async function getIPaddress() {
    const jsonData = `https://geo.ipify.org/api/v2/country,city?apiKey=${this.APIkey}&ipAddress=${this.IPinput.value}`;
    const response = await fetch(jsonData);
    const data = await response.json();
    return data;
  },
};

const result = {
  IP: document.getElementsByClassName("ip-location__stat--info")[0],
  location: document.getElementsByClassName("ip-location__stat--info")[1],
  timezone: document.getElementsByClassName("ip-location__stat--info")[2],
  ISP: document.getElementsByClassName("ip-location__stat--info")[3],
};

function newMapCont() {
  const parent = document.getElementsByTagName("body")[0];
  const mapCont = document.getElementById("map");
  const newMap = document.createElement("div");

  if (mapCont) mapCont.remove();
  newMap.id = "map";
  parent.appendChild(newMap);
}

function initMap(lat, lng) {
  const map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const locationIcon = L.icon({
    iconUrl: "./images/icon-location.svg",

    iconSize: [80, 100], 
    iconAnchor: [22, 94], 
  });
  L.marker([lat, lng], { icon: locationIcon }).addTo(map);

  const zoomIn = document.getElementsByClassName("leaflet-control-zoom-in")[0];
  const zoomOut = document.getElementsByClassName(
    "leaflet-control-zoom-out"
  )[0];
  zoomIn.remove();
  zoomOut.remove();
}

getAddress.submitQuery.onclick = (e) => {
  e.preventDefault();

  if (getAddress.IPinput.value !== "") {
    getAddress
      .getData()
      .then((data) => {
        const { location, isp } = data;

        newMapCont();
        initMap(location.lat, location.lng);

        getAddress.IPinput.focus();

        result.IP.innerHTML = getAddress.IPinput.value;
        result.location.innerHTML = `${location.city}, ${location.region} ${location.postalCode}`;
        result.timezone.innerHTML = `UTC ${location.timezone}`;
        isp === ""
          ? (result.ISP.innerHTML = "None")
          : (result.ISP.innerHTML = isp);

        getAddress.IPinput.value = "";
      })
      .catch((error) => {
        alert("IP address not found.");
        console.log(error);

        getAddress.IPinput.focus();

        result.IP.innerHTML = "None";
        result.location.innerHTML = "None";
        result.timezone.innerHTML = "None";
        result.ISP.innerHTML = "None";

        getAddress.IPinput.value = "";
      });
  } else {
    alert("Please enter an IP address.");
    getAddress.IPinput.focus();
  }
};
