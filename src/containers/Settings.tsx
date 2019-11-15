import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Monet } from 'evm-lite-core';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Header from '../components/Header';
import Loader from '../components/Loader';

import { save, setDatadir } from '../modules/settings';
import { MonetInfo } from '../monet';
import {
	selectConfig,
	selectConfigSaveLoading,
	selectDatadir,
	selectSettingsError
} from '../selectors';

const SContent = styled.div`
	padding: 30px !important;

	h4 {
		margin-bottom: 15px;
	}
`;

type Props = {};

const Settings: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const config = useSelector(selectConfig);
	const error = useSelector(selectSettingsError);
	const datadir = useSelector(selectDatadir);
	const loading = useSelector(selectConfigSaveLoading);

	const [gas, setGas] = useState('');
	const [host, setHost] = useState('');
	const [port, setPort] = useState('');
	const [vdatadir, setVDatadir] = useState('');

	const saveConfig = async () => {
		if (datadir !== vdatadir) {
			await dispatch(setDatadir(vdatadir));
		}

		if (!error) {
			const newConfig = {
				...config
			};

			newConfig.defaults.gas = Number(gas);

			newConfig.connection.host = host;
			newConfig.connection.port = Number(port);

			await dispatch(save(newConfig));
		}
	};

	useEffect(() => {
		setGas(config.defaults.gas.toString());
		setPort(config.connection.port.toString());
		setHost(config.connection.host);

		setVDatadir(datadir);
	}, [config]);

	// node details

	const fetchNodeDetails = async () => {
		setConLoading(true);

		const monet = new Monet(host, Number(port));

		try {
			const info = await monet.getInfo<MonetInfo>();

			if (info.min_gas_price) {
				setMinGasPrice(Number(info.min_gas_price));
				setIsConnected(true);
			}
		} catch {
			setIsConnected(false);
			setMinGasPrice(0);
		}

		setTimeout(() => {
			setConLoading(false);
		}, 500);
	};

	const [isConnected, setIsConnected] = useState(false);
	const [conLoading, setConLoading] = useState(false);
	const [minGasPrice, setMinGasPrice] = useState(0);

	useEffect(() => {
		if (host.length && port.length) {
			fetchNodeDetails();
		}
	}, [host, port]);
	return (
		<>
			<Header title="Settings">
				<Loader loading={loading} />{' '}
				<Button
					disabled={loading}
					onClick={saveConfig}
					variant="outline-success"
				>
					{datadir !== vdatadir ? 'Save Datadir' : 'Save'}
				</Button>
			</Header>
			<SContent>
				<Form>
					<Form.Row className="align-items-center">
						<Col md={6}>
							<Form.Group controlId="formBasicEmail">
								<label>Node IP Address</label>
								<Form.Control
									onChange={(e: any) =>
										setHost(e.target.value)
									}
									defaultValue={host}
									type="text"
									placeholder="Host"
								/>
								<Form.Text className="text-muted">
									This is the IP address of the Monet node. If
									you wish to connect to the current live
									testnet use{' '}
									<a href="">camille.monet.network</a>
								</Form.Text>
							</Form.Group>
							<Form.Group controlId="formBasicEmail">
								<label>Service Port</label>
								<Form.Control
									onChange={(e: any) =>
										setPort(e.target.value)
									}
									defaultValue={port.toString()}
									type="text"
									placeholder="Port"
								/>
								<Form.Text className="text-muted">
									The service port of the Monet node. This is
									usally 8080.
								</Form.Text>
							</Form.Group>
						</Col>
						<Col className="text-center">
							<h2>
								{conLoading ? (
									<Loader loading={conLoading} />
								) : (
									<div>
										<FontAwesomeIcon
											className={
												isConnected ? 'green' : 'red'
											}
											icon={
												isConnected ? faCheck : faTimes
											}
										/>{' '}
										Connection
									</div>
								)}
							</h2>
						</Col>
					</Form.Row>
				</Form>
				<hr />
				<Form>
					<Form.Row className="align-items-center">
						<Col>
							<Form.Group controlId="formBasicEmail">
								<label>Gas</label>
								<Form.Control
									onChange={(e: any) =>
										setGas(e.target.value)
									}
									type="text"
									defaultValue={gas.toString()}
									placeholder="Gas"
								/>
								<Form.Text className="text-muted">
									The default gas to be used for all
									transactions (excluding transfers). Gas
									price will be pulled automatically from the
									respective node before transactions are
									submitted.
								</Form.Text>
							</Form.Group>
						</Col>
						<Col className="text-center">
							{conLoading ? (
								<Loader loading={conLoading} />
							) : (
								<div>
									{isConnected && (
										<>
											<h2>{minGasPrice || 0} Attoms</h2>
											<div>Current Gas Price</div>
										</>
									)}
								</div>
							)}
						</Col>
					</Form.Row>
				</Form>
				<hr />
				<h4>Advanced</h4>
				<Form>
					<Form.Row>
						<Col>
							<Form.Group controlId="formBasicEmail">
								<label>Data Directory</label>
								<Form.Control
									onChange={(e: any) =>
										setVDatadir(e.target.value)
									}
									type="text"
									defaultValue={vdatadir}
									placeholder="Gas"
								/>
								<Form.Text className="text-muted">
									The data directory is the folder in which
									all settings and encrypted keyfiles are
									stored. This setting should not be changed
									unless you are aware of the side effects.
									For more info visit the{' '}
									<a href="">documentation.</a>
								</Form.Text>
							</Form.Group>
						</Col>
						<Col></Col>
					</Form.Row>
				</Form>
			</SContent>
		</>
	);
};

export default Settings;
