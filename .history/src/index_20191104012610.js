import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './Components/App';
import * as serviceWorker from './Redux/serviceWorker';
import { Provider } from 'react-redux'
import store from './Redux/store'
import {browserHistory} from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom';

browserHistory.listen(location => {
    browserHistory.push('/super/url');
  });

const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>< App /></Router>
    </Provider>,
     rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();