import React, { useEffect, useState } from 'react';

import utils, { Currency } from 'evm-lite-utils';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import FloatButton from '../components/FloatButton';

import WhiteChev from '../assets/chev-white.svg';

import { AccountsState, list } from '../modules/accounts';
import { MonikerEVMAccount } from '../monet';
import { Store } from '../store';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const SChevron = styled(Image)`
	margin-left: 30px;
`;

const SSidebar = styled(Col)`
	box-shadow: 0 2px 20px -20px #eee !important;

	h5 {
		background: #fefefe !important;
		color: #263c99;
		padding: 10px 20px !important;
		margin-bottom: 0px;
	}

	& ul {
		max-height: calc(100vh - 86px - 121px - 44px) !important;
		overflow-y: auto;
		list-style: none;
		background: #fff !important;
		margin: 0 !important;
		padding: 0 !important;
	}

	& li {
		display: block;
		padding: 10px 20px !important;
		transition: background-color 100ms ease-in;
	}

	& li span {
		color: #666;
		font-size: 13px;
		padding: 0px !important;
		display: block;
		overflow-y: hidden;
	}

	& li:hover {
		cursor: pointer;
		color: white !important;
		background: #263c99ee !important;

		& span {
			color: white;
		}
	}

	& .active {
		color: white !important;
		box-shadow: 0 4px 6px -10px #fff inset !important;
		background: #263c99 !important;

		& span {
			color: white;
		}
	}
`;

const SDetail = styled.div`
	box-shadow: 0 2px 20px -20px #eee !important;

	h5 {
		padding: 10px 20px;
		background: #fff !important;
		color: #263c99 !important;
		padding: 10px 20px !important;
		margin-bottom: 0px;
	}
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

	const isSelected = (account: MonikerEVMAccount) =>
		utils.cleanAddress(activeAccount.address) ===
		utils.cleanAddress(account.address);
	const hasSelected = activeAccount.address !== '';

	const bindActiveAccountSetter = (account: MonikerEVMAccount) => (
		e: any
	) => {
		setActiveAccount(account);
	};

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
			<Jumbotron fluid={true}>
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
			</Jumbotron>
			<Container>
				<Row noGutters={true}>
					<SSidebar md={4}>
						<h5>Accounts</h5>
						<ul>
							{accounts.all.map(account => (
								<li
									key={account.address}
									onClick={bindActiveAccountSetter(account)}
									className={
										isSelected(account) ? 'active' : ''
									}
								>
									<Row
										className="align-items-center"
										noGutters={true}
									>
										<Col md={2}>
											<Image
												src={`https://s.gravatar.com/avatar/${utils.trimHex(
													account.address
												)}?size=100&default=retro`}
												width={40}
											/>
										</Col>
										<Col lg={8}>
											{capitalize(account.moniker)}
											<span className="address">
												{account.address}
											</span>
										</Col>
										<Col>
											<SChevron
												className="justify-content-end"
												src={WhiteChev}
												width={12}
											/>
										</Col>
									</Row>
								</li>
							))}
						</ul>
					</SSidebar>
					{hasSelected && (
						<Col md={8}>
							<SDetail>
								<h5>
									{capitalize(activeAccount.moniker)}

									<span className="address">
										({activeAccount.address})
									</span>
								</h5>
								<div></div>
							</SDetail>
						</Col>
					)}
				</Row>
			</Container>
			<FloatButton bottomOffset={60}>
				<Button
					onClick={refreshAccounts}
					disabled={accounts.loading.list}
					variant={'warning'}
				>
					R
				</Button>
			</FloatButton>
		</>
	);
};

export default Accounts;
