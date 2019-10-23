import React, { useState } from 'react';

import utils from 'evm-lite-utils';

import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import Avatar from './Avatar';

import { selectAccount } from '../modules/accounts';

import { MonikerEVMAccount } from '../monet';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Props = {
	handleClose: () => void;
	show: boolean;
	account: MonikerEVMAccount;
};

const SelectAccountModal: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const [passphrase, setPassphrase] = useState('');

	const select = (moniker: string, pass: string) =>
		dispatch(selectAccount(moniker, pass));

	const handleSwitchAccount = async () => {
		await select(props.account.moniker, passphrase);

		props.handleClose();
	};

	return (
		<Modal centered={true} show={props.show} onHide={props.handleClose}>
			<Form>
				<Modal.Header closeButton>
					<Modal.Title>Switch Accounts</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row className="align-items-center">
						<Col md={2}>
							<Avatar address={props.account.address} />
						</Col>
						<Col>
							<h5>{capitalize(props.account.moniker)}</h5>
							<span className="mono">
								{utils.cleanAddress(props.account.address)}
							</span>
						</Col>
					</Row>
					<br />
					<Form.Control
						onChange={(e: any) => setPassphrase(e.target.value)}
						placeholder="Passphrase"
						type="password"
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={handleSwitchAccount}
						type="submit"
						variant="warning"
					>
						Switch
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default SelectAccountModal;
