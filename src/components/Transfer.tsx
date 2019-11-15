import React, { useState } from 'react';

import styled from 'styled-components';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Currency } from 'evm-lite-utils';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import Avatar from './Avatar';
import Error from './Error';
import Loader from './Loader';

import { MonikerEVMAccount } from 'src/monet';
import { transfer } from '../modules/accounts';
import { selectAccountError, selectTransferLoading } from '../selectors';

const STransfer = styled.div`
	padding-top: 20px;

	td {
		padding-right: 10px;
	}

	h5 {
		margin-bottom: 25px !important;
	}
`;

const SConfirm = styled.div`
	padding-left: 50px;
`;

type Props = {
	account: MonikerEVMAccount;
	getAccount: () => any;
};

const Transfer: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const error = useSelector(selectAccountError);
	const loading = useSelector(selectTransferLoading);

	const [to, setTo] = useState('');
	const [value, setValue] = useState('');
	const [passphrase, setPassphrase] = useState('');
	const [success, setSuccess] = useState('');

	const makeTransfer = async () => {
		const success: any = await dispatch(
			transfer(props.account.moniker, passphrase, to, value)
		);

		if (success) {
			setTo('');
			setValue('');
			setSuccess('Transfer successful');

			await props.getAccount();
			console.log(success);
			setTimeout(() => {
				setSuccess('');
			}, 5000);
		}
	};

	return (
		<STransfer>
			<Form>
				<Form.Row className="align-items-center">
					<Col>
						<h5>Transfer</h5>
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
						<Form.Group controlId="formBasicPassword">
							<InputGroup>
								<Form.Control
									onChange={(e: any) =>
										setValue(e.target.value)
									}
									value={value}
									type="text"
									placeholder="Amount"
								/>
								<InputGroup.Append>
									<InputGroup.Text id="inputGroupPrepend">
										Tenom
									</InputGroup.Text>
								</InputGroup.Append>
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
								placeholder="Passphrase"
							/>
						</Form.Group>
						<Button
							onClick={makeTransfer}
							variant="primary"
							type="submit"
							disabled={loading || !to.length || !value.length}
						>
							Make Transfer
						</Button>{' '}
						<Loader loading={loading} />
					</Col>
					<Col>
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
						<SConfirm>
							<hr />
							<h5>Confirm</h5>
							<p>
								Make sure the details below are correct before
								submitting transaction
							</p>
							<Row>
								<Col>From</Col>
								<Col>To</Col>
							</Row>
							<Row>
								<Col className="text-center">
									<Row
										noGutters={false}
										className="align-items-center"
									>
										<Col md={2}>
											<Avatar
												address={props.account.address}
												size={40}
											/>
										</Col>
										<Col>
											<code>
												{props.account.address ||
													'0x0000000000000000000000000000000000000000'}
											</code>
										</Col>
									</Row>
								</Col>
								<Col className="text-center">
									<Row className="align-items-center">
										<Col md={2}>
											<Avatar address={to} size={40} />
										</Col>
										<Col>
											<code>
												{to ||
													'0x0000000000000000000000000000000000000000'}
											</code>
										</Col>
									</Row>
								</Col>
							</Row>
							<hr />
							<h5 className="mono text-center">
								<img
									src={
										'https://monet.network/app/images/products/tenom.svg'
									}
									width={30}
								/>{' '}
								{value.length > 0
									? new Currency(value + 'T').format('T')
									: '0T'}
							</h5>
						</SConfirm>
					</Col>
				</Form.Row>
			</Form>
		</STransfer>
	);
};

export default Transfer;
