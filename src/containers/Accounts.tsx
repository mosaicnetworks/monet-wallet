import React, { useEffect } from 'react';

import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import { Currency } from 'evm-lite-utils';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Zoom from 'react-reveal/Slide';

import Avatar from '../components/Avatar';
import Await from '../components/Await';
import Header from '../components/Header';
import Loader from '../components/Loader';
import NewAccount from '../components/NewAccount';

import { SSection, SStatistic } from '../components/styles';

import { listAccounts } from '../modules/accounts';
import {
	selectAccounts,
	selectConfig
	// selectListAccountLoading
} from '../selectors';
import { capitalize, commaSeperate, parseBalance } from '../utils';

const SAccounts = styled(SSection)`
	transition: height 1s cubic-bezier(1, 0, 0, 1);
	border-bottom: var(--border);
	z-index: 100;
	padding-bottom: 10px !important;
`;

const SAvatar = styled.div`
	transition: opacity 0.4s ease;
	opacity: 0.8;
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
	const config = useSelector(selectConfig);
	const loading = false; // useSelector(selectListAccountLoading);

	const refresh = () => dispatch(listAccounts(true));

	let totalBalance = new Currency(0);
	accounts.map(account => {
		totalBalance = totalBalance.plus(account.balance);
	});

	useEffect(() => {
		refresh();
	}, [config]);

	useEffect(() => {
		ReactTooltip.rebuild();
		return () => ReactTooltip.rebuild();
	}, [accounts]);

	// polling for accounts
	let poller: any;
	useEffect(() => {
		// poller = setInterval(() => {
		// 	refresh();
		// }, 5000);

		return () => {
			clearInterval(poller);
		};
	}, []);

	return (
		<>
			<Header title={'All Accounts'}></Header>
			<SStatistic className="">
				<Container>
					<Row className="align-items-center">
						<Col className="text-center" md={6}>
							<h3>
								<Await
									await={loading}
									fallback={<Loader loading={loading} />}
								>
									<img
										src={
											'https://monet.network/app/images/products/tenom.svg'
										}
										width={35}
										style={{ marginRight: '15px' }}
									/>
									{commaSeperate(
										parseBalance(totalBalance).slice(0, -1)
									)}
								</Await>
							</h3>
							<div>Total Balance</div>
						</Col>
						<Col className="text-center">
							<h3>
								<Await
									await={loading}
									fallback={<Loader loading={loading} />}
								>
									{accounts.length}
								</Await>
							</h3>
							<div>Accounts</div>
						</Col>
					</Row>
				</Container>
			</SStatistic>
			<SAccounts className="">
				<Zoom left={true}>
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
