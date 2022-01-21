import React from 'react';
import ReactDOM from 'react-dom';
// import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './store/config';
import store from './store/config';

// const logger = createLogger();
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

// redux store
// import store from './store/config';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	// <RecoilRoot>
	// 	<App />
	// </RecoilRoot>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
