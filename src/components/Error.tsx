import React from 'react';

type Props = {
	error: string;
	fallback: JSX.Element;
};

const Await: React.FC<Props> = props => {
	let elements = props.children;

	if (!props.error.length) {
		elements = props.fallback;
	}

	return <>{elements}</>;
};

export default Await;
