const APIKey = "RGAPI-27833041-af4c-4894-9a22-b47293a937ab";
const euneUrl = "https://eun1.api.riotgames.com";
let summonerName;

const searchSummoner = () => {
  summonerName = document.getElementById("summoner-name").value;
  data();
};

const data = async () => {
  const summonerUrl = "/lol/summoner/v4/summoners/by-name/" + summonerName;
  const fullSummonerUrl = euneUrl + summonerUrl + "?api_key=" + APIKey;
  console.log(fullSummonerUrl);

  let dataSummoner = await fetch(fullSummonerUrl);
  dataSummoner = await dataSummoner.json();
  console.log(dataSummoner);

  const summonerLevel = dataSummoner.summonerLevel;
  const summonerIcon = dataSummoner.profileIconId;
  console.log(summonerLevel);
  console.log(summonerIcon);

  // USTAWIANIE NA STRONIE
  let info = document.getElementById("summoner-info");
  info.style.display = "flex";
  let iconUrl =
    "url('https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/" +
    summonerIcon +
    ".png')";
  let icon = document.getElementById("icon");
  icon.style.background = iconUrl;
  icon.style.backgroundSize = "contain";
  icon.style.backgroundPosition = "center";

  let name = document.getElementById("name");
  name.innerText = summonerName;

  let lvl = document.getElementById("lvl");
  lvl.innerText = summonerLevel;
  // !!!!!!!!!
};
