import React from 'react';
import styled from 'styled-components';

import { InjectedAlertProp, withAlert } from 'react-alert';
import { connect } from 'react-redux';
import { config, Spring } from 'react-spring/renderprops';
import { Header, Card } from 'semantic-ui-react';

import { AccountsState, list, create } from '../modules/accounts';

import { Store } from '../store';

import Banner from '../components/Banner';
import Jumbo from '../components/Jumbo';
import Account from '../components/Account';
import FloatingButton from '../components/FloatingButton';
import LoadingButton from '../components/LoadingButton';
import AccountCreate from '../components/AccountCreate';

const AccountsContainer = styled.div`
	padding: 5px 10px;
`;

interface AlertProps {
	alert: InjectedAlertProp;
}

interface StoreProps {
	accounts: AccountsState;
}

interface DispatchProps {
	handleRefreshAccount: () => void;
	handleCreateAccount: (password: string) => void;
}

interface OwnProps {}

interface State {
	totalBalance: number;
}

type LocalProps = OwnProps & StoreProps & DispatchProps & AlertProps;

class Accounts extends React.Component<LocalProps, State> {
	public state = {
		totalBalance: 123523432
	};

	public handleRefreshAccounts = () => {
		this.props.handleRefreshAccount();
	};

	public render() {
		const { accounts } = this.props;

		return (
			<React.Fragment>
				<Jumbo>
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
								Account Settings
								<Header.Subheader>
									Create new and manage existing accounts
								</Header.Subheader>
							</Header>
						)}
					</Spring>
					<Header as="h2" floated="right">
						Accounts
						<Header.Subheader>
							{accounts.all.length}
						</Header.Subheader>
					</Header>
					<Header as="h2" floated="right">
						Total Balance
						<Header.Subheader>Lots!</Header.Subheader>
					</Header>
				</Jumbo>
				<Banner color="purple">
					All accounts listed here are read in locally from your
					keystore.
				</Banner>
				<AccountsContainer>
					<Card.Group centered={true}>
						{accounts.all.map(account => (
							<Account key={account.address} account={account} />
						))}
					</Card.Group>
				</AccountsContainer>
				<AccountCreate
					bottomOffset={105}
					accounts={accounts}
					create={this.props.handleCreateAccount}
				/>
				<FloatingButton bottomOffset={60}>
					<LoadingButton
						isLoading={accounts.loading.list}
						onClickHandler={this.handleRefreshAccounts}
					/>
				</FloatingButton>
			</React.Fragment>
		);
	}
}

const mapStoreToProps = (store: Store): StoreProps => ({
	accounts: store.accounts
});

const mapsDispatchToProps = (dispatch: any): DispatchProps => ({
	handleRefreshAccount: () => dispatch(list()),
	handleCreateAccount: password => dispatch(create(password))
});

export default connect<StoreProps, DispatchProps, OwnProps, Store>(
	mapStoreToProps,
	mapsDispatchToProps
)(withAlert<LocalProps>(Accounts));
