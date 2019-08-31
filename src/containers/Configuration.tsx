import React, { useState } from 'react';

import styled from 'styled-components';

import { IConfiguration } from 'evm-lite-datadir';
import { useDispatch, useSelector } from 'react-redux';
import { Transition } from 'react-spring/renderprops';
import { config as springConfig, Spring } from 'react-spring/renderprops';
import { Form, Grid, Header, Input } from 'semantic-ui-react';

import {
	ConfigurationState,
	save,
	setDirectory
} from '../modules/configuration';
import { Store } from '../store';

import Avatar from '../components/Avatar';
import Banner from '../components/Banner';
import SJumbo from '../components/Jumbo';

const SColumn = styled(Grid.Column)`
	background: #fff;
	margin: 10px;
	padding: 0 !important;

	& > div {
		padding: 20px;
		font-size: 15px;
		padding-top: 0 !important;
	}

	& .form {
		padding: 10px;
		padding-top: 0;
	}

	& h3 {
		padding: 10px 20px;
		color: #333;
		background: #fafafa;
		border-bottom: 1px solid #f4f5f7;
	}
`;

const SPadding = styled.div`
	margin: 25px 20px;
	margin-bottom: 0 !important;
`;

const SAvatarContainer = styled.div`
	margin-bottom: 5px !important;
	margin-top: 5px !important;
	text-align: right !important;
`;

const SAvatarColumn = styled(Grid.Column)`
	align-content: right !important;
	align-items: right !important;
`;

const Configuration: React.FunctionComponent<{}> = () => {
	const dispatch = useDispatch();

	const config = useSelector<Store, ConfigurationState>(
		store => store.config
	);

	const [directory, setDir] = useState(config.directory);
	const [fields, setFields] = useState({
		host: '',
		port: 0,
		from: '',
		gas: -1,
		gasPrice: -1
	});

	const setDataDir = () => dispatch(setDirectory(directory));
	const handleSaveConfig = () => {
		let gas: number = fields.gas;
		let gasPrice: number = fields.gasPrice;

		if (fields.gas < 0) {
			gas = config.data.defaults.gas;
		}

		if (fields.gasPrice < 0) {
			gasPrice = config.data.defaults.gasPrice;
		}

		const newConfig: IConfiguration = {
			connection: {
				host: fields.host || config.data.connection.host,
				port: fields.port || config.data.connection.port
			},
			defaults: {
				from: fields.from || config.data.defaults.from,
				gas,
				gasPrice
			}
		};

		dispatch(save(newConfig));
	};

	return (
		<React.Fragment>
			<SJumbo>
				<Spring
					from={{
						marginLeft: -50,
						opacity: 0
					}}
					to={{
						marginLeft: 0,
						opacity: 1
					}}
					config={springConfig.wobbly}
				>
					{props => (
						<Header style={props} as="h2" floated="left">
							Configuration
							<Header.Subheader>
								Set data directory and update configuration
							</Header.Subheader>
						</Header>
					)}
				</Spring>
				<Header as="h2" floated="right">
					<Header.Subheader>
						<Input
							defaultValue={directory}
							onChange={(_, { value }) => setDir(value)}
							action={{
								color: 'blue',
								labelPosition: 'right',
								icon: 'folder',
								onClick: setDataDir,
								content: 'Set'
							}}
						/>
					</Header.Subheader>
				</Header>
			</SJumbo>
			<Banner color="blue">
				These configuration values will be read in by all actions across
				the wallet and other evm-lite applications as default values.
			</Banner>
			<Transition
				items={!config.loading.load}
				from={{ opacity: 0 }}
				enter={{ opacity: 1 }}
				leave={{ opacity: 0 }}
			>
				{show =>
					show &&
					(p => (
						<SPadding style={p}>
							<Grid columns="equal">
								<SColumn>
									<h3>Connection</h3>
									<div>
										The node's connection details. These
										will be used to fetch account details.
									</div>
									<div className="form">
										<Form>
											<Form.Field>
												<label>Host</label>
												<Input
													onChange={(_, { value }) =>
														setFields({
															...fields,
															host: value
														})
													}
													defaultValue={
														config.data.connection
															.host
													}
													placeholder="ex: 127.0.0.1"
												/>
											</Form.Field>
											<Form.Field>
												<label>Port</label>
												<Input
													onChange={(e, { value }) =>
														setFields({
															...fields,
															port: parseInt(
																value,
																10
															)
														})
													}
													type={'number'}
													defaultValue={
														config.data.connection
															.port
													}
													placeholder="ex: 8080"
												/>
											</Form.Field>
											<Form.Field>
												<Form.Button
													onClick={handleSaveConfig}
													color="green"
													loading={
														config.loading.save
													}
													disabled={
														config.loading.save
													}
												>
													Save
												</Form.Button>
											</Form.Field>
										</Form>
									</div>
								</SColumn>
								<SColumn>
									<h3>Defaults</h3>
									<div>
										These values will be used as defaults
										for any transactions sent.
									</div>
									<div className="form">
										<Form>
											<Form.Field>
												<Grid columns="equal">
													<SAvatarColumn width={2}>
														<SAvatarContainer>
															<Avatar
																address={
																	config.data
																		.defaults
																		.from
																}
															/>
														</SAvatarContainer>
													</SAvatarColumn>
													<Grid.Column>
														<label>
															<b>From</b>
														</label>
														<Input
															onChange={(
																e,
																{ value }
															) =>
																setFields({
																	...fields,
																	from: value
																})
															}
															defaultValue={
																config.data
																	.defaults
																	.from
															}
															placeholder="ex: 0x5c3e95864f7eb2fd0789848f0a3368aa67b8439c"
														/>
													</Grid.Column>
												</Grid>
											</Form.Field>
											<Form.Field>
												<label>Gas</label>
												<Input
													onChange={(e, { value }) =>
														setFields({
															...fields,
															gas: parseInt(
																value,
																10
															)
														})
													}
													defaultValue={
														config.data.defaults.gas
													}
													type="number"
													placeholder="ex: 10000"
												/>
											</Form.Field>
											<Form.Field>
												<label>Gas Price</label>
												<Input
													onChange={(e, { value }) =>
														setFields({
															...fields,
															gasPrice: parseInt(
																value,
																10
															)
														})
													}
													defaultValue={
														config.data.defaults
															.gasPrice
													}
													type="number"
													placeholder="ex: 0"
												/>
											</Form.Field>
											<Form.Field>
												<Form.Button
													onClick={handleSaveConfig}
													color="green"
													loading={
														config.loading.save
													}
													disabled={
														config.loading.save
													}
												>
													Set Defaults
												</Form.Button>
											</Form.Field>
										</Form>
									</div>
								</SColumn>
							</Grid>
						</SPadding>
					))
				}
			</Transition>
		</React.Fragment>
	);
};

export default Configuration;
