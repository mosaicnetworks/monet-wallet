import React from 'react';

import styled from 'styled-components';

import { Account } from 'evm-lite-core';
import { NavLink as Link } from 'react-router-dom';
import { Container, Icon, Image, Label } from 'semantic-ui-react';
import { config, Transition } from 'react-spring/renderprops';

import MONET_LOGO from '../assets/monet_logo.png';

const WalletHeader = styled.div`
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

interface Props {
	unlocked: Account | undefined;
	reset: any;
}

const Header: React.FunctionComponent<Props> = props => {
	let to: any;

	if (props.unlocked) {
		to = {
			pathname: `/account/${props.unlocked.address}`
		};
	}

	return (
		<Container fluid={true}>
			<WalletHeader>
				<Logo>
					<Link to="/">
						<Image src={MONET_LOGO} width={40} />
					</Link>
				</Logo>
				<HeaderLinks>
					<HeaderLink
						style={{
							marginRight: '10px'
						}}
					>
						<Transition
							items={!!props.unlocked}
							from={{ opacity: 0, marginRight: -50 }}
							enter={{ opacity: 1, marginRight: 10 }}
							leave={{ opacity: 0 }}
							config={config.wobbly}
						>
							{show =>
								show &&
								(p => (
									<Label style={p}>
										<Link to={to || ''}>
											{(props.unlocked &&
												props.unlocked.address) ||
												''}
										</Link>
										<Icon
											style={{
												cursor: 'pointer'
											}}
											name="delete"
											onClick={props.reset}
										/>
									</Label>
								))
							}
						</Transition>
					</HeaderLink>
					<HeaderLink>
						<Link exact={true} activeClassName="is-active" to="/">
							<Icon size={'large'} color={'black'} name="bars" />
						</Link>
					</HeaderLink>
					{/* <HeaderLink>
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
				</HeaderLink> */}
					<HeaderLink>
						<Link
							exact={true}
							activeClassName="is-active"
							to="/config"
						>
							<Icon size={'large'} color={'black'} name="cog" />
						</Link>
					</HeaderLink>
				</HeaderLinks>
			</WalletHeader>
		</Container>
	);
};

export default Header;
