import React, { useEffect } from 'react';

import styled from 'styled-components';

import utils from 'evm-lite-utils';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import FloatButton from '../components/FloatButton';

import { AccountsState, list } from '../modules/accounts';
import { Store } from '../store';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const SJumbotron = styled(Jumbotron)`
	box-shadow: 0 2px 20px -15px #ddd !important;
`;

const SAvatarImage = styled(Image)``;

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
				<Container>
					<Row className="align-items-center">
						{!!accounts.unlocked && (
							<Col md={1}>
								<SAvatarImage
									src={`https://s.gravatar.com/avatar/${utils.trimHex(
										accounts.unlocked.address
									)}?size=100&default=retro`}
									width={70}
								/>
							</Col>
						)}
						<Col md={6} lg={8}>
							<h3>
								{capitalize(
									accounts.unlocked
										? accounts.unlocked.moniker
										: 'Dashboard'
								)}
							</h3>

							<p>
								{accounts.unlocked
									? utils.cleanAddress(
											accounts.unlocked.address
									  )
									: 'View Statistics & Modify Existing Accounts'}
							</p>
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
				</Container>
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
