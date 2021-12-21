// 泡泡糖游戏

const players = [];
// 玩家
class Player {
  constructor(name, teamName) {
    this.name = name;
    this.partners = []; // 队友列表
    this.enemy = []; // 敌人列表
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
    this.status = "dead";
    if (this.partners.every((item) => item.status == "dead")) {
      console.log(`${this.teamName} team lose`);
      this.lose();
      this.partners.forEach((item) => item.lose());
      this.enemy.forEach((item) => item.win());
    }
  }
}

function playerFactory(name, teamName) {
  const player = new Player(name, teamName);
  players.forEach((item) => {
    if (item.teamName == teamName) {
      player.partners.push(item);
      item.partners.push(player);
    } else {
      player.enemy.push(item);
      item.enemy.push(player);
    }
  });
  players.push(player);
  return player;
}

const player1 = playerFactory("player1", "team1");
const player2 = playerFactory("player2", "team1");
const player3 = playerFactory("player3", "team2");
const player4 = playerFactory("player4", "team2");

player1.die();
player2.die();
