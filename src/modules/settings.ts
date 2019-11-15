import utils from 'evm-lite-utils';

import { IConfiguration, osdatadir } from 'evm-lite-datadir';
import { toast } from 'react-toastify';

import { BaseAction, ThunkResult } from '.';
import { MonetDataDir } from '../monet';

// Set configuration data directory
const SET_DATADIR_SUCCESS = '@monet/settings/DATADIR/SUCCESS';
const SET_DATADIR_ERROR = '@monet/settings/DATADIR/ERROR';

// Load configuration from data directory
const LOAD_REQUEST = '@monet/settings/LOAD/REQUEST';
const LOAD_SUCCESS = '@monet/settings/LOAD/SUCCESS';
const LOAD_ERROR = '@monet/settings/LOAD/ERROR';

// Save configuration
const SAVE_REQUEST = '@monet/settings/SAVE/REQUEST';
const SAVE_SUCCESS = '@monet/settings/SAVE/SUCCESS';
const SAVE_ERROR = '@monet/settings/SAVE/ERROR';

export interface SettingState {
	// The data directory path
	readonly datadir: string;

	// The configuration data values
	readonly config: IConfiguration;

	// This error attribute is used by all actions
	readonly error?: string;

	// Loading states for all actions
	readonly loading: {
		load: boolean;
		save: boolean;
	};
}

const initial: SettingState = {
	datadir: osdatadir('Monet'),
	config: {} as IConfiguration,
	loading: {
		load: false,
		save: false
	}
};

export default function reducer(
	state: SettingState = initial,
	action: BaseAction<any> = {} as BaseAction<any>
): SettingState {
	switch (action.type) {
		// Set data directory
		case SET_DATADIR_SUCCESS:
			return {
				...state,
				datadir: action.payload,
				error: undefined
			};
		case SET_DATADIR_ERROR:
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
				config: action.payload,
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
				config: action.payload,
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
			const datadir = new MonetDataDir(store.settings.datadir);

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

export function setDatadir(path: string): ThunkResult<Promise<string>> {
	return async dispatch => {
		if (utils.exists(path) && !utils.isDirectory(path)) {
			dispatch({
				type: SET_DATADIR_ERROR,
				payload: `Provided path '${path}' is not a directory.`
			});

			return path;
		}

		const {} = new MonetDataDir(path);

		dispatch({
			type: SET_DATADIR_SUCCESS,
			payload: path
		});

		toast.success(`Data directory loaded at ${path}`);

		return path;
	};
}

export function initSettings(): ThunkResult<Promise<void>> {
	return async dispatch => {
		dispatch(load());
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

		await new Promise(resolve => setTimeout(resolve, 500));

		try {
			const datadir = new MonetDataDir(state.settings.datadir);

			await datadir.saveConfig(newConfig);

			dispatch({
				type: SAVE_SUCCESS,
				payload: newConfig
			});

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
