import App from 'components/App';
import GameRoute from './Game';

export default {
  path: '/',
  component: App,
  indexRoute: GameRoute,
  childRoutes: []
};
