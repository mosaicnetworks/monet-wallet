import React, { useState } from 'react';

import styled from 'styled-components';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Error from './Error';
import Loader from './Loader';

import { updateAccount } from '../modules/accounts';
import { MonikerEVMAccount } from '../monet';
import { selectAccountError, selectAccountUpdateLoading } from '../selectors';

const STransfer = styled.div`
	padding-top: 20px;

	td {
		padding-right: 10px;
	}

	h5 {
		margin-bottom: 25px !important;

		svg {
			margin-right: 5px;
		}
	}
`;

const SConfirm = styled.div`
	padding-left: 50px;
`;

type Props = {
	account: MonikerEVMAccount;
	getAccount: () => any;
};

const Update: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const error = useSelector(selectAccountError);
	const loading = useSelector(selectAccountUpdateLoading);

	const [localError, setLocalError] = useState('');
	const [success, setSuccess] = useState('');
	const [passphrase, setPassphrase] = useState('');
	const [newPassphrase, setNewPassphrase] = useState('');
	const [verifyNewPassphrase, setVerifyNewPassphrase] = useState('');

	const updatePassword = async () => {
		setLocalError('');

		if (!passphrase || !newPassphrase || !verifyNewPassphrase) {
			setLocalError('All fields must be filled');
			return;
		}

		if (newPassphrase !== verifyNewPassphrase) {
			setLocalError('New passphrase does not match');
			return;
		}

		if (passphrase !== newPassphrase) {
			setLocalError('New passphrase is the same as old');
			return;
		}

		const success: any = await dispatch(
			updateAccount(props.account.moniker, passphrase, newPassphrase)
		);

		if (success) {
			setPassphrase('');
			setNewPassphrase('');
			setVerifyNewPassphrase('');

			setSuccess('Passphrase updated');
		}
	};

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
							<Form.Text className="text-muted"></Form.Text>
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

							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Control
								onChange={(e: any) =>
									setVerifyNewPassphrase(e.target.value)
								}
								value={verifyNewPassphrase}
								type="password"
								placeholder="Confirm New Passphrase"
							/>
						</Form.Group>
						<Button
							onClick={updatePassword}
							disabled={loading}
							variant="primary"
							type="submit"
						>
							Save
						</Button>{' '}
						<Loader loading={loading} />
					</Col>
					<Col>
						<Error error={localError} fallback={<></>}>
							<SConfirm className="text-center">
								<h5>
									<FontAwesomeIcon
										className={'red'}
										icon={faTimes}
									/>{' '}
									{localError}
								</h5>
							</SConfirm>
						</Error>
						<Error
							error={error || ''}
							fallback={
								(success.length && (
									<>
										<SConfirm className="text-center">
											<h5>
												<FontAwesomeIcon
													className={'green'}
													icon={faCheck}
												/>{' '}
											</h5>
											<h5>{success}</h5>
										</SConfirm>
									</>
								)) || <></>
							}
						>
							<SConfirm className="text-center">
								<h5>
									<FontAwesomeIcon
										className={'red'}
										icon={faTimes}
									/>{' '}
									{error}
								</h5>
							</SConfirm>
						</Error>
					</Col>
				</Form.Row>
			</Form>
		</STransfer>
	);
};

export default Update;
