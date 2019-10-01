import React from 'react';

import utils from 'evm-lite-utils';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';

import { AccountsState } from '../modules/accounts';
import { Store } from '../store';

import Logo from '../assets/monet_logo.png';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Props = {};

const Header: React.FunctionComponent<Props> = props => {
	const accounts = useSelector<Store, AccountsState>(store => store.accounts);

	return (
		<Navbar className="navi" bg="light" sticky={'top'}>
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
				<NavDropdown title="Danu" id="asd">
					{accounts.all.map(account => (
						<NavDropdown.Item href="#">
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
										className="mr-2"
									/>
								</Col>
								<Col md={1}></Col>
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
