import React, { useState } from 'react';

import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Loader from './Loader';

import { MonikerEVMAccount } from 'src/monet';

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
	const [passphrase, setPassphrase] = useState('');
	const [newPassphrase, setNewPassphrase] = useState('');
	const [verifyNewPassword, setVerifyNewPassphrase] = useState('');

	return (
		<STransfer>
			<Form>
				<Form.Row className="align-items-center">
					<Col>
						<h5>Change Password</h5>
						<Form.Group controlId="formBasicEmail">
							<Form.Control
								onChange={(e: any) =>
									setPassphrase(e.target.value)
								}
								value={passphrase}
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
									type="password"
									onChange={(e: any) =>
										setNewPassphrase(e.target.value)
									}
									value={newPassphrase}
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
									setVerifyNewPassphrase(e.target.value)
								}
								value={verifyNewPassword}
								type="password"
								placeholder="Confirm New Passphrase"
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Save
						</Button>{' '}
						<Loader loading={false} />
					</Col>
					<Col></Col>
				</Form.Row>
			</Form>
		</STransfer>
	);
};

export default Update;
