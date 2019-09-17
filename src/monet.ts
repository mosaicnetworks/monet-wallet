import * as p from 'path';

import { IBaseInfo } from 'evm-lite-client';
import { Account, IEVMAccount } from 'evm-lite-core';

import DataDirectory from 'evm-lite-datadir';
import Keystore from 'evm-lite-keystore';

export interface IMonetInfo extends IBaseInfo {
	consensus_events: string;
	consensus_transactions: string;
	events_per_second: string;
	id: string;
	last_block_index: string;
	last_consensus_round: string;
	moniker: string;
	num_peers: string;
	round_events: string;
	rounds_per_second: string;
	state: string;
	sync_rate: string;
	transaction_pool: string;
	undetermined_events: string;
}

export interface IMonikerEVMAccount extends IEVMAccount {
	moniker: string;
}

// monet specific class definitions
export class MonikerAccount extends Account {
	public moniker: string = '';

	constructor(data: { address: string; privateKey: string }) {
		super(data);
	}
}

export class MonetDataDir extends DataDirectory<Keystore> {
	constructor(path: string) {
		const keystore = new Keystore(p.join(path, 'keystore'));
		super(path, 'monetcli', keystore);
	}
}
