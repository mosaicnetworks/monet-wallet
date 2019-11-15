import React from 'react';

type Props = {
	await: boolean;
	fallback: JSX.Element;
};

const Await: React.FC<Props> = props => {
	let elements = props.children;

	if (props.await) {
		elements = props.fallback;
	}

	return <>{elements}</>;
};

export default Await;
