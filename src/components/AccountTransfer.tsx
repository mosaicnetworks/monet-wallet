import React, { useState } from 'react';

import styled from 'styled-components';

import { Header, Form } from 'semantic-ui-react';

const SPaddedContent = styled.div`
	margin-top: 20px;
	padding: 0 20px !important;
`;

const SContent = styled.div`
	margin-bottom: 20px;
`;

const SRed = styled.span`
	color: red !important;
`;

interface Props {
	unlocked: boolean;
}

const AccountTransfer: React.FunctionComponent<Props> = props => {
	const [to, setTo] = useState('');

	return (
		<SPaddedContent>
			<Header as="h3">Transfer</Header>
			<SContent>
				{props.unlocked && (
					<Form>
						<Form.Group inline={true}>
							<Form.Input
								defaultValue={to}
								style={{
									marginTop: '10px !important'
								}}
								placeholder="To Address"
								onChange={(_, { value }) => setTo(value)}
							/>
							<Form.Button color="blue" content={'Next'} />
						</Form.Group>
					</Form>
				)}
				{!props.unlocked && (
					<SRed>Unlock account to initiate transfer of funds.</SRed>
				)}
			</SContent>
		</SPaddedContent>
	);
};

export default AccountTransfer;
