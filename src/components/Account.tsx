import React from 'react';

import styled from 'styled-components';
import Utils from 'evm-lite-utils';

import { BaseAccount } from 'evm-lite-core';
import { Card, Label } from 'semantic-ui-react';

const Address = styled.span`
	word-wrap: break-word !important;
	text-transform: uppercase !important;
	font-weight: 300 !important;
`;

interface Props {
	account: BaseAccount;
}

const Account: React.FunctionComponent<Props> = props => {
	return (
		<Card>
			<Card.Content>
				<Card.Header>
					<Address>
						{Utils.cleanAddress(props.account.address)}
					</Address>
				</Card.Header>
			</Card.Content>
			<Card.Content extra={true}>
				<div className="ui small two buttons">
					<Label color="green" basic={false}>
						Balance
						<Label.Detail>
							{typeof props.account.balance === 'object'
								? props.account.balance.toString(10)
								: props.account.balance}
						</Label.Detail>
					</Label>
					<Label basic={false}>
						Nonce
						<Label.Detail>{props.account.nonce}</Label.Detail>
					</Label>
				</div>
			</Card.Content>
		</Card>
	);
};

export default Account;
