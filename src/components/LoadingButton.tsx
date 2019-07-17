import React from 'react';

import { Button } from 'semantic-ui-react';

interface OwnProps {
	isLoading: boolean;
	onClickHandler: any;
}

type LocalProps = OwnProps;

class LoadingButton extends React.Component<LocalProps, any> {
	public render() {
		const { isLoading, onClickHandler } = this.props;

		return (
			<React.Fragment>
				<Button
					onClick={onClickHandler}
					icon={'circle notch'}
					loading={isLoading}
					disabled={isLoading}
					color={'blue'}
				/>
			</React.Fragment>
		);
	}
}

export default LoadingButton;
