import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Wrapper: React.FunctionComponent<{}> = props => {
	return (
		<React.Fragment>
			<Container fluid={true}>
				<Row className="sticky-top">
					<Col>
						<Header />
					</Col>
				</Row>
				<Row noGutters={true}>
					<Sidebar />
					<Col md={11}>{props.children}</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
};

export default Wrapper;
