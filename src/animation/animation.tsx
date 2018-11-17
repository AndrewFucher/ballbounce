/*
First ball have id '0'
And first elemnt in array have index '0'
So there in array ball_direction will be arrays with 2 value
*/

import * as React from 'react';
import './animation.css';
import ball from './balls/ball.svg';

// globals for programmer that changes
let dy: number; // x of first vector
let dx: number; // y of first vector
let ax: number; // x of second vector
let ay: number; // y of second vector
let cosa: number;
let sina: number;
let some: number[];
const speed: number = 2;
let straight: number[];
let someone: number[];
// tslint:disable-next-line:prefer-const
let ballcoords = new Array();
// tslint:disable-next-line:prefer-const
let balldirections = new Array();
// tslint:disable-next-line:prefer-const
let angle: number;
// let cosangle: number;
let coords: number[];
let screensize: number[];
// let frame: any;
const ballsize: number = 25 * Math.min(window.innerHeight/1010, window.innerWidth/1920);
// let ball_radius: number;
// tslint:disable-next-line:interface-name
interface Props{
  balls: number;
}

function rotationclockwise(x: number, y: number, cosan: number, sinan: number) {
  // rotangle = rotangle*180/Math.PI; // degrees to radians
  return [Math.round(100 * (x*cosan + y*sinan)) / 100, Math.round((-x*sinan + y*cosan) * 100) / 100];
}

function rotationcounterclockwise(x: number, y: number, cosan: number, sinan: number) {
  // rotangle = rotangle*180/Math.PI; // degrees to radians
  return [Math.round((x*cosan - y*sinan) * 100) / 100, Math.round((x*sinan + y*cosan) * 100) / 100]
  // return [x*Math.cos(rotangle) - y*Math.sin(rotangle), x*Math.sin(rotangle) + y*Math.cos(rotangle)];
}


function collisionturn(a: any, b: any, i: number, j: number) {

  straight = [(a[0] - b[0]), (a[1] - b[1])]
  // a - coordinates of 1 ball and b - coordinates of another 1
  straight = [straight[1], -straight[0]] // rotation 'straight' on 90 degree
  
  // cos and sin
  cosa = Math.abs(straight[0] / Math.sqrt(straight[0]**2 + straight[1]**2));
  sina = Math.abs(straight[1] / Math.sqrt(straight[0]**2 + straight[1]**2));


  dx = balldirections[i][0];
  dy = balldirections[i][1];
  ax = balldirections[j][0];
  ay = balldirections[j][1];
/*
  if(dx / Math.abs(dx) === ax / Math.abs(ax) && dy / Math.abs(dy) === ay / Math.abs(ay)) {
    straight = [(a[0] - b[0]), (a[1] - b[1])];

    if((straight[0] / Math.abs(straight[0]) === straight[1] / Math.abs(straight[1]))) {
      if (ax < 0) {
        if (a[0] < b[0]) {
          some = rotationclockwise(ax, ay, sina, cosa);
          balldirections[j] = rotationcounterclockwise(some[0], -some[1], sina, cosa);
        } else {
          some = rotationclockwise(dx, dy, sina, cosa);
          balldirections[j] = rotationcounterclockwise(some[0], -some[1], sina, cosa);
        }
      } else {
        if (a[0] > b[0]) {
          some = rotationclockwise(ax, ay, sina, cosa);
          balldirections[j] = rotationcounterclockwise(some[0], -some[1], sina, cosa);
        } else {
          some = rotationclockwise(dx, dy, sina, cosa);
          balldirections[j] = rotationcounterclockwise(some[0], -some[1], sina, cosa);
        }
      }
    } else {
      if (ax < 0) {
        if (a[0] > b[0]) {
          some = rotationcounterclockwise(dx, dy, sina, cosa);
          balldirections[j] = rotationclockwise(some[0], -some[1], sina, cosa);
        } else {
          some = rotationclockwise(ax, ay, sina, cosa);
          balldirections[j] = rotationcounterclockwise(some[0], -some[1], sina,  cosa);
        }
      } else {
        if (a[0] < b[0]) {
          some = rotationcounterclockwise(dx, dy, sina, cosa);
          balldirections[j] = rotationclockwise(some[0], -some[1], sina, cosa);
        } else {
          some = rotationclockwise(ax, ay, sina, cosa);
          balldirections[j] = rotationcounterclockwise(some[0], -some[1], sina,  cosa);
        }
      }
    }
    return ;

  }
*/
  if (straight[0] / Math.abs(straight[0]) === straight[1] / Math.abs(straight[1])) {

    some = rotationclockwise(ax, ay, cosa, sina);
    someone = rotationclockwise(dx, dy, cosa, sina);
    balldirections[j] = rotationcounterclockwise(some[0], -some[1], cosa, sina);
    balldirections[i] = rotationcounterclockwise(someone[0], -someone[1], cosa, sina)
    return;

  } else {
    some = rotationcounterclockwise(ax, ay, cosa, sina);
    someone = rotationcounterclockwise(dx, dy, cosa, sina);
    balldirections[j] = rotationclockwise(some[0], -some[1], cosa, sina);
    balldirections[i] = rotationclockwise(someone[0], -someone[1], cosa, sina)
    return;
  }
}

