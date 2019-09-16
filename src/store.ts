import logger from 'redux-logger';
import dynamicStorage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { applyMiddleware, createStore } from 'redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';

import rootReducer from './modules';

import { AccountsState } from './modules/accounts';
import { ConfigurationState } from './modules/configuration';
import { POAState } from './modules/poa';

export interface Store {
	accounts: AccountsState;
	config: ConfigurationState;
	poa: POAState;
}

const persistConfig: PersistConfig<Store> = {
	key: 'root',
	storage: dynamicStorage,
	whitelist: ['config']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk, logger];

export default () => {
	const store = createStore(persistedReducer, applyMiddleware(...middleware));
	const persistor = persistStore(store);

	return { store, persistor };
};
