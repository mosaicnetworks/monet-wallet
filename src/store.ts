import logger from 'redux-logger';
import dynamicStorage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { applyMiddleware, createStore } from 'redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';

import rootReducer from './modules';

import { AccountsState } from './modules/accounts';
import { SettingState } from './modules/settings';

export interface Store {
	accounts: AccountsState;
	settings: SettingState;
}

const persistConfig: PersistConfig<Store> = {
	key: 'root',
	storage: dynamicStorage,
	whitelist: ['settings']
};
const persistedReducer = persistReducer<any>(persistConfig, rootReducer);
const middleware = [thunk, logger];

export default () => {
	const store = createStore(persistedReducer, applyMiddleware(...middleware));
	const persistor = persistStore(store);

	return { store, persistor };
};
