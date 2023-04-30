const getAddress = {
    APIkey: "at_KcMC0GkoBIWgrY2WWAWXa09RpazKh",
    IPinput: document.getElementsByClassName("get-info__input")[0],
    submitQuery: document.getElementsByClassName("get-info__submit")[0],
    getData: async function getIPaddress() {
        const jsonData = `https://geo.ipify.org/api/v2/country,city?apiKey=${this.APIkey}&ipAddress=${this.IPinput.value}`;
        const response = await fetch(jsonData);
        const data = await response.json();
        return data;
      }
}

getAddress.submitQuery.onclick = (e) => {
  e.preventDefault();
  getAddress.IPinput.value = ""
 
  getAddress.getData().then((data) => {
    console.log(data);
  });
};
