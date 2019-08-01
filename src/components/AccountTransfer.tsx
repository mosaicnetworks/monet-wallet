import React, { useState } from 'react';

import styled from 'styled-components';

import { Header, Grid, Form, Message, Icon } from 'semantic-ui-react';

import Avatar from './Avatar';

const SPaddedContent = styled.div`
	margin-top: 20px;
	padding: 0 20px !important;
`;

const SContent = styled.div`
	background: #fff;
	padding: 20px;
	margin-bottom: 20px;
`;

interface Props {
	unlocked: boolean;
}

const AccountTransfer: React.FunctionComponent<Props> = props => {
	const [to, setTo] = useState('');

	return (
		<SPaddedContent>
			<Header as="h3">Transfer</Header>
			{!props.unlocked && (
				<Message icon={true} negative={true}>
					<Icon name="lock" />
					<Message.Content>
						<Message.Header>Unlock Account</Message.Header>
						You cannot make a transfer from this account unless
						unlocked using the button on the bottom right.
					</Message.Content>
				</Message>
			)}

			<Grid columns="equal">
				<Grid.Column>
					<SContent>
						<Form>
							<Grid columns="equal">
								<Grid.Column width={2}>
									{to && <Avatar address={to} />}
								</Grid.Column>
								<Grid.Column>
									<Form.Input
										style={{
											marginTop: '10px !important'
										}}
										placeholder="To Address"
										onChange={(_, { value }) =>
											setTo(value)
										}
									/>
									<Form.Button
										color="blue"
										content={'Next'}
									/>
								</Grid.Column>
							</Grid>
						</Form>
					</SContent>
				</Grid.Column>
				<Grid.Column />
			</Grid>
		</SPaddedContent>
	);
};

export default AccountTransfer;
