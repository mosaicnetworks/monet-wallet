import * as React from 'react';

import styled from 'styled-components';

import { InjectedAlertProp, withAlert } from 'react-alert';
import { connect } from 'react-redux';
import { Header, Input } from 'semantic-ui-react';

import { Store } from '../store';

import Banner from '../components/Banner';
import Jumbo from '../components/Jumbo';

const Description = styled.div`
	margin: 40px;
`;

interface AlertProps {
	alert: InjectedAlertProp;
}

interface StoreProps {}

interface DispatchProps {}

interface State {}

type LocalProps = StoreProps & AlertProps & DispatchProps;

class Configuration extends React.Component<LocalProps, State> {
	public render() {
		return (
			<React.Fragment>
				<Jumbo>
					<Header as="h2" floated="left">
						Configuration
						<Header.Subheader>
							Configuration directory here
						</Header.Subheader>
					</Header>
					<Header as="h2" floated="right">
						<Header.Subheader>
							<Input
								compact={true}
								action={{
									color: 'blue',
									labelPosition: 'right',
									icon: 'folder',
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
				<Description />
			</React.Fragment>
		);
	}
}

const mapStoreToProps = (store: Store): StoreProps => ({});

const mapsDispatchToProps = (dispatch: any): DispatchProps => ({});

export default connect<StoreProps, {}, {}, Store>(
	mapStoreToProps,
	mapsDispatchToProps
)(withAlert<LocalProps>(Configuration));
