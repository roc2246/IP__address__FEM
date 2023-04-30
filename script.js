const IPinput = document.getElementsByClassName("get-info__input")[0];
const submitQuery = document.getElementsByClassName("get-info__submit")[0];

async function getIPaddress() {
  const jsonData = `https://geo.ipify.org/api/v2/country,city?apiKey=at_KcMC0GkoBIWgrY2WWAWXa09RpazKh&ipAddress=${IPinput.value}`;
  console.log(jsonData)
  const response = await fetch(jsonData);
  const data = await response.json();
  return data;
}

submitQuery.onclick = (e) => {
  e.preventDefault();

  getIPaddress().then((data) => {
    console.log(data);
  });
};
