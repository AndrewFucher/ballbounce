import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Animation from './animation/animation';
import './App.css';

function game(e: any) {
  /**
   * 1. 3 <= balls <= 100
   * 2. creating canvas
   */
  let balls: number = Number((document.getElementById('ballsnumber') as HTMLInputElement).value);
  if (e.keyCode === 13) {
    if (balls < 20) {
      balls = 20;
    }
    if (balls > 50) {
      balls = 50;
    }

    // creating canvas and running animation
    ReactDOM.render(
      <Animation balls={balls} />,
      document.getElementById('App') as HTMLElement
    );
  }
}

// creating our first page wherre you must write number of balls
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div className="App" id="App">
          <div className="input">
            <p className="paragraph">Balls</p>
            <div className="ballsnumber">
              <input type="number" name="ballsnumber" id="ballsnumber" autoFocus={true}
              // tslint:disable-next-line:jsx-no-lambda
              onKeyDown={(x) => game(x)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;