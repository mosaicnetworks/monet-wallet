import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Account } from 'evm-lite-core';

import { Store } from '../store';
import { resetUnlock } from '../modules/accounts';

import Header from '../components/Header';

const Wrapper: React.FunctionComponent<{}> = props => {
	const dispatch = useDispatch();

	const unlocked = useSelector<Store, Account | undefined>(
		store => store.accounts.unlocked
	);

	const reset = () => dispatch(resetUnlock());

	return (
		<React.Fragment>
			<Header unlocked={unlocked} reset={reset} />
			{props.children}
		</React.Fragment>
	);
};

export default Wrapper;
