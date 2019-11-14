import React, { useState } from 'react';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Loader from './Loader';

import { MonikerEVMAccount } from 'src/monet';
import { transfer } from '../modules/accounts';
import { selectTransferLoading } from '../selectors';
import { isLetter } from '../utils';

const STransfer = styled.div`
	padding-top: 20px;

	td {
		padding-right: 10px;
	}

	h5 {
		margin-bottom: 25px !important;
	}
`;

type Props = {
	account: MonikerEVMAccount;
	getAccount: () => any;
};

const Update: React.FC<Props> = props => {
	const dispatch = useDispatch();

	// const error = useSelector(selectAccountError);
	const loading = useSelector(selectTransferLoading);

	const [success, setSuccess] = useState('');
	const [to, setTo] = useState('');
	const [value, setValue] = useState('');
	const [passphrase, setPassphrase] = useState('');

	console.log(success);

	const makeTransfer = async () => {
		if (isLetter(value.slice(-1))) {
			await dispatch(
				transfer(props.account.moniker, passphrase, to, value)
			);
		} else {
			await dispatch(
				transfer(props.account.moniker, passphrase, to, value + 'T')
			);
		}

		setTo('');
		setValue('');

		setSuccess('Transfer successful');
		await props.getAccount();

		setTimeout(() => {
			setSuccess('');
		}, 3000);
	};

	return (
		<STransfer>
			<Form>
				<Form.Row className="align-items-center">
					<Col>
						<h5>Change Password</h5>
						<Form.Group controlId="formBasicEmail">
							<Form.Control
								onChange={(e: any) => setTo(e.target.value)}
								value={to}
								type="text"
								placeholder="Current Passphrase"
							/>
							<Form.Text className="text-muted">
								The address you wish to transfer to.
							</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<InputGroup>
								<Form.Control
									onChange={(e: any) =>
										setValue(e.target.value)
									}
									value={value}
									placeholder="New Passphrase"
								/>
							</InputGroup>

							<Form.Text className="text-muted">
								Enter an amount in tenom
							</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Control
								onChange={(e: any) =>
									setPassphrase(e.target.value)
								}
								value={passphrase}
								type="password"
								placeholder="Confirm New Passphrase"
							/>
						</Form.Group>
						<Button
							onClick={makeTransfer}
							variant="primary"
							type="submit"
							disabled={loading || !to.length || !value.length}
						>
							Save
						</Button>{' '}
						<Loader loading={loading} />
					</Col>
					<Col></Col>
				</Form.Row>
			</Form>
		</STransfer>
	);
};

export default Update;
