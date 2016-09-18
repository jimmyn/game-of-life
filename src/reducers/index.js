import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {RESOLUTION} from 'lib/constants';
import * as types from 'actions/types';
import math from 'mathjs';

const {X, Y} = RESOLUTION;

const getDestiny = (gameState, value, index) => {
  let aliveCount = 0;
  const neighbors = gameState.subset(
    math.index(
      math.range(index[0] - 1 > 0 ? index[0] - 1 : 0, index[0] < X - 2 ? index[0] + 2 : X),
      math.range(index[1] - 1 > 0 ? index[1] - 1 : 0, index[1] < Y - 2 ? index[1] + 2 : Y)
    )
  );
  neighbors.forEach((v, i) => {
    if (i !== index && v !== 0) aliveCount++;
  });
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  if (value === 0 && aliveCount === 3) return 1;
  // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
  // Any live cell with more than three live neighbours dies, as if by over-population.
  if (value === 1 && (aliveCount === 2 || aliveCount === 3)) return 1;
  // Any live cell with two or three live neighbours lives on to the next generation.
  return 0;
};


const acorn = math.matrix([
  [0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [1, 1, 0, 0, 1, 1, 1]
]);

const position = {
  x: math.range(1, 1 + 7),
  y: math.range(1, 1 + 3)
};

const initialGameState = math.zeros(X, Y)
  .subset(math.index(position.x, position.y), math.transpose(acorn));

export const gameState = (state = initialGameState, action) => {
  switch (action.type) {
    case types.NEXT_STEP:
      const newState = state.clone();
      state.forEach((value, index) => {
        newState.subset(
          math.index(...index),
          getDestiny(state, value, index)
        );
      });
      return newState;
  }
  return state;
};

export default combineReducers({
  routing,
  gameState
});
