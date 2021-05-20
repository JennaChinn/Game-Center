function info(game) {
  let div=document.createElement("div");
  div.className="info";
  div.id="info";

  let x=document.createElement("button");
  x.innerHTML="x";
  x.onclick=()=>div.style.cssText="display:none;";
  x.className="info";
  div.appendChild(x);

  let h=document.createElement("h1");
  h.innerHTML="Help";
  div.appendChild(h);

  let p1=document.createElement("p");
  p1.innerHTML = "For this score tracker, you will see a table like the one below.<br>The top row shows the names of all the players. In a real game, it would say the players' names, but for now we'll use numbers 1 and 2.<br>The middle row is the row in which you enter your the points you gained in each round. You can choose to manually type in the score or use the arrow buttons.<br>The bottom row shows the total score for each player. It will update throughout the game and will automatically save when you exit."
  div.appendChild(p1);

  let table=document.createElement("table");
  table.className="info";
  let r1=table.insertRow();
  let r2=table.insertRow();
  let r3=table.insertRow();
  for (let i=0; i<2; i++) {
    let c1=r1.insertCell()
    c1.innerHTML = "Player "+(i+1);
    c1.className="info"
    let c2 = r2.insertCell();
    c2.innerHTML="<input type = 'number' max = '5' min = '0' class='info'></input>";
    c2.className="info";
    let c3=r3.insertCell();
    c3.innerHTML = "Total Score";
    c3.className="info";
  }
  div.appendChild(table);

  let p2=document.createElement("p");
  p2.innerHTML = "Click the \"save\" button in order to save each round's score. If you exit this screen without pressing \"save,\" that round's scores will be lost.";

  if (game=="hearts") p2.innerHTML+="<br>Make sure that all the scores add up to 26. If you shoot the moon (get all 26 points), enter \"26\" into the score field and you will be given the option to add or remove points.";

  else if (game=="rummy") p2.innerHTML+="<br>Make sure that the scores you enter are multiples of five. If you enter invalid scores, they will be rounded to a multiple of five.";

  else if (game=="cribbage") p2.innerHTML+="<br>Because of the nature of cribbage, it is recommended that you save more frequently than after each round, such as after pegging and then after counting each hand.";

  div.appendChild(p2);

  document.body.appendChild(div);
}