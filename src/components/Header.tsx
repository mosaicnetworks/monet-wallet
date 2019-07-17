import React from 'react';

import styled from 'styled-components';

import { NavLink as Link } from 'react-router-dom';
import { Container, Icon, Image } from 'semantic-ui-react';

import MONET_LOGO from '../assets/monet_logo.png';

const WalletHeader = styled.div`
	/* position: fixed; */
	/* top: 0; */
	background: rgba(255, 255, 255, 0.95);
	height: 70px;
	line-height: 70px !important;
	color: #333 !important;
	z-index: 2000;
	box-shadow: 0 4px 6px -10px #f1f1f1 !important;
	width: 100% !important;
`;

const Logo = styled.div`
	font-weight: 300 !important;
	letter-spacing: 1px;
	font-size: 25px;
	margin-left: 10px;
	float: left;
	margin-top: 15px;
	text-transform: uppercase;

	& a {
		color: #333 !important;
	}
`;

const HeaderLinks = styled.div`
	margin-left: 30px;
	float: right;

	& li {
		list-style: none;
		display: inline-block;
	}

	& li a {
		display: inline-block;
		padding: 0 20px;
		color: #555 !important;
	}

	& li a:hover {
		background: #fcfcfc !important;
		color: black !important;
		-webkit-transition: all 600ms cubic-bezier(0.23, 1, 0.32, 1) !important;
		transition: all 600ms cubic-bezier(0.23, 1, 0.32, 1) !important;
	}

	& .ui.label {
		padding: 10px;
	}
`;

const HeaderLink = styled.li`
	list-style: none;
	display: inline-block;

	& a {
		display: inline-block;
		padding: 0 20px;
		color: #555 !important;
	}

	& a:hover {
		background: #fcfcfc !important;
		color: black !important;
		-webkit-transition: all 600ms cubic-bezier(0.23, 1, 0.32, 1) !important;
		transition: all 600ms cubic-bezier(0.23, 1, 0.32, 1) !important;
	}

	&.search {
		margin-right: 20px !important;
	}

	&.search input {
		width: 300px !important;
	}
`;

const Spacer = styled.div`
	/* margin-bottom: 76px; */
`;

interface OwnProps {
	empty?: null;
}

class Header extends React.Component<OwnProps, {}> {
	public render() {
		return (
			<Container fluid={true}>
				<WalletHeader>
					<Logo>
						<Link to="/">
							<Image src={MONET_LOGO} width={40} />
						</Link>
					</Logo>
					<HeaderLinks>
						<HeaderLink>
							<Link
								exact={true}
								activeClassName="is-active"
								to="/"
							>
								<Icon
									size={'large'}
									color={'black'}
									name="bars"
								/>
							</Link>
						</HeaderLink>
						<HeaderLink>
							<Link
								exact={true}
								activeClassName="is-active"
								to="/poa"
							>
								<Icon
									size={'large'}
									color={'black'}
									name="connectdevelop"
								/>
							</Link>
						</HeaderLink>
						<HeaderLink>
							<Link
								exact={true}
								activeClassName="is-active"
								to="/config"
							>
								<Icon
									size={'large'}
									color={'black'}
									name="cog"
								/>
							</Link>
						</HeaderLink>
					</HeaderLinks>
				</WalletHeader>
				<Spacer />
			</Container>
		);
	}
}

export default Header;
