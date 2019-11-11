import React from 'react';

// import { Currency } from 'evm-lite-utils';
import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const SPadding = styled.div`
	padding: 20px;
`;

type Props = {
	handleClose: () => void;
	show: boolean;
};

const Accounts: React.FC<Props> = props => {
	return (
		<Container fluid={true}>
			<Row>
				<Col>
					<SPadding>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Consectetur lorem donec massa sapien
						faucibus et molestie ac. Neque gravida in fermentum et
						sollicitudin ac orci phasellus egestas. Tempor orci eu
						lobortis elementum. Gravida arcu ac tortor dignissim.
						Dignissim suspendisse in est ante in nibh mauris. Eu
						facilisis sed odio morbi. Ultricies integer quis auctor
						elit sed vulputate mi. Nisl purus in mollis nunc sed id.
						Ornare suspendisse sed nisi lacus sed. Mattis
						pellentesque id nibh tortor id aliquet lectus. Eget sit
						amet tellus cras adipiscing enim eu turpis egestas. Id
						aliquet lectus proin nibh nisl. Vitae suscipit tellus
						mauris a diam. Sed vulputate mi sit amet mauris commodo
						quis. Amet cursus sit amet dictum. Euismod lacinia at
						quis risus sed vulputate odio. Egestas pretium aenean
						pharetra magna ac placerat vestibulum lectus mauris.
						Mauris vitae ultricies leo integer. Netus et malesuada
						fames ac turpis egestas sed. Montes nascetur ridiculus
						mus mauris vitae ultricies. Pharetra massa massa
						ultricies mi quis hendrerit dolor magna. Mattis
						ullamcorper velit sed ullamcorper morbi. Pharetra magna
						ac placerat vestibulum lectus mauris ultrices. Viverra
						aliquet eget sit amet. Et netus et malesuada fames.
						Sapien eget mi proin sed libero enim sed faucibus. Eget
						lorem dolor sed viverra. Amet nulla facilisi morbi
						tempus iaculis urna. Tortor id aliquet lectus proin nibh
						nisl condimentum. Cursus in hac habitasse platea
						dictumst quisque sagittis. Mattis aliquam faucibus purus
						in massa. Tincidunt lobortis feugiat vivamus at augue
						eget arcu dictum. Arcu cursus vitae congue mauris
						rhoncus aenean vel elit. Ut sem nulla pharetra diam sit
						amet nisl suscipit. Proin nibh nisl condimentum id. Quis
						lectus nulla at volutpat diam ut. Phasellus faucibus
						scelerisque eleifend donec. Sed cras ornare arcu dui
						vivamus arcu felis. Id semper risus in hendrerit gravida
						rutrum quisque. Elit eget gravida cum sociis natoque.
						Porta nibh venenatis cras sed felis eget velit aliquet
						sagittis. Sed viverra ipsum nunc aliquet bibendum. Risus
						in hendrerit gravida rutrum quisque. Et tortor at risus
						viverra. Ultrices mi tempus imperdiet nulla malesuada
						pellentesque elit eget gravida. Vulputate eu scelerisque
						felis imperdiet proin fermentum. Ut enim blandit
						volutpat maecenas volutpat blandit aliquam etiam erat.
						Viverra nam libero justo laoreet sit amet. Fusce ut
						placerat orci nulla pellentesque dignissim enim sit
						amet. Consequat interdum varius sit amet mattis
						vulputate. Habitant morbi tristique senectus et netus.
						Proin fermentum leo vel orci porta non pulvinar neque.
						Vel pharetra vel turpis nunc eget lorem dolor sed
						viverra. Est pellentesque elit ullamcorper dignissim
						cras tincidunt. Suspendisse faucibus interdum posuere
						lorem ipsum dolor. Id ornare arcu odio ut sem nulla
						pharetra. Eget velit aliquet sagittis id consectetur
						purus ut faucibus. Morbi quis commodo odio aenean sed
						adipiscing. Et malesuada fames ac turpis egestas
						integer. Dapibus ultrices in iaculis nunc sed augue.
						Pellentesque adipiscing commodo elit at imperdiet dui.
						Dolor morbi non arcu risus quis varius quam. Egestas
						integer eget aliquet nibh praesent tristique magna sit.
						Vel orci porta non pulvinar. Blandit aliquam etiam erat
						velit. Eu non diam phasellus vestibulum lorem sed. Sed
						nisi lacus sed viverra. Neque vitae tempus quam
						pellentesque nec nam aliquam sem. At consectetur lorem
						donec massa sapien. Tristique risus nec feugiat in
						fermentum posuere. Eget egestas purus viverra accumsan.
						Vestibulum lectus mauris ultrices eros in cursus turpis
						massa tincidunt. Integer malesuada nunc vel risus
						commodo viverra maecenas. Egestas egestas fringilla
						phasellus faucibus scelerisque eleifend donec.
					</SPadding>
				</Col>
				<Col>
					<SPadding></SPadding>
				</Col>
			</Row>
		</Container>
	);
};

export default Accounts;
