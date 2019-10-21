import { ThunkAction } from 'redux-thunk';

import { toast } from 'react-toastify';
import { combineReducers } from 'redux';

import { Store } from '../store';

import accounts from './accounts';
import config from './config';

export const errorHandler = (dispatch: any, action: string, error: string) => {
	dispatch({
		type: action,
		payload: error
	});

	return toast.error(error);
};

export type ThunkResult<R> = ThunkAction<R, Store, undefined, BaseAction<any>>;
export interface BaseAction<Payload> {
	type: string;
	payload?: Payload;
}

export default combineReducers({
	config,
	accounts
});
