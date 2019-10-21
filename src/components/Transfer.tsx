import React, { useState } from 'react';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Avatar from '../components/Avatar';

import { selectTransferLoading } from '../selectors';

import { transfer } from '../modules/accounts';

function isLetter(str: string) {
	return str.length === 1 && str.match(/[a-z]/i);
}

const STransfer = styled.div`
	padding-top: 10px;
`;

const Transfer: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const loading = useSelector(selectTransferLoading);

	const [to, setTo] = useState('');
	const [value, setValue] = useState('');

	const makeTransfer = () => {
		if (isLetter(value.slice(-1))) {
			dispatch(transfer(to, value));
		} else {
			dispatch(transfer(to, value + 'T'));
		}
	};

	return (
		<STransfer>
			<Form>
				<Row>
					<Col xs={1}>
						{to.length > 0 ? (
							<Avatar address={to} />
						) : (
							<h5>Transfer Coins</h5>
						)}
					</Col>
					<Col>
						<Form.Group controlId="formBasicEmail">
							<Form.Control
								onChange={(e: any) => setTo(e.target.value)}
								type="text"
								placeholder="Enter address"
							/>
							<Form.Text className="text-muted">
								The address you wish to transfer to.
							</Form.Text>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formBasicPassword">
							<Form.Control
								onChange={(e: any) => setValue(e.target.value)}
								type="value"
								placeholder="Amount"
							/>
							<Form.Text className="text-muted">
								The amount will default to Tenom if no unit is
								provided.
							</Form.Text>
						</Form.Group>
					</Col>
					<Col>
						<Button
							onClick={makeTransfer}
							variant="warning"
							type="submit"
							disabled={loading || !to.length || !value.length}
						>
							Transfer
						</Button>
					</Col>
				</Row>
			</Form>
		</STransfer>
	);
};

export default Transfer;
