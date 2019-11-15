import React from 'react';

import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Sidebar from '../components/Sidebar';

import ScrollTop from './utils/ScrollTop';

const SPadding = styled.div`
	padding-bottom: 70px;
`;

const Wrapper: React.FunctionComponent<{}> = props => {
	return (
		<>
			<ScrollTop />
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
