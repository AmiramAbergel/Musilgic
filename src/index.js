import * as Tone from 'tone';
import React, { Component } from "react";
import axios from "axios";

window.addEventListener('load', () => {
  console.log("application is up");
})

var dragCount = 0;

const player1 = new Tone.Player("1.mp3").toDestination();
const player2 = new Tone.Player("2.mp3").toDestination();
const player3 = new Tone.Player("3.mp3").toDestination();

var first = false;
var second = false;
var third = false;


        // setting names in first game - if available - back from other game for example
        document.getElementById("guyname").value = localStorage.getItem("name");
        document.getElementById("guyage").value = localStorage.getItem("age");


document.getElementById("mydivheader").onmouseover = myFunction1;
document.getElementById("mydivheader").onmouseout = myFunction10;
document.getElementById("mydivheader").onmouseup = myFunction100;
console.log(document.getElementById("mydivheader").pos3);

document.getElementById("mydivheader2").onmouseover = myFunction2;
document.getElementById("mydivheader2").onmouseout = myFunction20;
document.getElementById("mydivheader2").onmouseup = myFunction200;

document.getElementById("mydivheader3").onmouseover = myFunction3;
document.getElementById("mydivheader3").onmouseout = myFunction30;
document.getElementById("mydivheader3").onmouseup = myFunction300;

document.getElementById("nextgame").onclick = nextGame;
document.getElementById("nextgame2").onclick = nextSong;

// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));
dragElement(document.getElementById("mydiv2"));
dragElement(document.getElementById("mydiv3"));

function nextGame(){
  var guyname = document.getElementById("guyname").value;
  var guyage = document.getElementById("guyage").value;

  localStorage.setItem("name", guyname);
  localStorage.setItem("age", guyage);
}

function nextSong(){
  var guyname = document.getElementById("guyname").value;
  var guyage = document.getElementById("guyage").value;

  localStorage.setItem("name", guyname);
  localStorage.setItem("age", guyage);
}


function myFunction1(){
  player1.start();
}
function myFunction10(){
  player1.stop();
}

function myFunction100(){
  var testDiv = document.getElementById("mydiv");;

  // testing finish game
  if(testDiv.offsetLeft >= 550){
    first = true;
    console.log(  "first :"+" " + first);

   if (first && second && third){
      alert("well done!")

      var guyname = document.getElementById("guyname").value;
      var guyage = document.getElementById("guyage").value;
  
            // making a post request to mongo server
          axios.post('/game-success', {
            game : "dragIt",
            firstName: guyname,
            age: guyage,
            timeToFinish : 100,
            dragCount: dragCount
              });

   }

  }
}

function myFunction2(){
  player2.start();
}
function myFunction20(){
  player2.stop();
}

function myFunction200(){
  var testDiv = document.getElementById("mydiv2");;

  // testing finish game
  if((testDiv.offsetLeft > 300) && (testDiv.offsetLeft <600)){
    second = true;
    console.log(  "second :"+" " + second);


   if ( first && second && third){
      alert("well done!")

      var guyname = document.getElementById("guyname").value;
      var guyage = document.getElementById("guyage").value;
  
            // making a post request to mongo server
          axios.post('/game-success', {
            game : "dragIt",
            firstName: guyname,
            age: guyage,
            timeToFinish : 100,
            dragCount: dragCount
              });

   }

  }
}

function myFunction3(){
  player3.start();
}
function myFunction30(){
  player3.stop();
}

function myFunction300(){
  var testDiv = document.getElementById("mydiv3");;

  // testing finish game
  if(testDiv.offsetLeft < 300){
    third = true;
    console.log(  "third :"+" " + third);


   if ( first && second && third){
      alert("well done!")

      var guyname = document.getElementById("guyname").value;
      var guyage = document.getElementById("guyage").value;
  
            // making a post request to mongo server
          axios.post('/game-success', {
            game : "dragIt",
            firstName: guyname,
            age: guyage,
            timeToFinish : 100,
            dragCount: dragCount
              });

   }

  }
}



function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {

    //console.log(pos1);
    //console.log(pos2);
    console.log(pos3);
    dragCount++;
    console.log(dragCount);
   // console.log(pos4);
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


export {Tone};