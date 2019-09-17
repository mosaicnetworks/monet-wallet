import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { resetUnlock } from '../modules/accounts';
import { MonikerAccount } from '../monet';
import { Store } from '../store';

import Header from '../components/Header';

const Wrapper: React.FunctionComponent<{}> = props => {
	const dispatch = useDispatch();

	const unlocked = useSelector<Store, MonikerAccount | undefined>(
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
