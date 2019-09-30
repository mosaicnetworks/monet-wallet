import React from 'react';

import { NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { MonikerAccount } from '../monet';

import Logo from '../assets/monet_logo.png';

type Props = {
	unlocked: MonikerAccount | undefined;
	reset: any;
};

const Header: React.FunctionComponent<Props> = props => {
	return (
		<Navbar bg="light" sticky={'top'}>
			<Container>
				<Navbar.Brand href="#">
					<NavLink to="/">
						<Image src={Logo} width={40} />
					</NavLink>
				</Navbar.Brand>
				<Nav className="justify-content-end mr-auto">
					<Nav.Link href="#">
						<NavLink to="/">Accounts</NavLink>
					</Nav.Link>
					<Nav.Link href="#config">
						<NavLink to="/config">Configuration</NavLink>
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Header;
