import {
	EVMLC,
	Contract,
	AbstractSchema,
	Transaction,
	TX
} from 'evm-lite-core';

import Utils from 'evm-lite-utils';

import { toast } from 'react-toastify';

import { BaseAction, ThunkResult } from '.';

interface Schema extends AbstractSchema {
	checkAuthorised(tx: TX, address: string): Transaction;
	submitNominee(tx: TX, address: string, moniker: string): Transaction;
	castNomineeVote(tx: TX, address: string, verdict: boolean): Transaction;
	getCurrentNomineeVotes(tx: TX, address: string): Transaction;
	getWhiteListCount(tx: TX): Transaction;
	getWhiteListAddressFromIdx(tx: TX, id: number): Transaction;
	getMoniker(tx: TX, address: string): Transaction;
	getNomineeCount(tx: TX): Transaction;
	getNomineeAddressFromIdx(tx: TX, id: number): Transaction;
	isNominee(tx: TX, address: string): Transaction;
}

// whitelist
const WHITELIST_REQUEST = '@evm-lite-wallet/poa/WHITELIST/REQUEST';
const WHITELIST_SUCCESS = '@evm-lite-wallet/poa/WHITELIST/SUCCESS';
const WHITELIST_ERROR = '@evm-lite-wallet/poa/WHITELIST/ERROR';

// nominee list
const NOMINEELIST_REQUEST = '@evm-lite-wallet/poa/NOMINEELIST/REQUEST';
const NOMINEELIST_SUCCESS = '@evm-lite-wallet/poa/NOMINEELIST/SUCCESS';
const NOMINEELIST_ERROR = '@evm-lite-wallet/poa/NOMINEELIST/ERROR';

interface WhitelistEntry {
	moniker: string;
	address: string;
}

interface Nominee extends WhitelistEntry {
	upVotes: number;
	downVotes: number;
}

const hexToString = (hex: string) => {
	let data = '';

	if (!hex) {
		return '';
	}

	for (let i = 0; i < hex.length; i += 2) {
		data += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}

	return data.replace(/\u0000/g, '').trim();
};

// Proof of Authority State
export interface POAState {
	// Entire whitelist
	readonly whitelist: WhitelistEntry[];

	// All nominee for the node
	readonly nominees: Nominee[];

	// A single error field to be used by this module for any action
	readonly error?: string;

	// Loading states for async actions
	loading: {
		whitelist: boolean;
		nomineelist: boolean;
	};
}

// Initial state of Proof of Authority
const initialState: POAState = {
	whitelist: [],
	nominees: [],
	loading: {
		whitelist: false,
		nomineelist: false
	}
};

export default function reducer(
	state: POAState = initialState,
	action: BaseAction<any> = {} as BaseAction<any>
): Readonly<POAState> {
	switch (action.type) {
		// whitelist action
		case WHITELIST_REQUEST:
			return {
				...state,
				error: undefined,
				whitelist: [],
				loading: {
					...state.loading,
					whitelist: true
				}
			};
		case WHITELIST_SUCCESS:
			return {
				...state,
				whitelist: action.payload,
				loading: {
					...state.loading,
					whitelist: false
				}
			};
		case WHITELIST_ERROR:
			return {
				...state,
				whitelist: [],
				error: action.payload,
				loading: {
					...state.loading,
					whitelist: false
				}
			};

		// nomineelist aciton
		case NOMINEELIST_REQUEST:
			return {
				...state,
				error: undefined,
				nominees: [],
				loading: {
					...state.loading,
					nomineelist: true
				}
			};
		case NOMINEELIST_SUCCESS:
			return {
				...state,
				nominees: action.payload,
				loading: {
					...state.loading,
					nomineelist: false
				}
			};
		case NOMINEELIST_ERROR:
			return {
				...state,
				nominees: [],
				error: action.payload,
				loading: {
					...state.loading,
					nomineelist: false
				}
			};

		default:
			return state;
	}
}

export function reload(): ThunkResult<Promise<void>> {
	return async dispatch => {
		dispatch(whitelist()).then(() =>
			dispatch(nomineelist()).then(() =>
				toast.info('Proof of Authority data reloaded.')
			)
		);
	};
}

