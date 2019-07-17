import * as React from 'react';

import styled from 'styled-components';

import { ConfigurationSchema } from 'evm-lite-datadir';
import { InjectedAlertProp, withAlert } from 'react-alert';
import { connect } from 'react-redux';
import { config as springConfig, Spring } from 'react-spring/renderprops';
import { Header, Input, Grid, Form } from 'semantic-ui-react';

import {
	ConfigurationState,
	setDirectory,
	save
} from '../modules/configuration';
import { Store } from '../store';

import Banner from '../components/Banner';
import Jumbo from '../components/Jumbo';

const Column = styled(Grid.Column)`
	background: #fff;
	margin: 10px;
	padding: 0 !important;
	box-shadow: 0 4px 20px -6px #eee !important;

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

const Padding = styled.div`
	margin: 25px 20px;
	margin-bottom: 0 !important;
`;

interface AlertProps {
	alert: InjectedAlertProp;
}

interface StoreProps {
	config: ConfigurationState;
}

interface DispatchProps {
	handleSetDataDir: (path: string) => void;
	handleSaveConfig: (config: ConfigurationSchema) => void;
}

interface State {
	directory: string;
	fields: {
		host: string;
		port: number;
		from: string;
		gas: number;
		gasPrice: number;
	};
}

type LocalProps = StoreProps & AlertProps & DispatchProps;

class Configuration extends React.Component<LocalProps, State> {
	public state = {
		directory: this.props.config.directory || 'No data directory set.',
		fields: {
			host: '',
			port: 0,
			from: '',
			gas: -1,
			gasPrice: -1
		}
	};

	public handleSetDataDir = () => {
		this.props.handleSetDataDir(this.state.directory);
	};

	public handleSaveConfig = () => {
		const { fields } = this.state;
		const { config } = this.props;

		let gas: number = fields.gas;
		if (fields.gas < 0) {
			gas = config.data.defaults.gas;
		}

		let gasPrice: number = fields.gasPrice;
		if (fields.gasPrice < 0) {
			gasPrice = config.data.defaults.gasPrice;
		}

		let newConfig: ConfigurationSchema = {
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

		this.props.handleSaveConfig(newConfig);
	};

	public render() {
		const { directory } = this.state;
		const { config } = this.props;

		return (
			<React.Fragment>
				<Jumbo>
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
								onChange={(e, { value }) =>
									this.setState({ directory: value })
								}
								action={{
									color: 'blue',
									labelPosition: 'right',
									icon: 'folder',
									onClick: this.handleSetDataDir,
									content: 'Set'
								}}
							/>
						</Header.Subheader>
					</Header>
				</Jumbo>
				<Banner color="blue">
					These configuration values will be read in by all actions
					across the wallet and other evm-lite applications as default
					values.
				</Banner>
				<Padding>
					<Grid columns="equal">
						<Column>
							<h3>Connection</h3>
							<div>
								The node's connection details. These will be
								used to fetch account details.
							</div>
							<div className="form">
								<Form>
									<Form.Field>
										<label>Host</label>
										<Input
											onChange={(e, { value }) =>
												this.setState({
													...this.state,
													fields: {
														...this.state.fields,
														host: value
													}
												})
											}
											defaultValue={
												config.data.connection.host
											}
											placeholder="ex: 127.0.0.1"
										/>
									</Form.Field>
									<Form.Field>
										<label>Port</label>
										<Input
											onChange={(e, { value }) =>
												this.setState({
													...this.state,
													fields: {
														...this.state.fields,
														port: parseInt(
															value,
															10
														)
													}
												})
											}
											type={'number'}
											defaultValue={
												config.data.connection.port
											}
											placeholder="ex: 8080"
										/>
									</Form.Field>
									<Form.Field>
										<Form.Button
											onClick={this.handleSaveConfig}
											color="green"
											loading={
												config.loading.save ||
												config.loading.load
											}
											disabled={
												config.loading.save ||
												config.loading.load
											}
										>
											Save
										</Form.Button>
									</Form.Field>
								</Form>
							</div>
						</Column>
						<Column>
							<h3>Defaults</h3>
							<div>
								These values will be used as defaults for any
								transactions sent.
							</div>
							<div className="form">
								<Form>
									<Form.Field>
										<label>From</label>
										<Input
											onChange={(e, { value }) =>
												this.setState({
													...this.state,
													fields: {
														...this.state.fields,
														from: value
													}
												})
											}
											defaultValue={
												config.data.defaults.from
											}
											placeholder="ex: 0x5c3e95864f7eb2fd0789848f0a3368aa67b8439c"
										/>
									</Form.Field>
									<Form.Field>
										<label>Gas</label>
										<Input
											onChange={(e, { value }) =>
												this.setState({
													...this.state,
													fields: {
														...this.state.fields,
														gas: parseInt(value, 10)
													}
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
												this.setState({
													...this.state,
													fields: {
														...this.state.fields,
														gasPrice: parseInt(
															value,
															10
														)
													}
												})
											}
											defaultValue={
												config.data.defaults.gasPrice
											}
											type="number"
											placeholder="ex: 0"
										/>
									</Form.Field>
									<Form.Field>
										<Form.Button
											onClick={this.handleSaveConfig}
											color="green"
											loading={
												config.loading.save ||
												config.loading.load
											}
											disabled={
												config.loading.save ||
												config.loading.load
											}
										>
											Set Defaults
										</Form.Button>
									</Form.Field>
								</Form>
							</div>
						</Column>
					</Grid>
				</Padding>
			</React.Fragment>
		);
	}
}

const mapStoreToProps = (store: Store): StoreProps => ({
	config: store.config
});

const mapsDispatchToProps = (dispatch: any): DispatchProps => ({
	handleSetDataDir: path => dispatch(setDirectory(path)),
	handleSaveConfig: config => dispatch(save(config))
});

export default connect<StoreProps, {}, {}, Store>(
	mapStoreToProps,
	mapsDispatchToProps
)(withAlert<LocalProps>(Configuration));
