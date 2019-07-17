import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import Animation from './animations/Animation';

const ButtonContainer = styled.div`
	position: fixed;
	bottom: ${props => props.theme.bottomOffset}px;
	right: 0;
	width: auto;
	color: white !important;
	border-top-left-radius: 7px;
	border-bottom-left-radius: 7px;

	&:hover {
		cursor: pointer;
	}

	& button {
		border-top-right-radius: 0px !important;
		border-bottom-right-radius: 0px !important;
		margin: 0 !important;
		margin-left: -2px !important;
		box-shadow: 0 4px 20px -6px #000 !important;
	}
`;

interface Props {
	bottomOffset: number;
}

class FloatingButton extends React.Component<Props, any> {
	public render() {
		const { bottomOffset } = this.props;

		const theme = {
			bottomOffset: bottomOffset
		};

		return (
			<ThemeProvider theme={theme}>
				<Animation direction="right">
					<ButtonContainer>{this.props.children}</ButtonContainer>
				</Animation>
			</ThemeProvider>
		);
	}
}

export default FloatingButton;
