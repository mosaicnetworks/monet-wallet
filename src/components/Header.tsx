import React, { useState } from 'react';

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

import { AccountsState, unlock } from '../modules/accounts';
import { MonikerEVMAccount } from '../monet';
import { Store } from '../store';

import Logo from '../assets/monet_logo.png';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Props = {};

const Header: React.FunctionComponent<Props> = props => {
	const dispatch = useDispatch();
	const accounts = useSelector<Store, AccountsState>(store => store.accounts);

	const [passphrase, setPassphrase] = useState('');

	const [show, setShow] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState<MonikerEVMAccount>({
		address: '',
		balance: new Currency(0),
		nonce: 0,
		bytecode: '',
		moniker: ''
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onAccountClickBinder = (account: MonikerEVMAccount) => (e: any) => {
		setSelectedAccount(account);
		handleShow();
	};

	const handleSwitchAccount = async () => {
		await dispatch(unlock(selectedAccount.moniker, passphrase));

		handleClose();
	};

	return (
		<Navbar className="navi" bg="light" sticky={'top'}>
			<Modal centered={true} show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Switch Accounts</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row className="align-items-center">
						<Col md={2}>
							<Image
								src={`https://s.gravatar.com/avatar/${utils.trimHex(
									selectedAccount.address
								)}?size=100&default=retro`}
								width={60}
								className="mr-1"
							/>
						</Col>
						<Col>
							<h5>{capitalize(selectedAccount.moniker)}</h5>
							{utils.cleanAddress(selectedAccount.address)}
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
						disabled={passphrase.length < 2}
						variant="primary"
						onClick={handleSwitchAccount}
					>
						Switch
					</Button>
				</Modal.Footer>
			</Modal>
			<Container>
				<Navbar.Brand href="#">
					<NavLink to="/">
						<Image src={Logo} width={40} />
					</NavLink>
				</Navbar.Brand>
				<Nav className="justify-content-end mr-auto">
					<Nav.Link href="#config">
						<NavLink to="/config">Settings</NavLink>
					</Nav.Link>
				</Nav>
				<NavDropdown
					title={accounts.unlocked ? 'Switch' : 'Not Selected'}
					id="asd"
				>
					{accounts.all.map(account => (
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
				</NavDropdown>
			</Container>
		</Navbar>
	);
};

export default Header;
