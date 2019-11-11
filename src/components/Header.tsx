import React from 'react';

import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Logo from '../assets/monet_logo.png';

const SHeader = styled.div`
	position: sticky !important;
	top: 0 !important;
	background: #fff;
	box-shadow: 2px 0px 70px rgba(0, 0, 0, 0.1);
	height: 70px;
	line-height: 70px !important;
`;

const SLogo = styled.div`
	background: #fff;
	text-align: center;
`;

const SPadding = styled.div`
	padding: 0 20px;
`;

const SHeading = styled.div`
	font-size: 25px;
	font-weight: bold;
`;

type Props = {};

const Header: React.FunctionComponent<Props> = () => {
	return (
		<SHeader>
			<Container fluid={true}>
				<Row noGutters={true}>
					<Col md={1}>
						<SLogo>
							<img src={Logo} width={45} />
						</SLogo>
					</Col>
					<Col>
						<SPadding>
							<SHeading>Monet Wallet</SHeading>
						</SPadding>
					</Col>
				</Row>
			</Container>
		</SHeader>
	);
};

export default Header;
