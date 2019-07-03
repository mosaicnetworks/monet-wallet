import * as React from 'react';

import { ConfigurationSchema } from 'evm-lite-datadir';
import { InjectedAlertProp, withAlert } from 'react-alert';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { Store } from 'src/store';

import { initialize, load } from '../modules/configuration';

import Account from '../pages/Account';
import Accounts from '../pages/Accounts';
import Configuration from '../pages/Configuration';
import POA from '../pages/POA';

import Wrapper from '../components/Wrapper';

interface AlertProps {
	alert: InjectedAlertProp;
}

interface StoreProps {
	empty?: null;
}

interface DispatchProps {
	loadConfig: () => Promise<ConfigurationSchema>;
	initializeApp: () => Promise<void>;
}

interface OwnProps {
	empty?: null;
}

type LocalProps = OwnProps & DispatchProps & StoreProps & AlertProps;

class App extends React.Component<LocalProps, any> {
	public componentDidMount() {
		this.props.initializeApp();
	}

	public render() {
		return (
			<HashRouter>
				<React.Fragment>
					<Wrapper>
						<Route exact={true} path="/" component={Accounts} />
						<Route
							name="account"
							exact={true}
							path="/account/:address"
							component={Account}
						/>
						<Route path="/poa" component={POA} />
						<Route
							path="/configuration"
							component={Configuration}
						/>
					</Wrapper>
				</React.Fragment>
			</HashRouter>
		);
	}
}

const mapStoreToProps = (store: Store): StoreProps => ({});

const mapsDispatchToProps = (dispatch: any): DispatchProps => ({
	loadConfig: () => dispatch(load()),
	initializeApp: () => dispatch(initialize())
});

export default connect<StoreProps, DispatchProps, OwnProps, Store>(
	mapStoreToProps,
	mapsDispatchToProps
)(withAlert<LocalProps>(App));
