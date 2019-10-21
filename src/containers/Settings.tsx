import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { SContent } from '../components/styled';

import { save } from '../modules/config';
import { selectConfig, selectConfigSaveLoading } from '../selectors';

const SSettings = styled.div``;

const Settings: React.FC<{}> = () => {
	const dispatch = useDispatch();

	const config = useSelector(selectConfig);
	const loading = useSelector(selectConfigSaveLoading);

	const [gas, setGas] = useState('');
	const [host, setHost] = useState('');
	const [port, setPort] = useState('');

	const saveConfig = async () => {
		const newConfig = {
			...config
		};

		newConfig.defaults.gas = Number(gas);

		newConfig.connection.host = host;
		newConfig.connection.port = Number(port);

		await dispatch(save(newConfig));
	};

	useEffect(() => {
		setGas(config.defaults.gas.toString());
		setPort(config.connection.port.toString());
		setHost(config.connection.host);
	}, [config]);

	return (
		<SSettings>
			<SContent>
				<Container>
					<Row>
						<Col>
							<Form.Group controlId="formBasicEmail">
								<label>Default Gas</label>
								<Form.Control
									onChange={(e: any) =>
										setGas(e.target.value)
									}
									type="text"
									defaultValue={gas.toString()}
									placeholder="Gas"
								/>
								<Form.Text className="text-muted">
									The default <code>gas</code> to be used for
									all transactions.
								</Form.Text>
							</Form.Group>
							<Form.Group>
								<Button
									disabled={loading}
									onClick={saveConfig}
									variant="outline-success"
								>
									Save
								</Button>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="formBasicEmail">
								<label>Default Host</label>
								<Form.Control
									onChange={(e: any) =>
										setHost(e.target.value)
									}
									defaultValue={host}
									type="text"
									placeholder="Host"
								/>
								<Form.Text className="text-muted">
									The default <code>host</code> address.
								</Form.Text>
							</Form.Group>
							<Form.Group controlId="formBasicEmail">
								<label>Default Port</label>
								<Form.Control
									onChange={(e: any) =>
										setPort(e.target.value)
									}
									defaultValue={port.toString()}
									type="text"
									placeholder="Port"
								/>
								<Form.Text className="text-muted">
									The default <code>port</code>.
								</Form.Text>
							</Form.Group>
						</Col>
					</Row>
				</Container>
			</SContent>
		</SSettings>
	);
};

export default Settings;
