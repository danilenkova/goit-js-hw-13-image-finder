import './sass/main.scss';
import 'material-icons/iconfont/material-icons.css';
import Events from './js/events/events';
import getRefs from './js/data/references';

const refs = getRefs();

const data = {
  refs,
};

const app = new Events(data);

app.start();
