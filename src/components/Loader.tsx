import React from 'react';

import Image from 'react-bootstrap/Image';

import LOADER from '../assets/loader.svg';

type Props = {
	loading: boolean;
	size?: number;
};

const Loader: React.FC<Props> = props => {
	return !!props.loading ? (
		<Image
			src={LOADER}
			width={props.size || 40}
			height={props.size || 40}
		/>
	) : (
		<></>
	);
};

export default Loader;
