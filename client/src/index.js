import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './app/App';
import registerServiceWorker from './app/registerServiceWorker';
import store from './redux/store';

const rootDiv = document.getElementById('root');
ReactDOM.render(<Provider store={store}><App /></Provider>, rootDiv);
registerServiceWorker();
