import * as path from 'path';

import Utils from 'evm-lite-utils';

import {
	Account,
	BaseAccount,
	EVMTypes,
	EVMLC,
	TransactionReceipt
} from 'evm-lite-core';

import { Keystore, V3JSONKeyStore } from 'evm-lite-keystore';
import { toast } from 'react-toastify';

import { BaseAction, ThunkResult } from '.';

// Lists all accounts in keystore
const LIST_REQUEST = '@evm-lite-wallet/accounts/LIST/REQUEST';
const LIST_SUCCESS = '@evm-lite-wallet/accounts/LIST/SUCCESS';
const LIST_ERROR = '@evm-lite-wallet/accounts/LIST/ERROR';

// Creates account in keystore
const CREATE_REQUEST = '@evm-lite-wallet/accounts/CREATE/REQUEST';
const CREATE_SUCCESS = '@evm-lite-wallet/accounts/CREATE/SUCCESS';
const CREATE_ERROR = '@evm-lite-wallet/accounts/CREATE/ERROR';

// Get account balance and nonce from node
const GET_REQUEST = '@evm-lite-wallet/accounts/GET/REQUEST';
const GET_SUCCESS = '@evm-lite-wallet/accounts/GET/SUCCESS';
const GET_ERROR = '@evm-lite-wallet/accounts/GET/ERROR';

// For decrypting an account
const UNLOCK_REQUEST = '@evm-lite-wallet/accounts/UNLOCK/REQUEST';
const UNLOCK_SUCCESS = '@evm-lite-wallet/accounts/UNLOCK/SUCCESS';
const UNLOCK_ERROR = '@evm-lite-wallet/accounts/UNLOCK/ERROR';
const UNLOCK_RESET = '@evm-lite-wallet/accounts/UNLOCK/RESET';

// For transferring tokens/coins from an account
const TRANSFER_REQUEST = '@evm-lite-wallet/accounts/TRANSFER/REQUEST';
const TRANSFER_SUCCESS = '@evm-lite-wallet/accounts/TRANSFER/SUCCESS';
const TRANSFER_ERROR = '@evm-lite-wallet/accounts/TRANSFER/ERROR';

/**
 * Should comma seperate the integer/ string.
 *
 * @param x - The value to comma sepetate.
 */
// function integerWithCommas(x: number | string) {
// 	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }

// Accounts state structure
export interface AccountsState {
	// Entire list of accounts
	readonly all: BaseAccount[];

	// Currently unlocked account
	readonly unlocked?: Account;

	// Entrie list of transactions (not specific to an account)
	// Latest transaction hash
	readonly transactions: {
		all: any[];
		lastestReceipt?: TransactionReceipt;
	};

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
}

// Initial State of the accounts module
const initialState: AccountsState = {
	all: [],
	transactions: {
		all: []
	},
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
		// List accounts
		case LIST_REQUEST:
			return {
				...state,
				all: [],
				error: undefined,
				loading: {
					...state.loading,
					list: true
				}
			};
		case LIST_SUCCESS:
			return {
				...state,
				all: action.payload,
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

		// Create account
		case CREATE_REQUEST:
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

		// Get account
		case GET_REQUEST:
			return {
				...state,
				error: undefined,
				loading: {
					...state.loading,
					get: true
				}
			};
		case GET_SUCCESS:
			const accounts = state.all.map(acc => {
				const acc2 = {
					...acc
				};

				if (
					Utils.cleanAddress(acc.address) ===
					Utils.cleanAddress(action.payload.address)
				) {
					acc2.balance = action.payload.balance;
					acc2.nonce = action.payload.nonce;
				}

				return acc2;
			});

			return {
				...state,
				error: undefined,
				all: accounts,
				loading: {
					...state.loading,
					get: false
				}
			};
		case GET_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					get: false
				}
			};

		// Unlock account
		case UNLOCK_REQUEST:
			return {
				...state,
				error: undefined,
				loading: {
					...state.loading,
					unlock: true
				}
			};
		case UNLOCK_SUCCESS:
			return {
				...state,
				unlocked: action.payload,
				error: undefined,
				loading: {
					...state.loading,
					unlock: false
				}
			};
		case UNLOCK_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					unlock: false
				}
			};
		case UNLOCK_RESET:
			return {
				...state,
				error: undefined,
				unlocked: undefined,
				loading: {
					...state.loading,
					unlock: false
				},
				transactions: {
					...state.transactions,
					lastestReceipt: undefined
				}
			};

		// Transfer
		case TRANSFER_REQUEST:
			return {
				...state,
				transactions: {
					...state.transactions,
					lastestReceipt: undefined
				},
				loading: {
					...state.loading,
					transfer: true
				}
			};
		case TRANSFER_SUCCESS:
			// TODO: Create transaction here.
			return {
				...state,
				transactions: {
					...state.transactions,
					lastestReceipt: action.payload
				},
				loading: {
					...state.loading,
					transfer: false
				}
			};
		case TRANSFER_ERROR:
			return {
				...state,
				transactions: {
					...state.transactions,
					lastestReceipt: undefined
				},
				loading: {
					...state.loading,
					transfer: false
				},
				error: action.payload
			};
		default:
			return state;
	}
}

/**
 * Should list all acounts from the keystore. It will update the redux state
 * and set the `all` attribute to the desired result.
 */
