import utils from 'evm-lite-utils';

import Datadir, { IConfiguration, osdatadir } from 'evm-lite-datadir';
import { toast } from 'react-toastify';

import { BaseAction, ThunkResult } from '.';
import { list } from './accounts';

// Set configuration data directory
const SET_DIRECTORY_SUCCESS = '@monet/configuration/DATADIRECTORY/SUCCESS';
const SET_DIRECTORY_ERROR = '@monet/configuration/DATADIRECTORY/ERROR';

// Load configuration from data directory
const LOAD_REQUEST = '@monet/configuration/LOAD/REQUEST';
const LOAD_SUCCESS = '@monet/configuration/LOAD/SUCCESS';
const LOAD_ERROR = '@monet/configuration/LOAD/ERROR';

// Save configuration
const SAVE_REQUEST = '@monet/configuration/SAVE/REQUEST';
const SAVE_SUCCESS = '@monet/configuration/SAVE/SUCCESS';
const SAVE_ERROR = '@monet/configuration/SAVE/ERROR';

export interface ConfigurationState {
	// The data directory path
	readonly directory: string;

	// The configuration data values
	readonly data: IConfiguration;

	// This error attribute is used by all actions
	readonly error?: string;

	// Loading states for all actions
	readonly loading: {
		load: boolean;
		save: boolean;
	};
}

const initialState: ConfigurationState = {
	directory: osdatadir('Monet'),
	data: {} as IConfiguration,
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

export function load(): ThunkResult<Promise<IConfiguration>> {
	return async (dispatch, getStore) => {
		const store = getStore();

		let config = {} as IConfiguration;

		dispatch({
			type: LOAD_REQUEST
		});

		try {
			const datadir = new Datadir(store.config.directory, 'monetcli');

			config = await datadir.readConfig();

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
		if (utils.exists(path) && !utils.isDirectory(path)) {
			dispatch({
				type: SET_DIRECTORY_ERROR,
				payload: `Provided path '${path}' is not a directory.`
			});

			return path;
		}

		new Datadir(path, 'monetcli');

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
	newConfig: IConfiguration
): ThunkResult<Promise<IConfiguration>> {
	return async (dispatch, getState) => {
		const state = getState();

		dispatch({
			type: SAVE_REQUEST
		});

		try {
			const datadir = new Datadir(state.config.directory, 'monetcli');

			await datadir.saveConfig(newConfig);

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

			return {} as IConfiguration;
		}
	};
}
