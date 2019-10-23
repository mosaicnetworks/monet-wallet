import React, { useEffect, useState } from 'react';

import utils, { Currency } from 'evm-lite-utils';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';

import Avatar from '../components/Avatar';
import SelectAccountModal from '../components/SelectAccountModal';

import { MonikerEVMAccount } from '../monet';
import { selectAccounts } from '../selectors';

import { listAccounts } from '../modules/accounts';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Props = {
	handleClose: () => void;
	show: boolean;
};

const SAccount = styled.div`
	padding: 15px !important;
	padding-top: 20px !important;

	&:hover {
		cursor: pointer;
		background: #f3f3f3;
	}

	span {
		font-size: 18px;
	}
`;

const SJumbotron = styled(Jumbotron)`
	box-shadow: 0 2px 20px -15px #ddd !important;
`;

const SHeadingContainer = styled(Container)`
	padding: 0 5px !important;
`;

const SContainer = styled.div`
	background: #fff;
`;

const Accounts: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);

	const [show, setShow] = useState(false);
	const [clickedAccount, setClickedAccount] = useState<MonikerEVMAccount>({
		address: '',
		balance: new Currency(0),
		nonce: 0,
		bytecode: '',
		moniker: ''
	});

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const onAccountClickBinder = (account: MonikerEVMAccount) => (e: any) => {
		setClickedAccount(account);

		handleShow();
	};

	const fetchAll = () => dispatch(listAccounts(true));

	const parseBalance = (balance: Currency) => {
		const b = balance.format('T');
		const l = b.split('.');

		if (l.length !== 2) {
			return l.join('.');
		}

		if (l[1]) {
			l[1] = l[1].slice(0, 2);
		}

		return l.join('.') + 'T';
	};

	useEffect(() => {
		fetchAll();
	}, []);

	const renderAccount = (a: MonikerEVMAccount) => {
		return (
			<SAccount onClick={onAccountClickBinder(a)} key={a.address}>
				<Container>
					<Row className="align-items-center">
						<Col md={8}>
							<Media>
								<Avatar address={a.address} />
								<Media.Body>
									<h5>{capitalize(a.moniker)}</h5>
									<p className="mono">
										{utils.cleanAddress(a.address)}
									</p>
								</Media.Body>
							</Media>
						</Col>
						<Col md={2}>
							<span className="mono">
								{parseBalance(a.balance)}
							</span>
							<div>Balance</div>
						</Col>
						<Col md={2}>
							<span className="mono">{a.nonce}</span>
							<div>Nonce</div>
						</Col>
					</Row>
				</Container>
			</SAccount>
		);
	};

	return (
		<SContainer>
			<SelectAccountModal
				account={clickedAccount}
				show={show}
				handleClose={handleClose}
			/>
			<SJumbotron fluid={true}>
				<SHeadingContainer>
					<Row noGutters={true} className="align-items-center">
						<Col md={6} lg={8}>
							<h3>All Accounts</h3>
							<p>Click on an account to make transfers</p>
						</Col>
						<Col>
							<h4>Total Balance</h4>
							<p className={'mono'}>
								{(accounts.length &&
									parseBalance(
										accounts
											.map(a => a.balance)
											.reduce((a, c) => c.plus(a))
									)) ||
									'-'}
							</p>
						</Col>
						<Col>
							<h4>Count</h4>
							<p className={'mono'}>{accounts.length}</p>
						</Col>
					</Row>
				</SHeadingContainer>
			</SJumbotron>
			{accounts.map(a => renderAccount(a))}
		</SContainer>
	);
};

export default Accounts;
