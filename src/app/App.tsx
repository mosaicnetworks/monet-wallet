import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { initialize } from '../modules/configuration';

import AccountDetail from '../containers/AccountDetail';
import Accounts from '../containers/Accounts';
import Configuration from '../containers/Configuration';
import POA from '../containers/POA';
import Wrapper from '../containers/Wrapper';

const App: React.FunctionComponent<{}> = () => {
	const dispatch = useDispatch();

	const init = () => dispatch(initialize());

	useEffect(() => {
		init();
	}, []);

	return (
		<HashRouter>
			<React.Fragment>
				<Wrapper>
					<Route exact={true} path="/" component={Accounts} />
					<Route path="/config" component={Configuration} />
					<Route path="/poa" component={POA} />
					<Route
						exact={true}
						path="/account/:address"
						component={AccountDetail}
					/>
				</Wrapper>
				<ToastContainer
					autoClose={2000}
					position={'bottom-left'}
					toastClassName="toast-custom"
				/>
			</React.Fragment>
		</HashRouter>
	);
};

export default App;
