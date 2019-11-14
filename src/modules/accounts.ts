import { Account, Monet } from 'evm-lite-core';
import { AbstractKeystore } from 'evm-lite-keystore';
import Utils, { Currency } from 'evm-lite-utils';

import { toast } from 'react-toastify';

import { BaseAction, errorHandler, ThunkResult } from '.';
import { MonetDataDir, MonetInfo, MonikerEVMAccount } from '../monet';

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

// Accounts state structure
export type AccountsState = {
	// Entire list of accounts
	readonly all: MonikerEVMAccount[];

	// A single error field to be used by this module for any action
	readonly error?: string;

	// Loading states for async actions
	readonly loading: {
		transfer: boolean;
		list: boolean;
		create: boolean;
	};
};

// Initial State of the accounts module
const initialState: AccountsState = {
	all: [],
	loading: {
		list: false,
		create: false,
		transfer: false
	}
};

// The root reducer for the accounts module
export default function reducer(
	state: AccountsState = initialState,
	action: BaseAction<any> = {} as BaseAction<any>
): Readonly<AccountsState> {
	switch (action.type) {
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

export function listAccounts(
	fetch: boolean = false
): ThunkResult<Promise<void>> {
	return async (dispatch, getState) => {
		let accounts: MonikerEVMAccount[] = [];

		const { config } = getState();
		const error = errorHandler(dispatch, LIST_ERROR);

		dispatch({
			type: LIST_INIT
		});

		const datadir = new MonetDataDir(config.directory);
		const mk = await datadir
			.listKeyfiles()
			.catch(() => error('Could not load accounts'));

		if (!mk) {
			dispatch({
				type: LIST_ERROR,
				error: 'Could not load accounts from keystore'
			});

			return;
		}

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
	moniker: string,
	passphrase: string,
	to: string,
	value: string
): ThunkResult<Promise<void>> {
	return async (dispatch, getState) => {
		const state = getState();

		const config = state.config.data;
		const error = errorHandler(dispatch, TRANSFER_ERROR);

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

			if (Utils.cleanAddress(to).length !== 42) {
				error('Invalid receipient address');
			}

			if (info) {
				let account: Account;

				try {
					const datadir = new MonetDataDir(state.config.directory);
					const keyfile = await datadir.getKeyfile(moniker);

					account = MonetDataDir.decrypt(keyfile, passphrase);
				} catch (e) {
					error('Incorrect passphrase');
					return;
				}

				try {
					const receipt = await node.transfer(
						account,
						to,
						new Currency(value),
						21000,
						Number(info.min_gas_price)
					);

					dispatch({
						type: TRANSFER_SUCCESS,
						payload: receipt
					});

					toast.success('Transfer successful');
				} catch (e) {
					error(
						'Looks like theres a proble with the connection to the node'
					);
				}
			}
		} else {
			throw Error('Configuration could not loaded.');
		}
	};
}

export function createAccount(
	account: Account,
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
			const keyfile = AbstractKeystore.encrypt(account, password);

			await datadir.importKeyfile(moniker, keyfile);

			const a: MonikerEVMAccount = {
				...account,
				bytecode: '',
				moniker
			};

			dispatch({
				type: CREATE_SUCCESS,
				payload: a
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
