import React from 'react';

import Utils from 'evm-lite-utils';

import { BaseAccount } from 'evm-lite-core';
import { useSelector, useDispatch } from 'react-redux';
import { config, Spring } from 'react-spring/renderprops';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

import { Store } from '../store';
import { get as getAccount, AccountsState } from '../modules/accounts';

import Banner from '../components/Banner';
import Jumbo from '../components/Jumbo';
import FloatingButton from '../components/FloatingButton';
import LoadingButton from '../components/LoadingButton';
import AccountUnlock from '../components/AccountUnlock';

interface RouterProps {
	address: string;
}
interface Props extends RouteComponentProps<RouterProps> {}

const AccountDetail: React.FunctionComponent<Props> = props => {
	const dispatch = useDispatch();

	const get = () =>
		dispatch(getAccount(Utils.cleanAddress(props.match.params.address)));
	// temp fix need to update this later.
	const accounts = useSelector<Store, AccountsState>(store => store.accounts);
	const account = useSelector<Store, BaseAccount>(
		store =>
			store.accounts.all.filter(
				acc =>
					Utils.cleanAddress(acc.address) ===
					Utils.cleanAddress(props.match.params.address)
			)[0] || {
				address: Utils.cleanAddress(props.match.params.address),
				balance: 0,
				nonce: 0,
				bytecode: ''
			}
	);

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
					{p => (
						<Header style={p} as="h2" floated="left">
							{Utils.cleanAddress(props.match.params.address)}
							<Header.Subheader>
								Updated few seconds ago
							</Header.Subheader>
						</Header>
					)}
				</Spring>
				<Header as="h2" floated="right">
					Nonce
					<Header.Subheader>{account.nonce}</Header.Subheader>
				</Header>
				<Header as="h2" floated="right">
					Balance
					<Header.Subheader>
						{typeof account.balance === 'object'
							? account.balance.toString(10)
							: account.balance}
					</Header.Subheader>
				</Header>
			</Jumbo>
			<Banner color="purple">
				Some information abount accounts go here.
			</Banner>
			<AccountUnlock
				bottomOffset={105}
				address={props.match.params.address}
			/>
			<FloatingButton bottomOffset={60}>
				<LoadingButton
					isLoading={accounts.loading.get}
					onClickHandler={get}
				/>
			</FloatingButton>
		</React.Fragment>
	);
};

export default AccountDetail;
