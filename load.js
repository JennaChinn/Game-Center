class Profile {
  constructor(color,picture) {
    this.name="Empty";
    this.color=color;
    this.picture=picture;
    this.ops={};
    this.otherWins={
      "tictactoe":0,
      "connect4":0,
      "rummy":0,
      "hearts":0,
      "cribbage":0,
    };
    this.totWins={
      "tictactoe":0,
      "connect4":0,
      "rummy":0,
      "hearts":0,
      "cribbage":0
    }
    this.totGames={
      "tictactoe":0,
      "connect4":0,
      "rummy":0,
      "hearts":0,
      "cribbage":0,
    };
    this.gameNames={
      "tictactoe":"Tic-Tac-Toe",
      "connect4":"Connect 4",
      "rummy":"Rummy",
      "hearts":"Hearts",
      "cribbage":"Cribbage"
    }
  }/*
  changeName(newN) {
    this.name=newN;
  }
  addOp(opName) {
    this.ops[opName]={
      "tictactoe":0,
      "connect4":0,
      "mancala":0,
      "rummy":0,
      "hearts":0,
      "cribbage":0
    };
  }
  remOp(opName) {
    this.ops[opName].forEach((x)=>this.otherWins+=this.ops[opName][x]);
    delete this.ops[opName];
  }
  win(opName,game) {
    this.ops[opName][game]++;
  }*/
};
window.onload=()=> {
  if (!localStorage.getItem("profs")) {
    let arr=[
      new Profile("#ffb0b3","/pics/redDog.png"),
      new Profile("#ffd6ab","/pics/orangeCat.png"),
      new Profile("#fffca4","/pics/yellowDino.png"),
      new Profile("#b9ff9d","/pics/greenCow.png"),
      new Profile("#abf1ff","/pics/blueShark.png"),
      new Profile("#c8adff","/pics/purpleFish.png"),
      new Profile("#ffc6eb","/pics/pinkPegasus.png"),
      new Profile("#ffffff","/pics/whiteChicken.png"),
      new Profile("#d9bba4","/pics/brownMonkey.png"),
      new Profile("#a3a1a1","/pics/greyElephant.png")
    ];
    localStorage.setItem("profs",JSON.stringify(arr));
  }
  if (!localStorage.getItem("games")) localStorage.setItem("games",JSON.stringify({
    "connect4":[],
    "tictactoe":[],
    "rummy":{},
    "hearts":{},
    "cribbage":{}
  }));
}