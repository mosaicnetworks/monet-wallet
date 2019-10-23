import React, { useEffect, useState } from 'react';

// import styled from 'styled-components';

import utils from 'evm-lite-utils';

import { Account } from 'evm-lite-core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import Avatar from './Avatar';

import { createAccount } from '../modules/accounts';
import { selectCreateAccountLoading } from '../selectors';

type Props = {
	handleClose: () => void;
	show: boolean;
};

const NewAccountModel: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const [moniker, setMoniker] = useState('');
	const [passphrase, setPassphrase] = useState('');

	const [account, setAccount] = useState<Account>();

	const loading = useSelector(selectCreateAccountLoading);

	const create = async () => {
		if (!utils.validMoniker(moniker)) {
			toast.error(
				'Moniker can only include alphanumeric characters and `_`'
			);
			return;
		}

		if (passphrase.length < 3) {
			toast.error('Passphrase must be longer than 3 characters');
			return;
		}

		await dispatch(createAccount(moniker, passphrase));

		props.handleClose();
	};

	useEffect(() => {
		setAccount(Account.new());
	}, []);

	const randomize = () => {
		setAccount(Account.new());
		console.log(passphrase);
	};

	return (
		<>
			<Modal centered={true} show={props.show} onHide={props.handleClose}>
				<Form>
					<Modal.Header closeButton>
						<Modal.Title>New Account</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row className="align-items-center">
							<Col md={2}>
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
						<br />
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
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={randomize} variant="outline-primary">
							Randomize
						</Button>
						<Button
							disabled={loading}
							onClick={create}
							type="submit"
							variant="success"
						>
							Create
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default NewAccountModel;
