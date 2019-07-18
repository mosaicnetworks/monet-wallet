import React from 'react';

import styled from 'styled-components';
import Utils from 'evm-lite-utils';

import { Card, Button, Image } from 'semantic-ui-react';

const Green = styled.span`
	color: green !important;
`;

const Red = styled.span`
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
					<Green>Up Votes:</Green> {props.upVotes} -{' '}
					<Red>Down Votes:</Red> {props.downVotes}
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
