import React, { useState } from 'react';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';

import Avatar from '../components/Avatar';

import { selectTransferLoading, selectAccountError } from '../selectors';

import { transfer } from '../modules/accounts';
import Loader from './Loader';

function isLetter(str: string) {
	return str.length === 1 && str.match(/[a-z]/i);
}

const STransfer = styled.div`
	padding-top: 10px;
`;

const SLoader = styled(Loader)`
	margin-left: 10px !important;
`;

const Transfer: React.FC<{}> = () => {
	const dispatch = useDispatch();

	const loading = useSelector(selectTransferLoading);
	const error = useSelector(selectAccountError);

	const [to, setTo] = useState('');
	const [value, setValue] = useState('');

	const makeTransfer = async () => {
		if (isLetter(value.slice(-1))) {
			await dispatch(transfer(to, value));
		} else {
			await dispatch(transfer(to, value + 'T'));
		}

		if (!error) {
			setTo('');
			setValue('');
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
								value={to}
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
							<InputGroup>
								<Form.Control
									onChange={(e: any) =>
										setValue(e.target.value)
									}
									value={value}
									placeholder="Amount"
								/>
								<InputGroup.Append>
									<InputGroup.Text id="inputGroupPrepend">
										Tenom
									</InputGroup.Text>
								</InputGroup.Append>
							</InputGroup>

							<Form.Text className="text-muted">
								The amount will default to Tenom if no{' '}
								<a
									target="_blank"
									href="https://evm-lite-js.readthedocs.io/en/latest/utils.html"
								>
									unit
								</a>{' '}
								is provided.
							</Form.Text>
						</Form.Group>
					</Col>
					<Col xs={1}>
						<Button
							onClick={makeTransfer}
							variant="warning"
							type="submit"
							disabled={loading || !to.length || !value.length}
						>
							Send
						</Button>
					</Col>
					<Col xs={1}>
						<SLoader loading={loading} />
					</Col>
				</Row>
			</Form>
		</STransfer>
	);
};

export default Transfer;
