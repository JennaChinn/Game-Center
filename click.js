const click = (game) => {
  if (document.getElementById("div")) document.getElementById("div").remove()

  let div=document.createElement("div");
  div.id="div";
  div.className="click";
  window.location.href="#div";

  let but=document.createElement("button");
  but.className="info";
  but.onclick=()=>div.remove();
  but.innerHTML="x";
  div.appendChild(but);

  let h=document.createElement("h3");
  h.innerHTML = JSON.parse(localStorage.getItem("profs"))[0].gameNames[game];
  div.appendChild(h);

  document.body.appendChild(div);

  if (game=="rummy" || game=="cribbage") opts(game);
  else {
    go((game=="hearts")?4:2,game);
  }
}

const opts=(name)=> {
  let menu=document.createElement("select");
  menu.id="menu";
  menu.name="menu";

  let label=document.createElement("label");
  label.id="lab";
  label.for="menu";
  label.innerHTML="Number of players";

  for (let i=2; i<=(name=="rummy"?4:3);i++) {
    let op=document.createElement("option");
    op.value=i;
    op.innerHTML=i;
    op.style.color="#2d4080";
    menu.appendChild(op);
  }
  menu.value=2;

  let sBut=document.createElement("button");
  sBut.innerHTML="Enter";
  sBut.onclick=()=>go(menu.value,name);
  sBut.className="okBut";
  sBut.id="sBut";

  let div=document.getElementById("div");
  div.appendChild(label);
  div.appendChild(menu);
  div.appendChild(document.createElement("br"));
  div.appendChild(sBut);
}

const go=(nmb,name)=> {
  let g=JSON.parse(localStorage.getItem("games"));
  if ((name=="rummy" || name=="cribbage" || name=="hearts") && !(g[name]=={}) && nmb == Object.keys(g[name]).length) {
    let c=window.confirm(`Do you want to continue the previous game?\nPlayers: ${Object.keys(g[name]).join(", ")}`);
    if (c) window.location.href = (name == "connect4" || name == "tictactoe" ? "./games/" : "./trackers/") + name + ".html";
  }

  let div=document.getElementById("div");
  if (document.getElementById("menu")) {
    document.getElementById("menu").remove();
    document.getElementById("sBut").remove();
    document.getElementById("lab").remove();
  }

  let profs=JSON.parse(localStorage.getItem("profs"));
  let arr=[];
  profs.forEach((x)=>{if (!(x.name=="Empty")) arr.push(x)});

  for (let i=0; i<nmb; i++) {
    let menu=document.createElement("select");
    menu.id="menu"+(i+1);
    menu.name="menu"+(i+1);
    let lab=document.createElement("label");
    lab.id="lab"+(i+1);
    lab.for="menu"+(i+1);
    lab.innerHTML="Player "+(i+1);
    for (let i=0; i<=arr.length; i++) {
      let op=document.createElement("option");
      if (i==arr.length) op.value="Guest";
      else op.value=arr[i].name;
      op.innerHTML=op.value;
      menu.appendChild(op);
    }
    if (i<arr.length) menu.value=arr[i].name;
    else menu.value="Guest";
    div.appendChild(lab);
    div.appendChild(menu);
  }

  let okBut=document.createElement("button");
  okBut.innerHTML="Start game";
  okBut.id="okBut";
  okBut.className="okBut";
  okBut.onclick = () => start(name,nmb);
  div.appendChild(okBut);
}

const start=(name,nmb)=> {
  let div=document.getElementById("div");
  let g=JSON.parse(localStorage.getItem("games"));

  let arr=[];
  for (let i=0; i<nmb; i++) {
    let p=document.getElementById("menu"+(i+1)).value;
    arr.push(p);
  }
  for (let i=0; i<arr.length; i++) for (let j=0; j<arr.length; j++) if (arr[i]==arr[j] && !(i==j) && !(arr[i]=="Guest")) return;

  if (name=="connect4" || name=="tictactoe") g[name]=[arr[0],arr[1]];

  else {
    g[name]={};
    let o=1;
    for (let i=0; i<arr.length; i++) {
      if (arr[i]=="Guest") {
        arr[i]+=" "+o;
        o++;
      }
      g[name][arr[i]]=0;
    }
  }

  localStorage.setItem("games",JSON.stringify(g));

  window.location.href = (name == "connect4" || name == "tictactoe" ? "./games/" : "./trackers/") + name + ".html";
}

window.onload=()=> {
  let g=JSON.parse(localStorage.getItem("games"));
  g["connect4"]=[];
  g["tictactoe"]=[];
  localStorage.setItem("games",JSON.stringify(g));

  let arr=["connect4","tictactoe","rummy","hearts","cribbage"];
  arr.forEach((x) => document.getElementById(x).onclick = () => click(x));
}