import React, { useState } from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';

// import Avatar from '../components/Avatar';
// import Loader from './Loader';
import Transaction from './Transaction';

import { selectConfig, selectTransferLoading } from '../selectors';

const STransfer = styled.div`
	padding-top: 20px;
`;

// const SLoader = styled(Loader)`
// 	margin-left: 10px !important;
// `;

type Props = {
	from: string;
};

const Transfer: React.FC<Props> = props => {
	const loading = useSelector(selectTransferLoading);
	const config = useSelector(selectConfig);

	const [to, setTo] = useState('');
	const [value, setValue] = useState('');

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const confirmTx = async () => {
		setShow(true);
	};

	return (
		<STransfer>
			<Transaction
				show={show}
				handleClose={handleClose}
				transaction={{
					from: props.from,
					to,
					value,
					gas: config.defaults.gas
				}}
			/>
			<Form>
				<Form.Row>
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

						<Button
							onClick={confirmTx}
							variant="primary"
							type="submit"
							disabled={loading || !to.length || !value.length}
						>
							Send
						</Button>
					</Col>
					<Col></Col>
				</Form.Row>
			</Form>
		</STransfer>
	);
};

export default Transfer;
