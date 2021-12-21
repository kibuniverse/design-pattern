// 泡泡糖游戏
const playerDirector = (function () {
  const players = {};
  const operate = {
    addPlayer(player) {
      const teamName = player.teamName;
      players[teamName] = players[teamName] || [];
      players[teamName].push(player);
    },
    removePlayer(player) {
      const playerName = player.name;
      const playerTeam = player.teamName;
      console.log(`prepare remove ${playerName} from ${playerTeam})}`);
      players[playerTeam].forEach((item, index) => {
        if (item.name === playerName) {
          players[playerTeam].splice(index, 1);
        }
      });
      console.log(players);
    },
    playerDie(player) {
      const playerName = player.name;
      const playerTeam = player.teamName;
      player.status = "dead";
      console.log(`${playerName} die in ${playerTeam}`);
      if (players[playerTeam].every((item) => item.status === "dead")) {
        console.log(`${playerTeam} team lose`);
        players[playerTeam].forEach((item) => item.lose());
        Object.keys(players).forEach((item) => {
          if (item != playerTeam) {
            players[item].forEach((item) => item.win());
          }
        });
      }
    },
    changeTeam(player, newTeamName) {
      const playerName = player.name;
      const playerTeam = player.teamName;
      console.log(
        `${playerName} change team from ${playerTeam} to ${newTeamName}`
      );
      players[playerTeam].forEach((item, index) => {
        if (item.name === playerName) {
          players[playerTeam].splice(index, 1);
        }
      });
      players[newTeamName] = players[newTeamName] || [];
      players[newTeamName].push(player);
      player.teamName = newTeamName;
    },
  };
  const receiveMessage = (message, ...args) => {
    console.log(message);
    operate[message](...args);
  };
  return { receiveMessage };
})();
const players = [];
// 玩家
class Player {
  constructor(name, teamName) {
    this.name = name;
    this.status = "live";
    this.teamName = teamName;
  }

  win() {
    console.log(`winner: ${this.name}`);
  }

  lose() {
    console.log(`loser: ${this.name}`);
  }

  die() {
    playerDirector.receiveMessage("playerDie", this);
  }

  changeTeam(teamName) {
    playerDirector.receiveMessage("changeTeam", this, teamName);
  }
}

function playerFactory(name, teamName) {
  const player = new Player(name, teamName);
  playerDirector.receiveMessage("addPlayer", player);
  return player;
}

const player1 = playerFactory("player1", "team1");
const player2 = playerFactory("player2", "team1");
const player3 = playerFactory("player3", "team2");
const player4 = playerFactory("player4", "team2");
const player5 = playerFactory("player5", "team1");

player5.changeTeam("team2");
player1.die();
player2.die();
player5.die();
