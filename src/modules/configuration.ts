import * as path from 'path';

import Utils from 'evm-lite-utils';

import { toast } from 'react-toastify';
import { ConfigurationSchema, DataDirectory } from 'evm-lite-datadir';

import { BaseAction, ThunkResult } from '.';
import { list } from './accounts';

// Set configuration data directory
const SET_DIRECTORY_SUCCESS =
	'@evm-lite-wallet/configuration/DATADIRECTORY/SUCCESS';
const SET_DIRECTORY_ERROR =
	'@evm-lite-wallet/configuration/DATADIRECTORY/ERROR';

// Load configuration from data directory
const LOAD_REQUEST = '@evm-lite-wallet/configuration/LOAD/REQUEST';
const LOAD_SUCCESS = '@evm-lite-wallet/configuration/LOAD/SUCCESS';
const LOAD_ERROR = '@evm-lite-wallet/configuration/LOAD/ERROR';

// Save configuration
const SAVE_REQUEST = '@evm-lite-wallet/configuration/SAVE/REQUEST';
const SAVE_SUCCESS = '@evm-lite-wallet/configuration/SAVE/SUCCESS';
const SAVE_ERROR = '@evm-lite-wallet/configuration/SAVE/ERROR';

// @ts-ignore - The default path for the data directory if none is set.
const defaultPath = path.join(window.require('os').homedir(), '.evmlc');

export interface ConfigurationState {
	// The data directory path
	readonly directory: string;

	// The configuration data values
	readonly data: ConfigurationSchema;

	// This error attribute is used by all actions
	readonly error?: string;

	// Loading states for all actions
	readonly loading: {
		load: boolean;
		save: boolean;
	};
}

const initialState: ConfigurationState = {
	directory: defaultPath,
	data: {} as ConfigurationSchema,
	loading: {
		load: false,
		save: false
	}
};

export default function reducer(
	state: ConfigurationState = initialState,
	action: BaseAction<any> = {} as BaseAction<any>
): ConfigurationState {
	switch (action.type) {
		// Set data directory
		case SET_DIRECTORY_SUCCESS:
			return {
				...state,
				directory: action.payload,
				error: undefined
			};
		case SET_DIRECTORY_ERROR:
			return {
				...state,
				error: action.payload
			};

		// Load configuration
		case LOAD_REQUEST:
			return {
				...state,
				error: undefined,
				loading: {
					...state.loading,
					load: true
				}
			};
		case LOAD_SUCCESS:
			return {
				...state,
				data: action.payload,
				loading: {
					...state.loading,
					load: false
				}
			};

		case LOAD_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					load: false
				}
			};

		// Save configuration
		case SAVE_REQUEST:
			return {
				...state,
				error: undefined,
				loading: {
					...state.loading,
					save: true
				}
			};
		case SAVE_SUCCESS:
			return {
				...state,
				data: action.payload,
				loading: {
					...state.loading,
					save: false
				}
			};
		case SAVE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					save: false
				}
			};
		default:
			return state;
	}
}

export function load(): ThunkResult<Promise<ConfigurationSchema>> {
	return async (dispatch, getStore) => {
		const store = getStore();

		let config = {} as ConfigurationSchema;

		dispatch({
			type: LOAD_REQUEST
		});

		try {
			const datadir = new DataDirectory(store.config.directory);

			config = await datadir.config.load();

			dispatch({
				type: LOAD_SUCCESS,
				payload: config
			});
		} catch (error) {
			dispatch({
				type: LOAD_ERROR,
				payload: error.toString()
			});
		}

		return config;
	};
}

export function setDirectory(path: string): ThunkResult<Promise<string>> {
	return async dispatch => {
		if (Utils.exists(path) && !Utils.isDirectory(path)) {
			dispatch({
				type: SET_DIRECTORY_ERROR,
				payload: `Provided path '${path}' is not a directory.`
			});

			return path;
		}

		new DataDirectory(path);

		dispatch({
			type: SET_DIRECTORY_SUCCESS,
			payload: path
		});

		toast.success(`Data directory loaded at ${path}`);

		dispatch(load()).then(() => dispatch(list()));

		return path;
	};
}

export function initialize(): ThunkResult<Promise<void>> {
	return async dispatch => {
		dispatch(load()).then(() => dispatch(list()));
	};
}

export function save(
	newConfig: ConfigurationSchema
): ThunkResult<Promise<ConfigurationSchema>> {
	return async (dispatch, getState) => {
		const state = getState();

		dispatch({
			type: SAVE_REQUEST
		});

		try {
			const datadir = new DataDirectory(state.config.directory);

			await datadir.config.save(newConfig);

			dispatch({
				type: SAVE_SUCCESS,
				payload: newConfig
			});

			toast.success(`Configuration saved.`);

			return newConfig;
		} catch (error) {
			dispatch({
				type: SAVE_ERROR,
				payload: error.toString()
			});

			return {} as ConfigurationSchema;
		}
	};
}
