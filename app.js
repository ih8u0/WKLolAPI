const APIKey = "RGAPI-9fed9f8d-55ba-4e87-ad33-6f2cddb8f9ee";
const euneUrl = "https://eun1.api.riotgames.com";
const europeUrl = "https://europe.api.riotgames.com";
const championUrl =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";
let summonerName;
let champions = [];
const championIconUrl =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/";

// ---------------------------------------------

const getChampions = async () => {
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
getChampions();

// ---------------------------------------------

const searchSummoner = () => {
  summonerName = document.getElementById("summoner-name").value;
  document.getElementById("last-games").innerHTML = "";
  data();
};

// ---------------------------------------------

const data = async () => {
  // LVL NAZWA I IKONKA
  const summonerUrl = "/lol/summoner/v4/summoners/by-name/" + summonerName;
  const fullSummonerUrl = euneUrl + summonerUrl + "?api_key=" + APIKey;

  let dataSummoner = await fetch(fullSummonerUrl);
  dataSummoner = await dataSummoner.json();

  const summonerLevel = dataSummoner.summonerLevel;
  const summonerIcon = dataSummoner.profileIconId;

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
  // ---------------------------------------------

  // IKONKI CHAMPIONOW PO ID
  // for (const champion of champions) {
  //   console.log(champion.name + " " + championIconUrl + champion.id + ".png");
  // }

  // OSTATNIE GRY
  let puuid = dataSummoner.puuid;
  let matchesUrl =
    europeUrl +
    "/lol/match/v5/matches/by-puuid/" +
    puuid +
    "/ids?start=0&count=20&api_key=" +
    APIKey;
  // console.log(matchesUrl);

  let lastGamesIDs = await fetch(matchesUrl);
  lastGamesIDs = await lastGamesIDs.json();
  // console.log(lastGamesIDs);
  let win, championID, champLevel, kills, deaths, assists;
  for (const gameID of lastGamesIDs) {
    let matchUrl =
      europeUrl + "/lol/match/v5/matches/" + gameID + "?api_key=" + APIKey;

    let gameData = await fetch(matchUrl);
    gameData = await gameData.json();

    for (const participant of gameData.info.participants) {
      // console.log(participant);
      if (participant.summonerId == dataSummoner.id) {
        win = participant.win;
        championID = participant.championId;
        champLevel = participant.champLevel;
        kills = participant.kills;
        deaths = participant.deaths;
        assists = participant.assists;
        let lastGamesDOM = document.getElementById("last-games");
        let isWinDOM = document.createElement("div");
        let gameDOM = document.createElement("div");
        if (win) {
          gameDOM.classList = "win";
          isWinDOM.innerHTML = "<h2>WIN</h2>";
        } else {
          gameDOM.classList = "loose";
          isWinDOM.innerHTML = "<h2>LOOSE</h2>";
        }

        let championIconDOM = document.createElement("div");
        for (const champion of champions) {
          if ((champion.id = championID)) {
            championIconDOM.style.background =
              "url('" + championIconUrl + championID + ".png')";
            championIconDOM.style.backgroundSize = "contain";
            championIconDOM.style.backgroundPosition = "center";
            championIconDOM.classList = "champ-icon";
          }
        }

        let championLevelDOM = document.createElement("div");
        championLevelDOM.innerText = champLevel;
        championLevelDOM.classList = "champ-level";

        let kdaDOM = document.createElement("div");
        kdaDOM.innerText = kills + " / " + deaths + " / " + assists;
        kdaDOM.classList = "KDA";

        championIconDOM.appendChild(championLevelDOM);
        gameDOM.appendChild(championIconDOM);
        gameDOM.appendChild(kdaDOM);
        gameDOM.appendChild(isWinDOM);
        lastGamesDOM.appendChild(gameDOM);
        // console.log(
        // "win " +
        //   win +
        //   "; championID " +
        //   championID +
        //   "; champ level " +
        //   champLevel +
        //   "; KDA " +
        //   kills +
        //   "/" +
        //   deaths +
        //   "/" +
        //   assists
        // );
      }
    }
  }
};
