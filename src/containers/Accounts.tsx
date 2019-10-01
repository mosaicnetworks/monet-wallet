import React, { useEffect } from 'react';

import styled from 'styled-components';

import utils from 'evm-lite-utils';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';

import FloatButton from '../components/FloatButton';

import { AccountsState, list } from '../modules/accounts';
import { Store } from '../store';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const SJumbotron = styled(Jumbotron)`
	box-shadow: 0 2px 20px -15px #ddd !important;
`;

const SHeadingContainer = styled(Container)`
	padding: 0 5px !important;
`;

const Accounts: React.FunctionComponent<{}> = () => {
	const dispatch = useDispatch();
	const refreshAccounts = () => dispatch(list());

	const accounts = useSelector<Store, AccountsState>(store => store.accounts);
	const hasSelected = !!accounts.unlocked;

	useEffect(() => {
		refreshAccounts();
	}, []);

	return (
		<>
			<SJumbotron fluid={true}>
				<SHeadingContainer>
					<Row noGutters={true} className="align-items-center">
						<Col md={6} lg={8}>
							{accounts.unlocked ? (
								<Media>
									<img
										width={63}
										height={64}
										className="align-self-top mr-3"
										src={`https://s.gravatar.com/avatar/${utils.trimHex(
											accounts.unlocked.address
										)}?size=100&default=retro`}
										alt="Generic placeholder"
									/>
									<Media.Body>
										<h3>
											{capitalize(
												accounts.unlocked.moniker
											)}
										</h3>
										<p>
											{utils.cleanAddress(
												accounts.unlocked.address
											)}
										</p>
									</Media.Body>
								</Media>
							) : (
								<>
									<h3>{'Dashboard'}</h3>
									<p>
										{
											'View Statistics & Modify Existing Accounts'
										}
									</p>
								</>
							)}
						</Col>
						<Col>
							<h4>Balance</h4>
							<p>
								{hasSelected
									? accounts.unlocked!.balance.format('T')
									: 'Not Selected'}
							</p>
						</Col>
						<Col>
							<h4>Nonce</h4>
							<p>
								{hasSelected
									? accounts.unlocked!.nonce
									: 'Not Selected'}
							</p>
						</Col>
					</Row>
				</SHeadingContainer>
			</SJumbotron>
			<Container></Container>
			<FloatButton bottomOffset={60}>
				<Button
					onClick={refreshAccounts}
					disabled={accounts.loading.list}
					variant={'primary'}
				>
					R
				</Button>
			</FloatButton>
		</>
	);
};

export default Accounts;
