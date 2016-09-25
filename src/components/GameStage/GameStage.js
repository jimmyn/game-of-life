import React, {Component} from 'react';
import './GameStage.css';
import {RESOLUTION} from 'lib/constants';

class GameStage extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.props.gameState.forEach((value, index) => {
      if (value !== 0) {
        this.ctx.fillRect(index[0] * 10, index[1] * 10, 10, 10);
      } else {
        this.ctx.lineWidth = 0.25;
        this.ctx.strokeRect(index[0] * 10, index[1] * 10, 10, 10);
      }
    });
  }

  render() {
    return (
      <div>
        <canvas
          className="GameStage"
          width={RESOLUTION.X * 10}
          height={RESOLUTION.Y * 10}
          ref={node => {
            this.canvas = node;
          }} />
        <div>
          <button onClick={this.props.nextStep}>
            Next step
          </button>
        </div>
      </div>
    );
  }
}

export default GameStage;