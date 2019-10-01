import React from 'react';

import Header from '../components/Header';

const Wrapper: React.FunctionComponent<{}> = props => {
	return (
		<React.Fragment>
			<Header />
			{props.children}
		</React.Fragment>
	);
};

export default Wrapper;
