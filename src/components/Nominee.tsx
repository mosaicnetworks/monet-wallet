import React from 'react';

import Utils from 'evm-lite-utils';
import styled from 'styled-components';

import { Button, Card, Image } from 'semantic-ui-react';

const SGreen = styled.span`
	color: green !important;
`;

const SRed = styled.span`
	color: red !important;
`;

interface Props {
	moniker: string;
	address: string;
	upVotes: number;
	downVotes: number;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Nominee: React.FunctionComponent<Props> = props => {
	return (
		<React.Fragment>
			<Card>
				<Card.Content>
					<Image
						floated="right"
						size="mini"
						src="https://image.flaticon.com/icons/svg/31/31996.svg"
					/>
					<Card.Header>
						{capitalize(
							props.moniker.replace(/\u0000/g, '') || 'No Name'
						)}
					</Card.Header>
					<Card.Meta>Nominee</Card.Meta>
					<Card.Description>
						{Utils.cleanAddress(props.address)}
					</Card.Description>
				</Card.Content>
				<Card.Content extra={true}>
					<SGreen>Up Votes:</SGreen> {props.upVotes} -{' '}
					<SRed>Down Votes:</SRed> {props.downVotes}
				</Card.Content>
				<Card.Content extra={true}>
					<div className="ui two buttons">
						<Button color="green">Approve</Button>
						<Button color="red">Decline</Button>
					</div>
				</Card.Content>
			</Card>
		</React.Fragment>
	);
};

export default Nominee;
