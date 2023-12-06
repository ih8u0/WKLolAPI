const APIKey = "RGAPI-9fed9f8d-55ba-4e87-ad33-6f2cddb8f9ee";
const euneUrl = "https://eun1.api.riotgames.com";
const championUrl =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";
let summonerName;
let champions = [];
const championIconUrl =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/";

const getMustHaveData = async () => {
  let dataChampions = await fetch(
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"
  );
  dataChampions = dataChampions.json();

  dataChampions.then((e) => {
    for (const champion of e) {
      champions.push({ name: champion.name, id: champion.id });
    }
  });
};
getMustHaveData();

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

  for (const champion of champions) {
    console.log(champion.name + " " + championIconUrl + champion.id + ".png");
  }
};
