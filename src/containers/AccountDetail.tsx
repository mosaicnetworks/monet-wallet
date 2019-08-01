import React from 'react';

import Utils from 'evm-lite-utils';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { config, Spring } from 'react-spring/renderprops';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { MonikerBaseAccount } from 'evm-lite-keystore';

import { Store } from '../store';
import { get as getAccount, AccountsState } from '../modules/accounts';

import Banner from '../components/Banner';
import Avatar from '../components/Avatar';
import SJumbo from '../components/Jumbo';
import FloatingButton from '../components/FloatingButton';
import LoadingButton from '../components/LoadingButton';
import AccountUnlock from '../components/AccountUnlock';
import AccountTransfer from '../components/AccountTransfer';

const SAddress = styled.span`
	font-family: 'Cousine', monospace !important;
`;

const SAvatarCustom = styled(Avatar)`
	margin-right: 0px !important;
	border-radius: 100px;
`;

interface RouterProps {
	address: string;
}

interface Props extends RouteComponentProps<RouterProps> {}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const AccountDetail: React.FunctionComponent<Props> = props => {
	const dispatch = useDispatch();

	const get = () =>
		dispatch(getAccount(Utils.cleanAddress(props.match.params.address)));

	// temp fix need to update this later with reselctjs
	const accounts = useSelector<Store, AccountsState>(store => store.accounts);
	const account = useSelector<Store, MonikerBaseAccount>(
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

	const unlocked =
		(accounts.unlocked &&
			Utils.cleanAddress(accounts.unlocked.address) ===
				Utils.cleanAddress(account.address)) ||
		false;

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
					{p => (
						<Header style={p} as="h2" floated="left">
							<SAvatarCustom address={account.address} />
							<Header.Content>
								{capitalize(account.moniker || '')}
								<Header.Subheader>
									<SAddress>
										{Utils.cleanAddress(
											props.match.params.address
										)}
									</SAddress>
								</Header.Subheader>
							</Header.Content>
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
			</SJumbo>
			<Banner color={'blue'}>Last updated a few seconds ago.</Banner>
			<AccountTransfer unlocked={unlocked} />
			<AccountUnlock bottomOffset={105} account={account} />
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
