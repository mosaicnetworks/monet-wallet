import * as React from 'react';

// import styled from 'styled-components';

import { InjectedAlertProp, withAlert } from 'react-alert';
import { connect } from 'react-redux';
import { Header, Input } from 'semantic-ui-react';

import { ConfigurationState, setDirectory } from '../modules/configuration';
import { Store } from '../store';

import Banner from '../components/Banner';
import Jumbo from '../components/Jumbo';

interface AlertProps {
	alert: InjectedAlertProp;
}

interface StoreProps {
	config: ConfigurationState;
}

interface DispatchProps {
	handleSetDataDir: (path: string) => void;
}

interface State {
	directory: string;
}

type LocalProps = StoreProps & AlertProps & DispatchProps;

class Configuration extends React.Component<LocalProps, State> {
	public state = {
		directory: this.props.config.directory || 'No data directory set.'
	};

	public handleSetDataDir = () => {
		this.props.handleSetDataDir(this.state.directory);
	};

	public render() {
		const { directory } = this.state;

		return (
			<React.Fragment>
				<Jumbo>
					<Header as="h2" floated="left">
						Configuration
						<Header.Subheader>
							Set data directory and update configuration
						</Header.Subheader>
					</Header>
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
			</React.Fragment>
		);
	}
}

const mapStoreToProps = (store: Store): StoreProps => ({
	config: store.config
});

const mapsDispatchToProps = (dispatch: any): DispatchProps => ({
	handleSetDataDir: path => dispatch(setDirectory(path))
});

export default connect<StoreProps, {}, {}, Store>(
	mapStoreToProps,
	mapsDispatchToProps
)(withAlert<LocalProps>(Configuration));
