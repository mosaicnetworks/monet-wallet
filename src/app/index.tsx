import * as ReactDOM from 'react-dom';

import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import getStores from '../store';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const stores = getStores();

const reset = () => {
	stores.persistor.purge();
	stores.persistor.flush();
};

ReactDOM.render(
	<Provider store={stores.store}>
		<PersistGate
			loading={null}
			onBeforeLift={reset}
			persistor={stores.persistor}
		>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
