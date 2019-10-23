import React, { useState } from 'react';

import styled from 'styled-components';

import { Currency } from 'evm-lite-utils';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';

import { getSelectedAccount } from '../modules/accounts';

import { MonikerEVMAccount } from '../monet';
import {
	selectAccounts,
	selectedAccount,
	selectGetAccountLoading
} from '../selectors';

import Avatar from './Avatar';
import NewAccountModal from './NewAccountModal';
import SelectAccountModal from './SelectAccountModal';

import Logo from '../assets/monet_logo.png';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const SDropdown = styled(NavDropdown)`
	border: 1px solid #eee !important;
	border-radius: 5px;
	margin-right: 5px;

	a {
		color: rgba(0, 0, 0, 0.6);
	}
`;

const SRefresh = styled(Button)`
	/* padding: 10px 13px !important; */
	/* padding-top: 7px !important; */
	margin-left: 5px;
	margin-right: 10px !important;
`;

const SNav = styled(Nav)`
	a {
		color: rgba(0, 0, 0, 0.6);
		border-radius: 5px;
	}
`;

type Props = {};

const Header: React.FunctionComponent<Props> = () => {
	const dispatch = useDispatch();

	const getLoading = useSelector(selectGetAccountLoading);

	const accounts = useSelector(selectAccounts);
	const selected = useSelector(selectedAccount);

	const [show, setShow] = useState(false);
	const [showNew, setShowNew] = useState(false);

	const [clickedAccount, setClickedAccount] = useState<MonikerEVMAccount>({
		address: '',
		balance: new Currency(0),
		nonce: 0,
		bytecode: '',
		moniker: ''
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleCloseNew = () => setShowNew(false);
	const handleShowNew = () => setShowNew(true);

	const refresh = () => dispatch(getSelectedAccount());

	const onAccountClickBinder = (account: MonikerEVMAccount) => (e: any) => {
		setClickedAccount(account);
		handleShow();
	};

	return (
		<Navbar className="navi" bg="light">
			<NewAccountModal show={showNew} handleClose={handleCloseNew} />
			<SelectAccountModal
				account={clickedAccount}
				show={show}
				handleClose={handleClose}
			/>
			<Container>
				<Navbar.Brand>
					<NavLink to="/">
						<Image src={Logo} width={40} />
					</NavLink>
				</Navbar.Brand>
				<SNav className="justify-content-end mr-auto">
					<NavLink to="/settings">Settings</NavLink>
				</SNav>
				<SDropdown
					title={
						selected
							? capitalize(selected.moniker)
							: 'Select Account'
					}
					id="asd"
				>
					{accounts.map(account => (
						<NavDropdown.Item
							key={account.address}
							href="#"
							onClick={onAccountClickBinder(account)}
						>
							<Row
								className="align-items-center"
								noGutters={true}
							>
								<Col md={2}>
									<Avatar
										size={22}
										address={account.address}
									/>
								</Col>
								<Col md={1} />
								<Col>{capitalize(account.moniker)}</Col>
							</Row>
						</NavDropdown.Item>
					))}
					<NavDropdown.Divider />
					<NavDropdown.Item>
						<NavLink to={'/accounts'}>View All</NavLink>
					</NavDropdown.Item>
				</SDropdown>
				<Button onClick={handleShowNew} variant="outline-success">
					New
				</Button>{' '}
				{selected && (
					<>
						<SRefresh
							disabled={getLoading}
							className="text-center"
							onClick={refresh}
							variant={'outline-primary'}
						>
							{getLoading ? 'Refreshing...' : 'Refresh'}
						</SRefresh>{' '}
					</>
				)}
			</Container>
		</Navbar>
	);
};

export default Header;
