import React, { useState } from 'react';

import styled from 'styled-components';

import utils, { Currency } from 'evm-lite-utils';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';

import { getSelectedAccount, selectAccount } from '../modules/accounts';

import { MonikerEVMAccount } from '../monet';
import { selectAccounts, selectedAccount } from '../selectors';

import Logo from '../assets/monet_logo.png';
// import Refresh from '../assets/refresh.png';
import Avatar from './Avatar';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const SDropdown = styled(NavDropdown)`
	border: 1px solid #eee !important;
	border-radius: 5px;
	margin-right: 10px;
`;

const SRefresh = styled(Button)`
	/* padding: 10px 13px !important; */
	/* padding-top: 7px !important; */
`;

const SNav = styled(Nav)`
	a {
		border-radius: 5px;
	}
`;

type Props = {};

const Header: React.FunctionComponent<Props> = () => {
	const dispatch = useDispatch();

	const accounts = useSelector(selectAccounts);
	const selected = useSelector(selectedAccount);

	const [passphrase, setPassphrase] = useState('');

	const [show, setShow] = useState(false);
	const [clickedAccount, setClickedAccount] = useState<MonikerEVMAccount>({
		address: '',
		balance: new Currency(0),
		nonce: 0,
		bytecode: '',
		moniker: ''
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const select = (moniker: string, pass: string) =>
		dispatch(selectAccount(moniker, pass));

	const refresh = () => dispatch(getSelectedAccount());

	const onAccountClickBinder = (account: MonikerEVMAccount) => (e: any) => {
		setClickedAccount(account);
		handleShow();
	};

	const handleSwitchAccount = async () => {
		await select(clickedAccount.moniker, passphrase);

		handleClose();
	};

	return (
		<Navbar className="navi" bg="light" sticky={'top'}>
			<Modal centered={true} show={show} onHide={handleClose}>
				<Form>
					<Modal.Header closeButton>
						<Modal.Title>Switch Accounts</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row className="align-items-center">
							<Col md={2}>
								<Avatar address={clickedAccount.address} />
							</Col>
							<Col>
								<h5>{capitalize(clickedAccount.moniker)}</h5>
								<span className="mono">
									{utils.cleanAddress(clickedAccount.address)}
								</span>
							</Col>
						</Row>
						<br />
						<Form.Control
							onChange={(e: any) => setPassphrase(e.target.value)}
							placeholder="Passphrase"
							type="password"
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button
							type="submit"
							disabled={passphrase.length < 2}
							variant="warning"
							onClick={handleSwitchAccount}
						>
							Switch
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
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
									<Image
										src={`https://s.gravatar.com/avatar/${utils.trimHex(
											account.address
										)}?size=100&default=retro`}
										width={20}
										className="mr-1"
									/>
								</Col>
								<Col md={1} />
								<Col>{capitalize(account.moniker)}</Col>
							</Row>
						</NavDropdown.Item>
					))}
				</SDropdown>
				{selected && (
					<SRefresh
						className="text-center"
						onClick={refresh}
						variant={'outline-primary'}
					>
						Refresh
					</SRefresh>
				)}
			</Container>
		</Navbar>
	);
};

export default Header;
