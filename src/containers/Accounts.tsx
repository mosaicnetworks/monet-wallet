import React, { useEffect } from 'react';

import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

// import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Currency } from 'evm-lite-utils';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Zoom from 'react-reveal/Flip';

import Avatar from '../components/Avatar';
import Header from '../components/Header';
import Loader from '../components/Loader';
import NewAccount from '../components/NewAccount';

import { listAccounts } from '../modules/accounts';
import { selectAccounts, selectListAccountLoading } from '../selectors';
import { capitalize, parseBalance } from '../utils';

const SAccounts = styled.div`
	transition: height 1s cubic-bezier(1, 0, 0, 1);
	padding: 30px !important;
	border-bottom: var(--border);
	z-index: 100;
	padding-bottom: 10px !important;
`;

const SStatistic = styled.div`
	/* background: #fff; */
	/* box-shadow: 2px 0px 40px rgba(0, 0, 0, 0.05); */
	width: 100%;
	border-bottom: var(--border);
	/* background: var(--blue); */
	/* color: white; */
	font-weight: 600 !important;

	h3 {
		/* color: var(--blue) !important; */
		font-size: 35px;
	}

	.col {
		padding: 20px 0;
		border-right: var(--border);
	}
`;

const SAvatar = styled.div`
	transition: opacity 0.2s cubic-bezier(1, 1, 1, 1);
	opacity: 0.9;
	cursor: pointer;
	display: inline-block;
	margin-bottom: 25px;

	:hover {
		opacity: 1;
	}
`;

type Props = {};

const Accounts: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const accounts = useSelector(selectAccounts);
	const loading = useSelector(selectListAccountLoading);

	const refresh = () => dispatch(listAccounts(true));

	let totalBalance = new Currency(0);
	accounts.map(account => {
		totalBalance = totalBalance.plus(account.balance);
	});

	useEffect(() => {
		ReactTooltip.rebuild();

		return () => ReactTooltip.rebuild();
	}, [accounts]);

	return (
		<>
			<Header title={'All Accounts'}>
				<Loader loading={loading} />{' '}
				<Button disabled={loading} onClick={refresh} variant="primary">
					Refresh
				</Button>
			</Header>
			<SStatistic className="">
				<Container>
					<Row className="align-items-center">
						<Col className="text-center">
							<h3>{parseBalance(totalBalance)}</h3>
							<div>Total Balance</div>
						</Col>
						<Col className="text-center">
							<h3>{accounts.length}</h3>
							<div>Accounts</div>
						</Col>
						{/* <Col className="text-center">
							<h3>???</h3>
							<div>???</div>
						</Col> */}
					</Row>
				</Container>
			</SStatistic>
			<SAccounts className="">
				<p>Select an account view more options</p>

				<Zoom right cascade>
					<div>
						{accounts.map(a => (
							<SAvatar
								data-tip={`${capitalize(a.moniker)}`}
								key={a.address}
							>
								<Link to={`account/${a.moniker.toLowerCase()}`}>
									<Avatar address={a.address} size={50} />
								</Link>
							</SAvatar>
						))}
					</div>
				</Zoom>
			</SAccounts>

			<NewAccount />
		</>
	);
};

export default Accounts;
