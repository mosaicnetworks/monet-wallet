import React from 'react';

import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const SHeader = styled.div`
	background: #fff;
	height: 60px;
	line-height: 60px;
	width: 100%;
	box-shadow: 2px 0px 40px rgba(0, 0, 0, 0.05);
	border-bottom: 1px solid #eee;
`;

const STitle = styled.div`
	font-size: 20px;
	font-weight: 600;
	font-family: 'Titillium Web', sans-serif;
`;

type Props = {
	title: string;
	icon?: JSX.Element;
};

const Header: React.FC<Props> = props => {
	return (
		<>
			<SHeader className="sticky-top">
				<Container>
					<Row>
						<Col xs={9}>
							<STitle>
								{props.icon}
								{props.title}
							</STitle>
						</Col>
						<Col xs={3} className="text-right">
							{props.children}
						</Col>
					</Row>
				</Container>
			</SHeader>
		</>
	);
};

export default Header;
