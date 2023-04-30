const getAddress = {
  APIkey: "at_KcMC0GkoBIWgrY2WWAWXa09RpazKh",
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
getAddress.submitQuery.onclick = (e) => {
  e.preventDefault();

  getAddress.getData().then((data) => {
    const { location, isp } = data;

    result.IP.innerHTML = getAddress.IPinput.value;
    result.location.innerHTML = `${location.city}, ${location.region} ${location.postalCode}`;
    result.timezone.innerHTML = `UTC ${location.timezone}`;
    result.ISP.innerHTML = isp;

    var map = L.map("map").setView([location.lat, location.lng], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var marker = L.marker([location.lat, location.lng]).addTo(map);

    getAddress.IPinput.value = "";
  });
};
