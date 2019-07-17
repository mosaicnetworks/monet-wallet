import * as ReactDOM from 'react-dom';

import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import getStores from '../store';
import App from './App';

import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css';

const stores = getStores();

ReactDOM.render(
	<Provider store={stores.store}>
		<PersistGate loading={null} persistor={stores.persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
