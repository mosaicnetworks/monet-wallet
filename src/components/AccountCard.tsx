import React from 'react';

import utils from 'evm-lite-utils';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { config, Transition } from 'react-spring/renderprops';
import { Card, Label } from 'semantic-ui-react';

import { IMonikerEVMAccount } from '../modules/accounts';

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
	account: IMonikerEVMAccount;
	unlocked: boolean;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const Account: React.FunctionComponent<Props> = props => {
	let balance = props.account.balance.format('T');
	const unit = balance.slice(-1);

	const b = balance.slice(0, -1);
	const l = b.split('.');

	if (l[1]) {
		l[1] = l[1].slice(0, 4);
	}

	balance = l.join('.');

	balance += unit;

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
						<Label.Detail>{balance}</Label.Detail>
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
