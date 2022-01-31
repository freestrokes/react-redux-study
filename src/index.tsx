import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

////////////////////////////////////////
// Redux Settings
////////////////////////////////////////

// import App from './App.redux';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import { createLogger } from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './modules/config';
// const logger = createLogger();
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

////////////////////////////////////////
// Redux Toolkit Settings
////////////////////////////////////////

// import App from './App.reduxtoolkit';
// import { Provider } from 'react-redux';
// import store from './store/config';

////////////////////////////////////////
// Recoil Settings
////////////////////////////////////////

import App from './App';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import store from './store/config';

////////////////////////////////////////
// Render
////////////////////////////////////////

ReactDOM.render(
	<RecoilRoot>
	 	<React.Suspense fallback={<div>Loading...</div>}>
			<Provider store={store}>
				<App />
			</Provider>
		</React.Suspense>
	</RecoilRoot>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
