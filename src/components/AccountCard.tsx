import React from 'react';

import utils from 'evm-lite-utils';
import styled from 'styled-components';

import { IMonikerBaseAccount } from 'evm-lite-keystore';
import { Link } from 'react-router-dom';
import { config, Transition } from 'react-spring/renderprops';
import { Card, Label } from 'semantic-ui-react';

import Avatar from './Avatar';

const SMoniker = styled.span`
	word-wrap: break-word !important;
	/* text-transform: uppercase !important; */
	font-weight: 400 !important;
`;

const SAddress = styled.span`
	font-family: 'Cousine', monospace !important;
`;

interface Props {
	account: IMonikerBaseAccount;
	unlocked: boolean;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const Account: React.FunctionComponent<Props> = props => {
	return (
		<Card>
			<Card.Content>
				<Avatar
					size="mini"
					float="right"
					address={props.account.address}
				/>
				<Card.Header>
					<Link to={`/account/${props.account.address}`}>
						<SMoniker>{capitalize(props.account.moniker)}</SMoniker>
					</Link>
				</Card.Header>
				<Card.Meta>
					<SAddress>
						{utils.cleanAddress(props.account.address)}
					</SAddress>
				</Card.Meta>
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
					<Label color="orange" basic={false}>
						Balance
						<Label.Detail>
							{typeof props.account.balance === 'object'
								? props.account.balance.toNumber()
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
