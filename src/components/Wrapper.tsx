import React from 'react';

import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Sidebar from '../components/Sidebar';

const SPadding = styled.div`
	min-height: 100vh;
`;

const Wrapper: React.FunctionComponent<{}> = props => {
	return (
		<>
			<Container fluid={true}>
				<Row noGutters={true}>
					<Col xs={2}>
						<Sidebar />
					</Col>
					<Col>
						<SPadding>{props.children}</SPadding>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Wrapper;
