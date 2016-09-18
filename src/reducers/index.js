import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {RESOLUTION} from 'lib/constants';
import * as types from 'actions/types';
import math from 'mathjs';

const acorn = math.matrix([
  [0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [1, 1, 0, 0, 1, 1, 1]
]);

const {X, Y} = RESOLUTION;
const position = {
  x: math.range(X / 2, X / 2 + 7),
  y: math.range(Y / 2, Y / 2 + 3)
};

const getDestiny = (gameState, index) => {
  console.log(index);
  return -1;
};

const initialGameState = math.zeros(...RESOLUTION)
  .subset(math.index(position.x, position.y), math.transpose(acorn));

export const gameState = (state = initialGameState, action) => {
  switch (action.type) {
    case types.NEXT_STEP:
      const newState = state.clone();
      state.forEach((value, index) => {
        if (value !== 0) {
          newState.subset(
            math.index(...index),
            getDestiny(state, index)
          );
        }
      });
      return newState;
  }
  return state;
};

export default combineReducers({
  routing,
  gameState
});
