import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const colors = {
	purple: 'rgba(118, 70, 146, 1)',
	orange: '#f2711c',
	black: '#222',
	blue: 'rgba(24, 64, 150, 1)'
};

const BannerContainer = styled.div`
	background: ${props => props.theme.color} !important;
	color: #fff !important;
	padding: 20px;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3) !important;
	position: relative;
	-webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
		0 0 40px rgba(0, 0, 0, 0.1) inset;
	-moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
		0 0 40px rgba(0, 0, 0, 0.1) inset;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
`;

interface Props {
	color: 'purple' | 'orange' | 'black' | 'blue';
	style?: any;
}

const Banner: React.FunctionComponent<Props> = props => {
	const theme = {
		color: colors[props.color]
	};

	return (
		<ThemeProvider theme={theme}>
			<BannerContainer style={props.style}>
				{props.children}
			</BannerContainer>
		</ThemeProvider>
	);
};

export default Banner;
