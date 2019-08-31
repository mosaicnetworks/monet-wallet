import React from 'react';

import { Button } from 'semantic-ui-react';

interface Props {
	isLoading: boolean;
	onClickHandler: any;
}

const LoadingButton: React.FunctionComponent<Props> = props => {
	return (
		<React.Fragment>
			<Button
				onClick={props.onClickHandler}
				icon={'circle notch'}
				loading={props.isLoading}
				disabled={props.isLoading}
				color={'blue'}
			/>
		</React.Fragment>
	);
};

export default LoadingButton;
