import React from 'react';
import styled from 'styled-components';

import Utils from 'evm-lite-utils';

import { useDispatch, useSelector } from 'react-redux';
import { config, Spring } from 'react-spring/renderprops';
import { Card, Header } from 'semantic-ui-react';

import { AccountsState, create, list } from '../modules/accounts';

import { Store } from '../store';

import AccountCard from '../components/AccountCard';
import AccountCreate from '../components/AccountCreate';
import Banner from '../components/Banner';
import FloatingButton from '../components/FloatingButton';
import SJumbo from '../components/Jumbo';
import LoadingButton from '../components/LoadingButton';

const SAccountsContainer = styled.div`
	padding: 5px 0;
`;

const Accounts: React.FunctionComponent<{}> = () => {
	const dispatch = useDispatch();

	const createAccount = (moniker: string, password: string) =>
		dispatch(create(moniker, password)) as any;
	const refreshAccounts = () => dispatch(list());

	const accounts = useSelector<Store, AccountsState>(store => store.accounts);

	return (
		<React.Fragment>
			<SJumbo>
				<Spring
					from={{
						marginLeft: -50,
						opacity: 0
					}}
					to={{
						marginLeft: 0,
						opacity: 1
					}}
					config={config.wobbly}
				>
					{props => (
						<Header style={props} as="h2" floated="left">
							Accounts
							<Header.Subheader>
								Create new and manage existing accounts
							</Header.Subheader>
						</Header>
					)}
				</Spring>
				<Header as="h2" floated="right">
					Accounts
					<Header.Subheader>{accounts.all.length}</Header.Subheader>
				</Header>
				<Header as="h2" floated="right">
					Total Balance
					<Header.Subheader>Lots!</Header.Subheader>
				</Header>
			</SJumbo>
			<Banner color="blue">
				All accounts listed here are read in locally from your keystore.
			</Banner>
			<SAccountsContainer>
				<Card.Group centered={true}>
					{accounts.all.map(account => (
						<AccountCard
							unlocked={
								(accounts.unlocked &&
									Utils.cleanAddress(
										accounts.unlocked.address
									) ===
										Utils.cleanAddress(account.address)) ||
								false
							}
							key={account.address}
							account={account}
						/>
					))}
				</Card.Group>
			</SAccountsContainer>
			<AccountCreate
				bottomOffset={105}
				accounts={accounts}
				create={createAccount}
			/>
			<FloatingButton bottomOffset={60}>
				<LoadingButton
					isLoading={accounts.loading.list}
					onClickHandler={refreshAccounts}
				/>
			</FloatingButton>
		</React.Fragment>
	);
};

export default Accounts;
