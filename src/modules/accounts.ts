import { Account, Monet } from 'evm-lite-core';
import { Currency } from 'evm-lite-utils';

import { toast } from 'react-toastify';

import { BaseAction, errorHandler, ThunkResult } from '.';
import {
	MonetDataDir,
	MonetInfo,
	MonikerAccount,
	MonikerEVMAccount
} from '../monet';

// Lists all accounts in keystore
const LIST_INIT = '@monet/accounts/LIST/INIT';
const LIST_SUCCESS = '@monet/accounts/LIST/SUCCESS';
const LIST_ERROR = '@monet/accounts/LIST/ERROR';

// Creates account in keystore
const CREATE_INIT = '@monet/accounts/CREATE/INIT';
const CREATE_SUCCESS = '@monet/accounts/CREATE/SUCCESS';
const CREATE_ERROR = '@monet/accounts/CREATE/ERROR';

// For transferring tokens/coins from an account
const TRANSFER_INIT = '@monet/accounts/TRANSFER/INIT';
const TRANSFER_SUCCESS = '@monet/accounts/TRANSFER/SUCCESS';
const TRANSFER_ERROR = '@monet/accounts/TRANSFER/ERROR';

// Select an account as primary
const SELECT_ACCOUNT_SUCCESS = '@monet/accounts/SELECT/SUCCESS';
const SELECT_ACCOUNT_ERROR = '@monet/accounts/SELECT/ERROR';

// For transferring tokens/coins from an account
const GET_SELECTED_INIT = '@monet/accounts/GET/SELECTED/INIT';
const GET_SELECTED_SUCCESS = '@monet/accounts/GET/SELECTED/SUCCESS';
const GET_SELECTED_ERROR = '@monet/accounts/GET/SELECTED/ERROR';

// Accounts state structure
export type AccountsState = {
	// Entire list of accounts
	readonly all: MonikerEVMAccount[];

	// Currently unlocked account
	readonly selected?: MonikerAccount;

	// A single error field to be used by this module for any action
	readonly error?: string;

	// Loading states for async actions
	readonly loading: {
		transfer: boolean;
		list: boolean;
		get: boolean;
		create: boolean;
		unlock: boolean;
	};
};

// Initial State of the accounts module
const initialState: AccountsState = {
	all: [],
	loading: {
		list: false,
		get: false,
		create: false,
		unlock: false,
		transfer: false
	}
};

// The root reducer for the accounts module
export default function reducer(
	state: AccountsState = initialState,
	action: BaseAction<any> = {} as BaseAction<any>
): Readonly<AccountsState> {
	switch (action.type) {
		case SELECT_ACCOUNT_SUCCESS:
			return {
				...state,
				selected: action.payload
			};

		case SELECT_ACCOUNT_ERROR:
			return {
				...state,
				error: action.payload
			};

		case GET_SELECTED_INIT:
			return {
				...state,
				loading: {
					...state.loading,
					get: true
				}
			};

		case GET_SELECTED_SUCCESS:
			return {
				...state,
				selected: action.payload,
				loading: {
					...state.loading,
					get: false
				}
			};

		case GET_SELECTED_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					get: false
				}
			};

		// List accounts
		case LIST_INIT:
			return {
				...state,
				error: undefined,
				loading: {
					...state.loading,
					list: true
				}
			};
		case LIST_SUCCESS:
			return {
				...state,
				all: [...action.payload],
				loading: {
					...state.loading,
					list: false
				}
			};
		case LIST_ERROR:
			return {
				...state,
				all: [],
				error: action.payload,
				loading: {
					...state.loading,
					list: false
				}
			};

		// Transfer
		case TRANSFER_INIT:
			return {
				...state,
				loading: {
					...state.loading,
					transfer: true
				}
			};
		case TRANSFER_SUCCESS:
			return {
				...state,
				loading: {
					...state.loading,
					transfer: false
				}
			};
		case TRANSFER_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					transfer: false
				}
			};

		// Create account
		case CREATE_INIT:
			return {
				...state,
				error: undefined,
				loading: {
					...state.loading,
					create: true
				}
			};
		case CREATE_SUCCESS:
			return {
				...state,
				error: undefined,
				all: [...state.all, action.payload],
				loading: {
					...state.loading,
					create: false
				}
			};
		case CREATE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					create: false
				}
			};

		default:
			return state;
	}
}

