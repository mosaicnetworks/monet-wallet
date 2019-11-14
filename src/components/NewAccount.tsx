import React, { useEffect, useState } from 'react';

import utils from 'evm-lite-utils';
import styled from 'styled-components';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Account } from 'evm-lite-core';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Avatar from './Avatar';

import { createAccount } from '../modules/accounts';
import { selectCreateAccountLoading } from '../selectors';

const SCreateAccount = styled.div`
	padding: 30px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);

	h4 {
		/* margin-bottom: 20px !important; */
	}
`;

const NewAccount: React.FC<{}> = () => {
	const dispatch = useDispatch();

	const [moniker, setMoniker] = useState('');
	const [passphrase, setPassphrase] = useState('');
	const [error, setError] = useState('');
	const [account, setAccount] = useState<Account>();

	console.log(error);

	const loading = useSelector(selectCreateAccountLoading);

	const create = async () => {
		if (!moniker.length) {
			setError('Moniker cannot be empty');
			return;
		}

		if (!utils.validMoniker(moniker)) {
			setError(
				'Moniker can only include alphanumeric characters and underscores'
			);
			return;
		}

		if (passphrase.length < 3) {
			setError('Passphrase must be longer than 3 characters');
			return;
		}

		if (account) {
			await dispatch(createAccount(account, moniker, passphrase));

			randomize();
			setMoniker('');
			setPassphrase('');
		}
	};

	useEffect(() => {
		setAccount(Account.new());
	}, []);

	const randomize = () => {
		setAccount(Account.new());
	};

	return (
		<>
			<SCreateAccount>
				<Row className="align-items-center">
					<Col md={6}>
						<h4>New Account</h4>
						<p>Fill in the form below to create a new account.</p>
						<hr />
						<Row className="align-items-center">
							<Col md={2} className="text-right">
								<Avatar
									address={(account && account.address) || ''}
								/>
							</Col>
							<Col>
								<h5>{moniker || 'Moniker'}</h5>
								<span className="mono">
									{utils.cleanAddress(
										(account && account.address) || ''
									)}
								</span>
							</Col>
						</Row>
						<hr />
						<Form.Group>
							<label>Moniker</label>
							<Form.Control
								onChange={(e: any) =>
									setMoniker(e.target.value)
								}
								placeholder="Moniker"
								type="text"
							/>
						</Form.Group>
						<Form.Group>
							<label>Passsphrase</label>
							<Form.Control
								onChange={(e: any) =>
									setPassphrase(e.target.value)
								}
								placeholder="Passphrase"
								type="password"
							/>
						</Form.Group>
						<Button onClick={randomize} variant="outline-primary">
							Randomize
						</Button>{' '}
						<Button
							disabled={loading}
							onClick={create}
							type="submit"
							variant="success"
						>
							Create
						</Button>
					</Col>
					<Col md={1}></Col>
					<Col>
						{error.length > 0 && (
							<Row>
								<Col md={1}>
									<h5>
										<FontAwesomeIcon
											className={'red'}
											icon={faTimes}
										/>{' '}
									</h5>
								</Col>
								<Col>
									<h5>{error}</h5>
								</Col>
							</Row>
						)}
					</Col>
				</Row>
			</SCreateAccount>
		</>
	);
};

export default NewAccount;
