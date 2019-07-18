import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { initialize } from '../modules/configuration';

import Wrapper from '../components/Wrapper';

import Accounts from '../containers/Accounts';
import Configuration from '../containers/Configuration';
import POA from '../containers/POA';

const App: React.FunctionComponent<{}> = () => {
	const dispatch = useDispatch();

	const init = () => dispatch(initialize());

	useEffect(() => {
		init();
	});

	return (
		<HashRouter>
			<React.Fragment>
				<Wrapper>
					<Route exact={true} path="/" component={Accounts} />
					<Route path="/config" component={Configuration} />
					<Route path="/poa" component={POA} />
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
