import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Currency } from 'evm-lite-utils';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import FloatButton from '../components/FloatButton';

import { AccountsState, list } from '../modules/accounts';
import { MonikerEVMAccount } from '../monet';
import { Store } from '../store';

const SJumbotron = styled(Jumbotron)`
	box-shadow: 0 2px 20px -15px #ddd !important;
`;

const Accounts: React.FunctionComponent<{}> = () => {
	const dispatch = useDispatch();
	const refreshAccounts = () => dispatch(list());

	const [activeAccount, setActiveAccount] = useState<MonikerEVMAccount>({
		address: '',
		nonce: 0,
		balance: new Currency(0),
		bytecode: '',
		moniker: ''
	});

	const accounts = useSelector<Store, AccountsState>(store => store.accounts);
	const hasSelected = activeAccount.address !== '';

	useEffect(() => {
		refreshAccounts();
	}, []);

	useEffect(() => {
		if (accounts.all.length) {
			if (!hasSelected) {
				setActiveAccount(accounts.all[0]);
			}
		}
	}, [accounts.all]);

	return (
		<>
			<SJumbotron fluid={true}>
				<Container>
					<Row>
						<Col md={6} lg={8}>
							<h3>Dashboard</h3>
							<p>View & Modify Existing Accounts</p>
						</Col>
						<Col>
							<h4>Balance</h4>
							<p>
								{hasSelected
									? activeAccount.balance.format('T')
									: 'Not Selected'}
							</p>
						</Col>
						<Col>
							<h4>Nonce</h4>
							<p>
								{hasSelected
									? activeAccount.nonce
									: 'Not Selected'}
							</p>
						</Col>
					</Row>
				</Container>
			</SJumbotron>
			<Container></Container>
			<FloatButton bottomOffset={60}>
				<Button
					onClick={refreshAccounts}
					disabled={accounts.loading.list}
					variant={'primary'}
				>
					R
				</Button>
			</FloatButton>
		</>
	);
};

export default Accounts;
