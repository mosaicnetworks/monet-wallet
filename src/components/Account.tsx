import * as React from 'react';

import styled from 'styled-components';
import Utils from 'evm-lite-utils';

import { Card, Label } from 'semantic-ui-react';

import { BaseAccount } from 'evm-lite-core';

const Address = styled.span`
	word-wrap: break-word !important;
	text-transform: uppercase !important;
	font-weight: 300 !important;
`;

interface OwnProps {
	account: BaseAccount;
}

type LocalProps = OwnProps;

class Account extends React.Component<LocalProps, any> {
	public state = {
		showTxHistory: true
	};

	public onTXHistoryClick = () => {
		this.setState({ showTxHistory: !this.state.showTxHistory });
	};

	public render() {
		const { account } = this.props;

		return (
			<Card>
				<Card.Content>
					<Card.Header>
						<Address>{Utils.cleanAddress(account.address)}</Address>
					</Card.Header>
				</Card.Content>
				<Card.Content extra={true}>
					<div className="ui small two buttons">
						<Label color="green" basic={false}>
							Balance
							<Label.Detail>
								{account.balance.toString()}
							</Label.Detail>
						</Label>
						<Label basic={false}>
							Nonce
							<Label.Detail>{account.nonce}</Label.Detail>
						</Label>
					</div>
				</Card.Content>
			</Card>
		);
	}
}

export default Account;
