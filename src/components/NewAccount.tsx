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
import Error from './Error';

import { createAccount } from '../modules/accounts';
import { selectAccountError, selectCreateAccountLoading } from '../selectors';

const SCreateAccount = styled.div`
	padding: 30px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const NewAccount: React.FC<{}> = () => {
	const dispatch = useDispatch();

	const [moniker, setMoniker] = useState('');
	const [passphrase, setPassphrase] = useState('');
	const [account, setAccount] = useState<Account>();

	const loading = useSelector(selectCreateAccountLoading);
	const error = useSelector(selectAccountError);

	const create = async () => {
		if (account) {
			const success: any = await dispatch(
				createAccount(account, moniker, passphrase)
			);

			if (success) {
				randomize();
				setMoniker('');
				setPassphrase('');
			}
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
								value={moniker}
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
								value={passphrase}
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
						<Error error={error || ''} fallback={<></>}>
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
						</Error>
					</Col>
				</Row>
			</SCreateAccount>
		</>
	);
};

export default NewAccount;