export function list(): ThunkResult<Promise<BaseAccount[]>> {
	return async (dispatch, getState) => {
		const state = getState();

		let accounts: BaseAccount[] = [];

		dispatch({
			type: LIST_REQUEST
		});

		try {
			let node: EVMLC | undefined;

			node = new EVMLC('localhost', 8080);

			await node.getInfo().catch(() => {
				node = undefined;
			});

			const keystore = new Keystore(
				path.join(state.config.directory, 'keystore')
			);

			accounts = (await keystore.list()).map(keystore => ({
				address: keystore.address,
				balance: 0,
				nonce: 0,
				bytecode: ''
			}));

			if (node) {
				accounts = await Promise.all(
					accounts.map(async account => {
						return await node!.getAccount(account.address);
					})
				);
			}

			dispatch({
				type: LIST_SUCCESS,
				payload: accounts
			});
		} catch (error) {
			dispatch({
				type: LIST_ERROR,
				payload: error.toString()
			});
		}

		return accounts;
	};
}

/**
 * Creates an ethereum account and appends it into the list of all accounts.
 *
 * @param password - The string to used to encrypt the newly created account
 */
export function create(password: string): ThunkResult<Promise<BaseAccount>> {
	return async (dispatch, getState) => {
		const { config } = getState();

		const account = {
			address: '',
			balance: 0,
			nonce: 0,
			bytecode: ''
		};

		dispatch({
			type: CREATE_REQUEST
		});

		try {
			const keystore = new Keystore(
				path.join(config.directory, 'keystore')
			);
			const acc: V3JSONKeyStore = await keystore.create(password);

			account.address = acc.address;

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
		}

		return account;
	};
}

/**
 * Should fetch `BaseAccount` type of the address prepopulating the object with
 * the address's balance and nonce.
 *
 * @param address - The address to fetch from the node
 */
export function get(
	address: EVMTypes.Address
): ThunkResult<Promise<BaseAccount>> {
	return async (dispatch, getState) => {
		const { config } = getState();
		let account = {} as BaseAccount;

		dispatch({
			type: GET_REQUEST
		});

		try {
			if (!!Object.keys(config).length) {
				const node = new EVMLC(
					config.data.connection.host,
					config.data.connection.port
				);

				account = await node.getAccount(address);

				dispatch({
					type: GET_SUCCESS,
					payload: account
				});
			} else {
				throw Error('Configuration could not loaded.');
			}
		} catch (error) {
			dispatch({
				type: GET_ERROR,
				payload: error.toString()
			});
		}

		return account;
	};
}

/**
 * Should decrypt an account and set the result into the redux state. The account
 * will be removed after the session is closed or manually reset.
 *
 * @param address - The address of the account to unlock
 * @param password - The associated password for the address in question
 */
export function unlock(
	address: EVMTypes.Address,
	password: string
): ThunkResult<Promise<Account | undefined>> {
	return async (dispatch, getState) => {
		const { config } = getState();

		dispatch({
			type: UNLOCK_REQUEST
		});

		try {
			const keystore = new Keystore(
				path.join(config.directory, 'keystore')
			);

			const account = Keystore.decrypt(
				await keystore.get(address),
				password
			);

			dispatch({
				type: UNLOCK_SUCCESS,
				payload: account
			});

			return account;
		} catch (error) {
			dispatch({
				type: UNLOCK_ERROR,
				payload: error.toString()
			});

			toast.error('Invalid password.');
			return undefined;
		}
	};
}

/**
 * Reset function for unlocking an account.
 */
export function resetUnlock(): ThunkResult<void> {
	return dispatch => {
		dispatch({
			type: UNLOCK_RESET
		});
	};
}

/**
 * Should transfer the state amount of tokens/coins to the desired address.
 *
 * @param from - The `from` address of the transaction
 * @param to - The `to` address of the transaction
 * @param value - The amount of coin(s)/token(s) to send
 * @param gas - The maximum `gas` to use for this transaction
 * @param gasPrice - The price per `gas` to pay for the transaction
 */
export function transfer(
	from: EVMTypes.Address,
	to: EVMTypes.Address,
	value: EVMTypes.Value,
	gas: EVMTypes.Gas,
	gasPrice: EVMTypes.GasPrice
): ThunkResult<Promise<TransactionReceipt>> {
	return async (dispatch, getState) => {
		const state = getState();
		const config = state.config.data;

		dispatch({
			type: TRANSFER_REQUEST
		});

		try {
			if (!state.accounts.unlocked) {
				throw Error('No account unlocked to sign the transfer.');
			}

			if (!!Object.keys(config).length) {
				const evmlc = new EVMLC(
					config.connection.host,
					config.connection.port
				);

				await evmlc.getInfo();

				// const transaction = Account.prepareTransfer(coto, value);
				// await transaction.submit(state.accounts.unlocked, {
				// 	timeout: 3
				// });

				// if (!transaction.hash) {
				// 	throw Error(
				// 		'Transaction hash not found after ' +
				// 			'transfer was submitted to node.'
				// 	);
				// }

				const receipt = {} as TransactionReceipt;

				dispatch({
					type: TRANSFER_SUCCESS,
					payload: receipt
				});

				return receipt!;
			} else {
				throw Error('Configuration could not loaded.');
			}
		} catch (error) {
			dispatch({
				type: TRANSFER_ERROR,
				payload: error.toString()
			});

			return {} as TransactionReceipt;
		}
	};
}
