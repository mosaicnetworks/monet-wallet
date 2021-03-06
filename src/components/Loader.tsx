import React from 'react';

import Image from 'react-bootstrap/Image';

import LOADER from '../assets/loader-circle.svg';

type Props = {
	loading: boolean;
	size?: number;
};

const Loader: React.FC<Props> = props => {
	return !!props.loading ? (
		<Image
			src={LOADER}
			width={props.size || 38}
			height={props.size || 38}
		/>
	) : (
		<></>
	);
};

export default Loader;
