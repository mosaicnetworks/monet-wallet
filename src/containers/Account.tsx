import React, { useCallback, useEffect, useState } from 'react';

import Utils, { Currency } from 'evm-lite-utils';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import { Monet } from 'evm-lite-core';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Avatar from '../components/Avatar';
import Await from '../components/Await';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Transfer from '../components/Transfer';
import Update from '../components/Update';

import { SSection, SStatistic } from '../components/styles';

import { MonikerEVMAccount } from 'src/monet';
import { selectAccounts, selectConfig } from '../selectors';
import { capitalize, commaSeperate, parseBalance } from '../utils';

const SSettings = styled(SSection)`
	display: none;
`;

const STransfer = styled(SSection)`
	border-bottom: var(--border);
`;

const SUpdate = styled(SSection)`
	border-bottom: var(--border);
`;

type Props = {
	moniker: string;
};

const Account: React.FC<RouteComponentProps<Props>> = props => {
	const accounts = useSelector(selectAccounts);
	const config = useSelector(selectConfig);

	const moniker = props.match.params.moniker;
	const [loading] = useState(false);
	const [account, setAccount] = useState<MonikerEVMAccount>({
		moniker: '',
		balance: new Currency(0),
		nonce: 0,
		address: '',
		bytecode: ''
	});

	const fetchAccount = useCallback(
		async (a: MonikerEVMAccount) => {
			// setLoading(true);

			const node = new Monet(
				config.connection.host,
				config.connection.port
			);
			const res = await node.getAccount(a.address);

			setAccount({
				...res,
				moniker: a.moniker
			});

			// setTimeout(() => setLoading(false), 0);
		},
		[account]
	);

	useEffect(() => {
		const a = accounts.find(a => a.moniker.toLowerCase() === moniker);

		if (a) {
			setAccount(a);
			fetchAccount(a);
		} else {
			props.history.push('/');
		}

		ReactTooltip.hide();
	}, []);

	// polling for accounts
	let poller: any;
	useEffect(() => {
		poller = setInterval(() => {
			fetchAccount(account);
		}, 5000);

		return () => {
			clearInterval(poller);
		};
	}, [account]);

	return (
		<>
			<Header
				icon={<Avatar address={account.address} size={35} />}
				title={`${capitalize(account.moniker)}  (${Utils.cleanAddress(
					account.address
				)})`}
			></Header>
			<SStatistic className="">
				<Container>
					<Row className="align-items-center">
						<Col className="text-center">
							<h3>
								<Await
									await={loading}
									fallback={<Loader loading={loading} />}
								>
									<img
										src={
											'https://monet.network/app/images/products/tenom.svg'
										}
										width={35}
										style={{ marginRight: '15px' }}
									/>
									{commaSeperate(
										parseBalance(account.balance).slice(
											0,
											-1
										)
									)}
								</Await>
							</h3>
							<div onClick={() => fetchAccount(account)}>
								Balance
							</div>
						</Col>
						<Col className="text-center">
							<h3>
								<Await
									await={loading}
									fallback={<Loader loading={loading} />}
								>
									{account.nonce}
								</Await>
							</h3>
							<div onClick={() => console.log(account)}>
								Nonce
							</div>
						</Col>
					</Row>
				</Container>
			</SStatistic>
			<STransfer>
				<Transfer
					getAccount={() => fetchAccount(account)}
					account={account}
				/>
			</STransfer>
			<SUpdate>
				<Update
					getAccount={() => fetchAccount(account)}
					account={account}
				/>
			</SUpdate>
			<SSettings>
				<h5>Account Actions</h5>
				<li>Change Password</li>
				<li>Unlock</li>
			</SSettings>
		</>
	);
};

export default Account;
