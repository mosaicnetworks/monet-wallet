import React, { useState } from 'react';

import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { Form, Grid, Header } from 'semantic-ui-react';

import { transfer } from '../modules/accounts';

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
	const dispatch = useDispatch();

	const [to, setTo] = useState('');
	const [value, setValue] = useState(0);
	const [gasPrice, setGasPrice] = useState(0);

	const send = async () => {
		const r = await dispatch(transfer(to, value, gasPrice));
		console.log(r);
	};

	return (
		<SPaddedContent>
			<Header as="h3">Transfer</Header>
			<SContent>
				{props.unlocked && (
					<Form>
						<Grid columns="equal">
							<Grid.Column>
								<Form.Group inline={true}>
									<label>To</label>
									<Form.Input
										width={'16'}
										fluid={true}
										defaultValue={to}
										placeholder="To Address"
										onChange={(_, { value }) =>
											setTo(value)
										}
									/>
								</Form.Group>
							</Grid.Column>
							<Grid.Column>
								<Form.Group inline={true}>
									<label>Amount (T)</label>
									<Form.Input
										width={'16'}
										defaultValue={value}
										type="number"
										placeholder="Value"
										onChange={(_, { value: v }) =>
											setValue(Number(v))
										}
									/>
								</Form.Group>
							</Grid.Column>
							<Grid.Column>
								<Form.Group inline={true}>
									<label>Gas Price</label>
									<Form.Input
										width={'8'}
										defaultValue={gasPrice}
										type="number"
										placeholder="Gas Price"
										onChange={(_, { value: v }) =>
											setGasPrice(Number(v))
										}
									/>
									<Form.Button onClick={send} color="green">
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
