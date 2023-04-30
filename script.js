async function getIPaddress(IPaddress) {
  const jsonData = `https://geo.ipify.org/api/v2/country,city?apiKey=at_KcMC0GkoBIWgrY2WWAWXa09RpazKh&ipAddress=${IPaddress}`;
  const response = await fetch(jsonData);
  const data = await response.json();
  return data;
}

getIPaddress().then((data) => {
  console.log(data);
});
