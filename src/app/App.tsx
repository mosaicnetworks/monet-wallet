import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { listAccounts } from '../modules/accounts';
import { initConfig } from '../modules/config';

import Account from '../containers/Account';
import Accounts from '../containers/Accounts';
import Settings from '../containers/Settings';

import Wrapper from '../components/Wrapper';

const App: React.FunctionComponent<{}> = () => {
	const dispatch = useDispatch();

	const initConf = () => dispatch(initConfig());
	const initAccounts = () => dispatch(listAccounts());

	useEffect(() => {
		initConf();
		initAccounts();
	}, []);

	return (
		<HashRouter>
			<React.Fragment>
				<Wrapper>
					<Route
						exact={true}
						path="/account/:address/"
						component={Account}
					/>
					<Route exact={true} path="/settings" component={Settings} />
					<Route exact={true} path="/" component={Accounts} />
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
