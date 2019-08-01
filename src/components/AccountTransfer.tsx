import React, { useState } from 'react';

import styled from 'styled-components';

import { Header, Form, Grid, Icon } from 'semantic-ui-react';

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
	const [value, setValue] = useState(0);

	// show states
	const [show, setShow] = useState({
		second: false,
		third: false
	});
	return (
		<SPaddedContent>
			<Header as="h3">Transfer</Header>
			<SContent>
				{props.unlocked && (
					<Form>
						<Grid columns="equal">
							<Grid.Column>
								<Form.Group inline={true}>
									<Form.Input
										width={'16'}
										fluid={true}
										defaultValue={to}
										placeholder="To Address"
										onChange={(_, { value }) =>
											setTo(value)
										}
									/>
									<Form.Button
										color="blue"
										labelPosition="right"
										icon={true}
									>
										Next
										<Icon name="arrow right" />
									</Form.Button>
								</Form.Group>
							</Grid.Column>
							<Grid.Column>
								<Form.Group inline={true}>
									<Form.Input
										width={'16'}
										defaultValue={value}
										type="number"
										placeholder="Value"
										onChange={(_, { value: v }) =>
											setValue(Number(v))
										}
									/>
									<Form.Button
										color="blue"
										icon={true}
										labelPosition="right"
									>
										Next
										<Icon name="arrow right" />
									</Form.Button>
								</Form.Group>
							</Grid.Column>
							<Grid.Column>
								<Form.Group inline={true}>
									<Form.Input
										width={'8'}
										defaultValue={value}
										type="number"
										placeholder="Gas"
										onChange={(_, { value: v }) =>
											setValue(Number(v))
										}
									/>
									<Form.Input
										width={'8'}
										defaultValue={value}
										type="number"
										placeholder="Gas Price"
										onChange={(_, { value: v }) =>
											setValue(Number(v))
										}
									/>
									<Form.Button color="green">
										Send
									</Form.Button>
								</Form.Group>
							</Grid.Column>
						</Grid>
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
