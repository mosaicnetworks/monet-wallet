import React from 'react';

import styled from 'styled-components';

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import Avatar from '../components/Avatar';
import Header from '../components/Header';
import Loader from '../components/Loader';

import { listAccounts } from '../modules/accounts';
import { selectAccounts, selectListAccountLoading } from '../selectors';

const SAccounts = styled.div`
	padding: 30px !important;
`;

const SAvatar = styled.div`
	transition: opacity 0.2s cubic-bezier(1, 1, 1, 1);
	opacity: 0.9;
	display: inline-block;
	cursor: pointer;

	:hover {
		opacity: 1;
	}
`;

type Props = {};

const Accounts: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const accounts = useSelector(selectAccounts);
	const loading = useSelector(selectListAccountLoading);

	const refresh = () => dispatch(listAccounts());

	return (
		<>
			<Header title={'All Accounts'}>
				<Loader loading={loading} />{' '}
				<Button disabled={loading} onClick={refresh} variant="primary">
					<FontAwesomeIcon icon={faCircleNotch} />
				</Button>
			</Header>

			<SAccounts>
				<p>Select an account to view more options</p>
				{accounts.map(a => (
					<SAvatar key={a.address}>
						<Link to={`account/${a.moniker.toLowerCase()}`}>
							<Avatar address={a.address} />
						</Link>
					</SAvatar>
				))}
			</SAccounts>
		</>
	);
};

export default Accounts;
