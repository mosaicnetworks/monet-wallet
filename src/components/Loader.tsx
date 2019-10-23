import React from 'react';

import Image from 'react-bootstrap/Image';

import LoaderGif from '../assets/loader2.svg';

type Props = {
	loading: boolean;
	size?: number;
};

const Loader: React.FC<Props> = props => {
	return !!props.loading ? (
		<Image
			src={LoaderGif}
			width={props.size || 30}
			height={props.size || 30}
		/>
	) : (
		<></>
	);
};

export default Loader;
