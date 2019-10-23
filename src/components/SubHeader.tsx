import React from 'react';

import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Transfer from './Transfer';

const SContainer = styled.div`
	background: #fff;
	border-top: 1px solid #f3f3f3 !important;
	border-bottom: 1px solid #f3f3f3 !important;
	/* padding: 15px 0; */

	.nav-tabs {
		border-color: #f3f3f3;
	}

	.nav-link.active {
		background: #fff !important;
		border-bottom: 0px solid #eee !important;
	}

	.nav-link {
		background: #fff !important;
		border-top: none !important;
		border-radius: 0 !important;
		border-bottom: 1px solid #f3f3f3 !important;
		font-size: 14px !important;
	}

	.tab-content {
		background: #fff;
		padding: 20px 0;
	}
`;

const SubHeader: React.FC<{}> = () => {
	return (
		<SContainer>
			<Tabs defaultActiveKey="transfer" id="uncontrolled-tab-example">
				<Tab eventKey="1" title="" disabled={true}></Tab>
				<Tab eventKey="2" title="" disabled={true}></Tab>
				<Tab eventKey="3" title="" disabled={true}></Tab>
				<Tab eventKey="transfer" title="Transfer">
					<Container>
						<Transfer />
					</Container>
				</Tab>
				<Tab eventKey="poa" title="Proof of Authority">
					<Container>
						When in the chronicle of wasted time I see descriptions
						of the fairest wights, And beauty making beautiful old
						rime, In praise of ladies dead and lovely knights, Then,
						in the blazon of sweet beauty's best, Of hand, of foot,
						of lip, of eye, of brow, I see their antique pen would
						have express'd Even such a beauty as you master now. So
						all their praises are but prophecies Of this our time,
						all you prefiguring;
					</Container>
				</Tab>
			</Tabs>
		</SContainer>
	);
};

export default SubHeader;
