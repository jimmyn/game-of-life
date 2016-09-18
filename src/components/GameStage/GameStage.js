import React, {Component} from 'react';
import './GameStage.css';
import {Layer, Rect, Stage} from 'react-konva';
import {RESOLUTION} from 'lib/constants';

class GameStage extends Component {
  renderState() {
    const rects = [];
    this.props.gameState.forEach((value, index) => {
      if (value !== 0) {
        rects.push(
          <Rect
            x={index[0] * 10}
            y={index[1] * 10}
            key={index}
            width={10}
            height={10}
            stroke="#c4c4c4"
            strokeWidth={1}
            fill="#000000"
            onClick={() => console.log('index', index)}/>
        );
      }
    });
    return rects;
  }

  render() {
    return (
      <div>
        <Stage
          width={RESOLUTION.X * 10}
          height={RESOLUTION.Y * 10}
          className="GameStage">
          <Layer>
            {this.renderState()}
          </Layer>
        </Stage>
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