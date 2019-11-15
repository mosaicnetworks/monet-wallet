import { ThunkAction } from 'redux-thunk';

import { combineReducers } from 'redux';

import { Store } from '../store';

import accounts from './accounts';
import settings from './settings';

export const errorHandler = (dispatch: any, action: string) => (
	error: string
) => {
	dispatch({
		type: action,
		payload: error
	});
};

export type ThunkResult<R> = ThunkAction<R, Store, undefined, BaseAction<any>>;
export interface BaseAction<Payload> {
	type: string;
	payload?: Payload;
}

export default combineReducers({
	settings,
	accounts
});