export function whitelist(): ThunkResult<Promise<void>> {
	return async (dispatch, getState) => {
		dispatch({
			type: WHITELIST_REQUEST
		});

		try {
			const { config } = getState();
			const node = new EVMLC(
				config.data.connection.host,
				config.data.connection.port
			);

			let poa: { address: string; abi: any[] };

			const r = await node.getPOAContract();
			poa = {
				...r,
				// @ts-ignore
				abi: JSON.parse(r.abi as string)
			};

			const contract = Contract.load<Schema>(poa.abi, poa.address);
			const transaction = contract.methods.getWhiteListCount({
				gas: config.data.defaults.gas,
				gasPrice: config.data.defaults.gasPrice
			});

			const whitelistCount = (await node.callTransaction<any>(
				transaction
			)).toNumber(0);

			const whitelist: WhitelistEntry[] = [];

			for (const i of Array.from(Array(whitelistCount).keys())) {
				const whitelistEntry: WhitelistEntry = {
					address: '',
					moniker: ''
				};

				const tx = contract.methods.getWhiteListAddressFromIdx(
					{
						gas: config.data.defaults.gas,
						gasPrice: config.data.defaults.gasPrice
					},
					i
				);

				whitelistEntry.address = await node.callTransaction(tx);

				const monikerTx = contract.methods.getMoniker(
					{
						gas: config.data.defaults.gas,
						gasPrice: config.data.defaults.gasPrice
					},
					whitelistEntry.address
				);

				const hex: string = await node.callTransaction(monikerTx);

				whitelistEntry.moniker = hexToString(hex);

				whitelist.push(whitelistEntry);
			}

			dispatch({
				type: WHITELIST_SUCCESS,
				payload: whitelist
			});
		} catch (error) {
			dispatch({
				type: WHITELIST_ERROR,
				payload: error.toString()
			});
		}
	};
}

export function nomineelist(): ThunkResult<Promise<void>> {
	return async (dispatch, getState) => {
		dispatch({
			type: NOMINEELIST_REQUEST
		});

		try {
			const { config } = getState();
			const node = new EVMLC(
				config.data.connection.host,
				config.data.connection.port
			);

			let poa: { address: string; abi: any[] };

			const r = await node.getPOAContract();
			poa = {
				...r,
				// @ts-ignore
				abi: JSON.parse(r.abi as string)
			};

			const contract = Contract.load<Schema>(poa.abi, poa.address);
			const transaction = contract.methods.getNomineeCount({
				gas: config.data.defaults.gas,
				gasPrice: config.data.defaults.gasPrice
			});

			const nomineeCount = (await node.callTransaction<any>(
				transaction
			)).toNumber(0);

			const nominees: Nominee[] = [];

			for (const i of Array.from(Array(nomineeCount).keys())) {
				const nominee: Nominee = {
					address: '',
					moniker: '',
					upVotes: 0,
					downVotes: 0
				};

				const tx = contract.methods.getNomineeAddressFromIdx(
					{
						gas: config.data.defaults.gas,
						gasPrice: config.data.defaults.gasPrice
					},
					i
				);

				nominee.address = await node.callTransaction(tx);

				const monikerTx = contract.methods.getMoniker(
					{
						gas: config.data.defaults.gas,
						gasPrice: config.data.defaults.gasPrice
					},
					nominee.address
				);

				const hex: string = await node.callTransaction(monikerTx);

				nominee.moniker = hexToString(hex);

				const votesTransaction = contract.methods.getCurrentNomineeVotes(
					{
						from: config.data.defaults.from,
						gas: config.data.defaults.gas,
						gasPrice: config.data.defaults.gasPrice
					},
					Utils.cleanAddress(nominee.address)
				);

				let votes: [string, string] = await node.callTransaction<
					[string, string]
				>(votesTransaction);

				nominee.upVotes = parseInt(votes[0], 10);
				nominee.downVotes = parseInt(votes[1], 10);

				nominees.push(nominee);
			}

			dispatch({
				type: NOMINEELIST_SUCCESS,
				payload: nominees
			});
		} catch (error) {
			dispatch({
				type: NOMINEELIST_ERROR,
				payload: error.toString()
			});
		}
	};
}
