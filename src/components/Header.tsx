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
	/* background: var(--blue); */
	/* color: white !important; */
	/* box-shadow: 2px 0px 40px rgba(0, 0, 0, 0.05); */
	border-bottom: var(--border);
	padding: 0 15px;
`;

const STitle = styled.div`
	font-size: 20px;
	font-weight: 600;
	font-family: 'Titillium Web', sans-serif;
`;

const SIcon = styled.span``;

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
								<SIcon>{props.icon}</SIcon>
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
