import {connect} from 'react-redux';
import Stage from './GameStage';

const mapStateToProps = (state) => ({
  gameState: state.gameState
});

export default connect(mapStateToProps)(Stage);
