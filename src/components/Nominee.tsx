import React from 'react';

import styled from 'styled-components';
import Utils from 'evm-lite-utils';

import { Card, Button, Image } from 'semantic-ui-react';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Green = styled.span`
	color: green !important;
`;

const Red = styled.span`
	color: red !important;
`;

interface State {
	show: boolean;
}

interface Props {
	moniker: string;
	address: string;
	upVotes: number;
	downVotes: number;
}

class Nominee extends React.Component<Props, State> {
	public state = {
		show: false
	};

	public render() {
		const { moniker, address, upVotes, downVotes } = this.props;

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
								moniker.replace(/\u0000/g, '') || 'No Name'
							)}
						</Card.Header>
						<Card.Meta>Nominee</Card.Meta>
						<Card.Description>
							{Utils.cleanAddress(address)}
						</Card.Description>
					</Card.Content>
					<Card.Content extra={true}>
						<Green>Up Votes:</Green> {upVotes} -{' '}
						<Red>Down Votes:</Red> {downVotes}
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
	}
}

export default Nominee;
