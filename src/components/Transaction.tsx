import React, { useState } from 'react';

// import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// import Row from 'react-bootstrap/Row';

// import Avatar from './Avatar';

type Props = {
	transaction: any;
	show: boolean;
	handleClose: () => void;
};

const Transaction: React.FC<Props> = props => {
	// const dispatch = useDispatch();

	const [passphrase, setPassphrase] = useState('');

	console.log(passphrase);

	return (
		<Modal centered={true} show={props.show} onHide={props.handleClose}>
			<Form>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Transaction</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<pre>
						<code>
							{JSON.stringify(props.transaction, null, 4)}
						</code>
					</pre>
					<br />
					<Form.Control
						onChange={(e: any) => setPassphrase(e.target.value)}
						placeholder="Passphrase"
						type="password"
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button type="submit" variant="primary">
						Sign & Send
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default Transaction;
