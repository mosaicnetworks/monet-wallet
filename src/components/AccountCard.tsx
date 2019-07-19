import React from 'react';

import styled from 'styled-components';
import Utils from 'evm-lite-utils';

import { config, Transition } from 'react-spring/renderprops';
import { Link } from 'react-router-dom';
import { BaseAccount } from 'evm-lite-core';
import { Card, Label, Image } from 'semantic-ui-react';

const Address = styled.span`
	word-wrap: break-word !important;
	text-transform: uppercase !important;
	font-weight: 300 !important;
`;

const Avatar = styled(Image)`
	border-radius: 100px;
`;

interface Props {
	account: BaseAccount;
	unlocked: boolean;
}

const Account: React.FunctionComponent<Props> = props => {
	return (
		<Card>
			<Card.Content>
				<Avatar
					floated="right"
					size="mini"
					src={`https://s.gravatar.com/avatar/${Utils.trimHex(
						props.account.address
					)}?size=100&default=retro`}
				/>
				<Card.Header>
					<Link to={`/account/${props.account.address}`}>
						<Address>
							{Utils.cleanAddress(props.account.address)}
						</Address>
					</Link>
				</Card.Header>
			</Card.Content>
			<Card.Content extra={true}>
				<div className="ui small two buttons">
					<Transition
						items={props.unlocked}
						from={{ opacity: 0 }}
						enter={{ opacity: 1 }}
						leave={{ opacity: 0 }}
						config={config.wobbly}
					>
						{show =>
							show &&
							(props => (
								<Label
									style={props}
									icon="unlock"
									color={'orange'}
									basic={false}
								/>
							))
						}
					</Transition>
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
