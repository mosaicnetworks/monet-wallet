import React, { useEffect } from 'react';

import ReactTooltip from 'react-tooltip';

import { useDispatch } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import { initSettings } from '../modules/settings';

import Account from '../containers/Account';
import Accounts from '../containers/Accounts';
import Settings from '../containers/Settings';

import Wrapper from '../components/Wrapper';

const App: React.FunctionComponent<{}> = () => {
	const dispatch = useDispatch();

	const initConf = () => dispatch(initSettings());

	const initApp = async () => {
		await initConf();
	};

	useEffect(() => {
		initApp();
	}, []);

	return (
		<HashRouter>
			<ReactTooltip type="dark" />
			<React.Fragment>
				<Wrapper>
					<Route exact={true} path="/" component={Accounts} />
					<Route
						exact={true}
						path="/account/:moniker"
						component={Account}
					/>
					<Route exact={true} path="/settings" component={Settings} />
				</Wrapper>
			</React.Fragment>
		</HashRouter>
	);
};

export default App;
