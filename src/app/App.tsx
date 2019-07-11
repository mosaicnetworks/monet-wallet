import * as React from 'react';

import { InjectedAlertProp, withAlert } from 'react-alert';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import { Store } from '../store';
import { initialize } from '../modules/configuration';

import Wrapper from '../components/Wrapper';

import Accounts from '../containers/Accounts';
import Configuration from '../containers/Configuration';

interface AlertProps {
	alert: InjectedAlertProp;
}

interface StoreProps {}

interface DispatchProps {
	handleInitialize: () => void;
}

interface OwnProps {}

type LocalProps = OwnProps & DispatchProps & StoreProps & AlertProps;

class App extends React.Component<LocalProps, any> {
	public componentDidMount() {
		this.props.handleInitialize();
	}

	public render() {
		return (
			<HashRouter>
				<React.Fragment>
					<Wrapper>
						<Route exact={true} path="/" component={Accounts} />
						<Route path="/config" component={Configuration} />
					</Wrapper>
				</React.Fragment>
			</HashRouter>
		);
	}
}

const mapStoreToProps = (store: Store): StoreProps => ({});

const mapsDispatchToProps = (dispatch: any): DispatchProps => ({
	handleInitialize: () => dispatch(initialize())
});

export default connect<StoreProps, DispatchProps, OwnProps, Store>(
	mapStoreToProps,
	mapsDispatchToProps
)(withAlert<LocalProps>(App));
