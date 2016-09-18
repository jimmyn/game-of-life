import {connect} from 'react-redux';
import * as actions from 'actions';
import Stage from './GameStage';

const mapStateToProps = (state) => ({
  gameState: state.gameState
});

export default connect(mapStateToProps, actions)(Stage);
