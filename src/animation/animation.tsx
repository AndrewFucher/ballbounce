/*
First ball have id '0'
And first elemnt in array have index '0'
So there in array ball_direction will be arrays with 2 value
*/

import * as React from 'react';
import './animation.css';
import ball from './balls/ball.svg';

// globals for programmer that changes
// tslint:disable-next-line:prefer-const
let ballcoords = new Array();
let balldirections: number[][];
// tslint:disable-next-line:prefer-const
let muss = new Array();
let angle: number;
let coords: number[];
let screensize: number[];
// let frame: any;
const ballsize: number = 25;
// let ball_radius: number;


// tslint:disable-next-line:interface-name
interface Props{
  balls: number;
}

/*function hit() {
  for (let i = 0; i < ballcoords.length - 1; i++) {
    for (let j = i + 1; j < ballcoords.length; j++) {
      // tslint:disable-next-line:no-console
      // console.log((ballcoords[i][0] - ballcoords[j][0]), (ballcoords[i][1] - ballcoords[j][1]));
      if((ballcoords[i][0] - ballcoords[j][0])**2 + (ballcoords[i][1] - ballcoords[j][1])**2 <= 625) {
        // tslint:disable-next-line:no-console
        console.log(ballcoords[i], ballcoords[j]);
      }
    }
  }
}*/

// creating direction for balls
// and also filling array 'ball_coords' by their position(25, 25)
function filldirectionofballs(a: number) {
  // a - number of balls
  for (let i = 0; i < a; i++) {
    angle = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180;
    coords = [2 * (Math.cos(angle) - Math.sin(angle)), 2 * (Math.sin(angle) + Math.cos(angle))];
    muss.push(coords);
    ballcoords.push([25, 25]);
    
  }
  return muss;
}

// function to change position - change margin
function changeposition(el: HTMLImageElement, elindex: number) {
  // el - element
  ballcoords[elindex] = [ballcoords[elindex][0] + balldirections[elindex][0], ballcoords[elindex][1] + balldirections[elindex][1]];
  el.setAttribute("style", "left: " + String(ballcoords[elindex][0] - ballsize) + "px; top: " + String(ballcoords[elindex][1] - ballsize) + "px;" + "position: absolute; height: 50px; zIndex: 1");
}

// function to move balls around screen
function move() {
  screensize = [window.innerWidth, window.innerHeight];
  for(let i = 0; i < balldirections.length; i++) {
    changeposition(document.getElementById(String(i)) as HTMLImageElement, i);
    
    // change directions
    if(0 > ballcoords[i][0] - ballsize || ballcoords[i][0] + ballsize > screensize[0] - 1) {
      balldirections[i][0] *= -1;
    }
    if(0 > ballcoords[i][1] - ballsize || ballcoords[i][1] + ballsize > screensize[1] - 1) {
      balldirections[i][1] *= -1;
    }
    //
  }
  // hit();
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
    'height': '50px',
    'position': 'absolute',
    'zIndex': '1'
  };

  // filling array with images
  for (let i: number = 0; i < mus.length; i++) {
    mus[i] = <img src={ball} style={style} id={String(i)} key={i}/>;
  }
  balldirections = filldirectionofballs(balls);
  // tslint:disable-next-line:no-console
  setTimeout(move, 2000);
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