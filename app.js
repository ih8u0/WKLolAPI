const APIKey = "RGAPI-27833041-af4c-4894-9a22-b47293a937ab";
const euneUrl = "https://eun1.api.riotgames.com";
let summonerName;

const searchSummoner = () => {
  summonerName = document.getElementById("summoner-name").value;
  const summonerLevel = data();
};

const data = async () => {
  const summonerUrl = "/lol/summoner/v4/summoners/by-name/" + summonerName;
  const fullSummonerUrl = euneUrl + summonerUrl + "?api_key=" + APIKey;
  console.log(fullSummonerUrl);

  let dataSummoner = await fetch(fullSummonerUrl);
  dataSummoner = await dataSummoner.json();
  console.log(dataSummoner);

  const summonerLevel = dataSummoner.summonerLevel;
  console.log(summonerLevel);
};
