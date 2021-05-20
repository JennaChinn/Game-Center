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
  }
};
const inf = (prof) => {
  if (document.getElementById("div")) document.getElementById("div").remove();

  window.location.href="#top";
  let profs=JSON.parse(localStorage.getItem("profs"));
  let pr=profs[prof];
  
  let div=document.createElement("div");
  div.className="prof";
  div.style.backgroundColor=pr.color;
  div.id="div";

  let x=document.createElement("button");
  x.innerHTML="x";
  x.onclick=()=>div.remove();
  x.className="x";
  x.style.backgroundColor=pr.color;
  div.appendChild(x);

  let img=document.createElement("img");
  img.src=pr.picture;
  img.height="100";
  img.style.display="inline";
  img.style.padding="20px";
  div.appendChild(img);

  let h=document.createElement("h2");
  h.innerHTML=pr.name;
  h.style.display="inline";
  h.style.verticalAlign="50px";
  div.appendChild(h);

  if (pr.name=="Empty") {
    let b=document.createElement("button");
    b.innerHTML="Create new profile";
    b.onclick=()=>newP(prof);
    b.id="but";
    div.appendChild(b);
  }

  else {
    let h=document.createElement("h3");
    let x=0;
    let p=document.createElement("p");
    let h2=document.createElement("h3");
    let p2=document.createElement("p");

    Object.keys(pr.totGames).forEach((n)=> {
      x+=pr.totGames[n];
      p.innerHTML+=`${pr.gameNames[n]}: ${pr.totGames[n]}<br>`;
      let wr=Math.round(pr.totWins[n]/pr.totGames[n]*10000)/100;
      if (!wr) wr=0;
      p2.innerHTML+=`${pr.gameNames[n]}: ${wr}%<br>`;
    });
    h.innerHTML=`Total games: ${x}`;
    let tw=0;
    Object.keys(pr.totWins).forEach((n)=>tw+=pr.totWins[n]);
    let twr=Math.round(tw*100)/x/100;
    if (!twr) twr=0;
    h2.innerHTML=`Win rate: ${Math.round(twr*10000)/100}%`;
    div.appendChild(h);
    div.appendChild(p);
    div.appendChild(h2);
    div.appendChild(p2);

    let dBut=document.createElement("button");
    dBut.innerHTML="Delete Profile";
    dBut.id="del";
    dBut.onclick= () => delProf(prof);

    let but=document.createElement("button");
    but.innerHTML="Change name";
    but.id="but1";
    but.onclick= () => {changeName(prof);but.remove();dBut.remove();}
    div.appendChild(but);

    div.appendChild(dBut);
  }

  document.body.appendChild(div);
}

const delProf = (nmb) => {
  if (!window.confirm("Are you sure you want to delete this profile? This cannot be undone.")) return;
  
  let profs=JSON.parse(localStorage.getItem("profs"));
  let prof=profs[nmb];

  profs.forEach((x) => {
    if (x.name=="Empty" || x==prof) return;
    let a=x.ops[prof.name];
    Object.keys(a).forEach((y) => {
      x.otherWins[y]+=a[y];
    });
    delete x.ops[prof.name];
  });

  profs[nmb]=new Profile(prof.color,prof.picture);

  localStorage.setItem("profs",JSON.stringify(profs));
  window.location.reload();
}

const changeName=(nmb)=> {
  let div=document.getElementById("div");

  let inp=document.createElement("input");
  inp.type="text";
  inp.className="prof";
  inp.name="name";
  inp.id="name";
  inp.autocomplete="off";
  div.appendChild(inp);

  let lab=document.createElement("label");
  lab.innerHTML="Enter the profile's new name.";
  lab.for="name";
  lab.id="lab";
  div.appendChild(lab);

  let b=document.createElement("button");
  b.innerHTML="Enter";
  b.id="but2";
  b.onclick=()=> {
    let profs=JSON.parse(localStorage.getItem("profs"));
    let prof=profs[nmb];
    let n=inp.value;
    if (n.length<3 || n.length>15) {
      alert("Invalid length. Too "+(n.length<3?"short.":"long."));
    }
    if (n.toLowerCase()=="empty") {
      alert("\"Empty\" is an invalid name.");
      return;
    }
    if (!profs.every((x)=>x.name!=n)) {
      alert("Name already taken.");
      return;
    }
    try{
    profs.forEach((x)=> {
      if (!(x.name==prof.name) && !(x.name=="Empty")) {
        x.ops[n]=x.ops[prof.name];
        delete x.ops[prof.name]
      }
    })} catch(err){alert(err)};
    prof.name=n;

    ["name","lab","but2"].forEach((x) => document.getElementById(x).remove());
    localStorage.setItem("profs",JSON.stringify(profs));
    window.location.reload();
  };
  div.appendChild(b);
}

const newP=(nmb) => {
  let profs=JSON.parse(localStorage.getItem("profs"));
  let newProf=profs[nmb];
  div=document.getElementById("div");

  document.getElementById("but").remove();

  let inp=document.createElement("input");
  inp.type="text";
  inp.className="prof";
  inp.name="name";
  inp.id="name";
  inp.autocomplete="off";
  div.appendChild(inp);

  let lab=document.createElement("label");
  lab.innerHTML="Enter the profile's new name.";
  lab.for="name";
  lab.id="lab";
  div.appendChild(lab);

  let b=document.createElement("button");
  b.innerHTML="Enter";
  b.id="but2";
  b.onclick=()=>checkName(nmb);
  div.appendChild(b);
}

const checkName=(nmb)=> {
  let profs=JSON.parse(localStorage.getItem("profs"));
  let n=document.getElementById("name").value;
  if (n.length<3 || n.length>15) {
    alert("Invalid length. Too "+(n.length<3?"short.":"long."));
    return;
  }
  if (n.toLowerCase()=="empty") {
    alert("\"Empty\" is an invalid name.");
    return;
  }
  if (!profs.every((x)=>x.name!=n)) {
    alert("Name already taken.");
    return;
  }
  if (n.length>=5) {
    if (n.substring(0,5)=="Guest") {
      alert("\"Guest\" is an invalid name.");
      return;
    }
  }

  profs[nmb].name=n;
  document.getElementById("name").remove();
  document.getElementById("lab").remove();
  document.getElementById("but2").remove();

  profs.forEach((x)=> {
    if (!(x.name==n) && !(x.name=="Empty")) {
      x.ops[n]={
        "tictactoe":0,
        "connect4":0,
        "mancala":0,
        "rummy":0,
        "hearts":0,
        "cribbage":0,
        "games":0
      };
      try {
      profs[nmb].ops[x.name]={
        "tictactoe":0,
        "connect4":0,
        "mancala":0,
        "rummy":0,
        "hearts":0,
        "cribbage":0,
        "games":0
      };}
      catch (err) {alert(err+" "+x.name)};
    }
  });

  localStorage.setItem("profs",JSON.stringify(profs));

  window.location.reload();
}