import { ThunkAction } from 'redux-thunk';

import { combineReducers } from 'redux';

import { Store } from 'src/store';

import accounts from './accounts';
import config from './configuration';

export type ThunkResult<R> = ThunkAction<R, Store, undefined, BaseAction<any>>;
export interface BaseAction<Payload> {
	type: string;
	payload?: Payload;
}

export default combineReducers({
	config,
	accounts
});
