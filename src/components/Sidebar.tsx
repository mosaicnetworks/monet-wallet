import React from 'react';

import styled from 'styled-components';

import { faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import LOGO from '../assets/monet.svg';

type Props = {};

const SSidebar = styled.div`
	/* width: 300px; */
	height: 100vh;
	background: url('https://dashboard.monet.network/static/media/bg.f2d96fad.svg');
	background-position-x: -1px;
	box-shadow: 0 2px 60px rgba(0, 0, 0, 0.2);
	border-right: var(--border);
	/* background: var(--blue); */
`;

const SLogo = styled.div`
	font-family: Monet;
	height: 60px;
	line-height: 60px;
	border-bottom: 1px solid #1e3383;
	font-size: 18px;
	letter-spacing: 3px;
	color: var(--blue);

	padding: 0 20px;

	img {
		margin-right: 7px;
	}
`;

const SNav = styled.div``;

const SLinks = styled.div`
	margin-bottom: 50px;

	h3 {
		font-size: 14px;
		text-transform: uppercase;
		letter-spacing: 0px;
		color: #ccc;
		margin-left: 20px;
		font-weight: 700;
		margin-bottom: 15px;
	}

	ul {
		text-indent: 0 !important;
		padding: 0 !important;
		margin: 0 !important;
	}

	li {
		margin: 0 !important;
		font-family: 'Titillium Web', sans-serif;
		list-style: none;
		font-size: 16px;
		border-bottom: 1px solid #1e3383;
	}

	li:first-child {
		border-top: 1px solid #1e3383;
	}

	a {
		svg {
			margin-right: 13px;
		}

		transition: background 0.1s cubic-bezier(1, 1, 1, 1);
		color: #eee;
		font-weight: 600;
		display: block !important;
		padding: 12px 30px !important;
	}

	a:hover {
		background: var(--blue);
		color: white !important;
		text-decoration: none;
	}
`;

const Sidebar: React.FunctionComponent<Props> = () => {
	return (
		<SSidebar className="sticky-top">
			<SLogo>
				<img src={LOGO} width={160} />
			</SLogo>

			<SNav>
				<br />
				<br />
				<SLinks>
					<h3>Actions</h3>
					<ul>
						<li>
							<Link to={'/'}>
								<FontAwesomeIcon icon={faUser} />
								Accounts
							</Link>
						</li>
					</ul>
				</SLinks>

				<SLinks>
					<ul>
						<li>
							<Link to={'/settings'}>
								<FontAwesomeIcon icon={faCog} />
								Settings
							</Link>
						</li>
					</ul>
				</SLinks>
			</SNav>
		</SSidebar>
	);
};

export default Sidebar;
