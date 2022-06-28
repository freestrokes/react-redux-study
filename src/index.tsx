import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import AppReactQuery from './App.reactquery';
import AppRecoil from './App.recoil';
import AppReduxToolkit from './App.reduxtoolkit';
import AppRedux from './App.redux';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| Recoil Settings
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

import { RecoilRoot } from 'recoil';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| React-Query Settings
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

import {QueryCache, QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			console.log('queryCache > onError > error', error);
			console.log('queryCache > onError > query', query);
			// if (query.state.data !== undefined) {
			// 	toast.error(`Query Error: ${error.message}`);
			// }
		},
		onSuccess: (data) => {
			console.log('queryCache > onSuccess', data);
		}
	}),
	defaultOptions: {
		queries: {
			retry: 0,
			cacheTime: 0,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	}
});

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| Render
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

ReactDOM.render(
	<QueryClientProvider client={queryClient}>
		<RecoilRoot>
		  <React.Suspense fallback={<div>Loading...</div>}>
			  <App/>
			  {/*<AppReactQuery/>*/}
			  {/*<AppRecoil/>*/}
			  {/*<AppReduxToolkit/>*/}
			  {/*<AppRedux/>*/}
			</React.Suspense>
		</RecoilRoot>
	</QueryClientProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