function collision() {
  for (let i = 0; i < balldirections.length; i++) {
    for (let j = i + 1; j < balldirections.length; j++) {
      if(Math.sqrt((ballcoords[i][0] - ballcoords[j][0])**2 + (ballcoords[i][1] - ballcoords[j][1])**2) <= ballsize*2) {
        collisionturn(ballcoords[i], ballcoords[j], i, j);
        ballcoords[i] = [ballcoords[i][0] + balldirections[i][0], ballcoords[i][1] + balldirections[i][1]];
        ballcoords[j] = [ballcoords[j][0] + balldirections[j][0], ballcoords[j][1] + balldirections[j][1]];
      }
    }
  }
  return ;
}

// and also filling array 'ball_coords' by their position(25, 25)
function fillballcoords(a: number) {
  // a - number of balls
  for (let i = 0; i < a; i++) {
    ballcoords.push([-2*ballsize, -2*ballsize]);
  }
}

// creating direction for balls
function filldirectionofballs() {
  // a - number of balls
  angle = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180;
  coords = [Math.round(speed * (Math.cos(angle) - Math.sin(angle)) * 100) / 100, Math.round(speed * (Math.sin(angle) + Math.cos(angle)) * 100) / 100];    
  return coords;
}

// function to change position - change margin
function changeposition(el: HTMLImageElement, elindex: number) {
  // el - element
  ballcoords[elindex] = [ballcoords[elindex][0] + balldirections[elindex][0], ballcoords[elindex][1] + balldirections[elindex][1]];
  el.setAttribute("style", "left: " + String(ballcoords[elindex][0] - ballsize) + "px; top: " + String(ballcoords[elindex][1] - ballsize) + "px;" + "position: absolute;" + "height: " + String(ballsize*2) + "px; zIndex: 1");
}

function appendvector() {
  if (balldirections.length !== ballcoords.length) {
    balldirections.push(filldirectionofballs()) 
    setTimeout(appendvector, 1200);
  }
  return ;
}

// function to move balls around screen
function move() {
  screensize = [window.innerWidth, window.innerHeight];
  for(let i = 0; i < balldirections.length; i++) {
    changeposition(document.getElementById(String(i)) as HTMLImageElement, i);
     
    // change directions
    if(0 > ballcoords[i][0] - ballsize) {
      balldirections[i][0] = Math.abs(balldirections[i][0]);
    }
    if(ballcoords[i][0] + ballsize > screensize[0] - speed*2) {
      balldirections[i][0] = Math.abs(balldirections[i][0]) * -1;
    }
    if(0 > ballcoords[i][1] - ballsize) {
      balldirections[i][1] = Math.abs(balldirections[i][1]);
    }
    if(ballcoords[i][1] + ballsize > screensize[1] - speed*2) {
      balldirections[i][1] = Math.abs(balldirections[i][1]) * -1;
    }
    //
  }

  collision();
  window.requestAnimationFrame(move);
}

// return array of images - balls that will be moving
function Ballsimages(balls: number) {
  let mus: any[];       //
  mus = Array(balls);   // creating array

  // filling array with id of images
  for (let i: number = 0; i < balls; i++) {
    mus[i] = String(i);
  }

  // tslint:disable-next-line:no-any
  const style: any = {
    'height': String(2*ballsize) + 'px',
    'position': 'absolute',
    'top': String(-3*ballsize) + 'px',
    'zIndex': '1'
  };

  // filling array with images
  for (let i: number = 0; i < mus.length; i++) {
    mus[i] = <img src={ball} style={style} id={String(i)} key={i}/>;
  }
  fillballcoords(balls);
  // alert(balldirections);
  // tslint:disable-next-line:no-console
  setTimeout(move, 2000);
  setTimeout(appendvector, 1200);
  return mus;
}

// starting animation
class Animation extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="container" id="container">
        {Ballsimages(this.props.balls)}
      </div>
    )
  }
}

export default Animation;