export function getSelectedAccount(): ThunkResult<Promise<void>> {
	return async (dispatch, getState) => {
		const state = getState();
		const selected = {
			...state.accounts.selected!
		};

		dispatch({
			type: GET_SELECTED_INIT
		});

		await new Promise(resolve => setTimeout(resolve, 1000));

		try {
			const n = new Monet(
				state.config.data.connection.host,
				state.config.data.connection.port
			);

			const d = await n.getAccount(selected.address);

			selected.balance = new Currency(d.balance);
			selected.nonce = d.nonce;

			dispatch({
				type: GET_SELECTED_SUCCESS,
				payload: selected
			});
		} catch (e) {
			selected.balance = new Currency(0);
			selected.nonce = 0;

			dispatch({
				type: GET_SELECTED_SUCCESS,
				payload: selected
			});

			dispatch({
				type: GET_SELECTED_ERROR,
				payload: e.toString()
			});
		}
	};
}

export function selectAccount(
	moniker: string,
	password: string
): ThunkResult<Promise<void>> {
	return async (dispatch, getState) => {
		const { config } = getState();

		const datadir = new MonetDataDir(config.directory);
		const keyfile = await datadir.getKeyfile(moniker);

		try {
			const account = MonetDataDir.decrypt(
				keyfile,
				password.trim().replace(/(\r\n|\n|\r)/gm, '')
			);

			const monikerAccount = new MonikerAccount({
				address: account.address,
				privateKey: account.privateKey
			});

			monikerAccount.moniker = moniker;

			dispatch({
				type: SELECT_ACCOUNT_SUCCESS,
				payload: monikerAccount
			});

			dispatch(getSelectedAccount());
		} catch (e) {
			dispatch({
				type: SELECT_ACCOUNT_ERROR,
				payload: e.toString()
			});

			toast.error('Invalid password!');
		}
	};
}

export function listAccounts(
	fetch: boolean = false
): ThunkResult<Promise<void>> {
	return async (dispatch, getState) => {
		let accounts: MonikerEVMAccount[] = [];

		const { config } = getState();
		const error = errorHandler.bind(null, dispatch, LIST_ERROR);

		dispatch({
			type: LIST_INIT
		});

		const datadir = new MonetDataDir(config.directory);
		const mk = await datadir
			.listKeyfiles()
			.catch(() => error('Could not load accounts'));

		accounts = Object.keys(mk).map(moniker => ({
			address: mk[moniker].address,
			balance: new Currency(0),
			nonce: 0,
			bytecode: '',
			moniker
		}));

		if (fetch) {
			const n = new Monet(
				config.data.connection.host,
				config.data.connection.port
			);

			try {
				await n.getInfo();

				for (const a of accounts) {
					const acc = await n.getAccount(a.address);

					a.balance = acc.balance;
					a.nonce = acc.nonce;
				}
			} catch (e) {
				// pass
			}
		}

		dispatch({
			type: LIST_SUCCESS,
			payload: accounts
		});
	};
}

export function transfer(
	to: string,
	value: string
): ThunkResult<Promise<void>> {
	return async (dispatch, getState) => {
		const state = getState();

		const config = state.config.data;
		const error = errorHandler.bind(null, dispatch, TRANSFER_ERROR);

		dispatch({
			type: TRANSFER_INIT
		});

		if (!!Object.keys(config).length) {
			const node = new Monet(
				config.connection.host,
				config.connection.port
			);

			const info = await node.getInfo<MonetInfo>().catch(() => {
				error('No connection detected');
				return;
			});

			if (info) {
				try {
					const receipt = await node.transfer(
						Account.fromPrivateKey(
							state.accounts.selected!.privateKey
						),
						to,
						new Currency(value),
						21000,
						Number(info.min_gas_price)
					);

					dispatch({
						type: TRANSFER_SUCCESS,
						payload: receipt
					});

					await dispatch(getSelectedAccount());
					toast.success('Transfer successful');
				} catch (e) {
					error(e.toString());
				}
			}
		} else {
			throw Error('Configuration could not loaded.');
		}
	};
}

export function createAccount(
	moniker: string,
	password: string
): ThunkResult<Promise<void>> {
	return async (dispatch, getState) => {
		const { config } = getState();

		dispatch({
			type: CREATE_INIT
		});

		try {
			const datadir = new MonetDataDir(config.directory);
			const keyfile = await datadir.newKeyfile(moniker, password);

			const account: MonikerEVMAccount = {
				address: keyfile.address,
				balance: new Currency(0),
				nonce: 0,
				bytecode: '',
				moniker
			};

			dispatch({
				type: CREATE_SUCCESS,
				payload: account
			});

			toast.success(
				`Account created: 0x${account.address.slice(0, 15)}...`
			);
		} catch (error) {
			dispatch({
				type: CREATE_ERROR,
				payload: error.toString()
			});

			toast.error(error.toString());
		}
	};
}
