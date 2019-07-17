import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { config, Spring } from 'react-spring/renderprops';
import { Header, Grid, Container } from 'semantic-ui-react';

import { Store } from '../store';

import { POAState, whitelist } from '../modules/poa';

import Banner from '../components/Banner';
import Jumbo from '../components/Jumbo';
import FloatingButton from '../components/FloatingButton';
import LoadingButton from '../components/LoadingButton';

const Status = styled.div`
	color: green !important;
`;

const Padding = styled.div`
	margin: 25px 20px;
	margin-bottom: 0 !important;
`;

interface StoreProps {
	poa: POAState;
}

interface DispatchProps {
	handleFetchWhitelist: () => void;
}

interface OwnProps {}

interface State {}

type LocalProps = OwnProps & StoreProps & DispatchProps;

class Accounts extends React.Component<LocalProps, State> {
	public state = {};

	public render() {
		return (
			<React.Fragment>
				<Jumbo>
					<Spring
						from={{
							marginLeft: -50,
							opacity: 0
						}}
						to={{
							marginLeft: 0,
							opacity: 1
						}}
						config={config.wobbly}
					>
						{props => (
							<Header style={props} as="h2" floated="left">
								Proof of Authority
								<Header.Subheader>
									Create new and manage existing accounts
								</Header.Subheader>
							</Header>
						)}
					</Spring>
					<Header as="h2" floated="right">
						Status
						<Header.Subheader>
							<Status>Online</Status>
						</Header.Subheader>
					</Header>
					<Header as="h2" floated="right">
						Validators
						<Header.Subheader>3</Header.Subheader>
					</Header>
				</Jumbo>
				<Banner color="orange">
					All accounts listed here are read in locally from your
					keystore.
				</Banner>
				<Container fluid={true}>
					<Grid columns="equal">
						<Grid.Column width={8}>
							<Padding>
								<h2>Nominate</h2>
							</Padding>
						</Grid.Column>
						<Grid.Column>
							<Padding>
								<h3>Nominee List</h3>
							</Padding>
						</Grid.Column>
						<Grid.Column>
							<Padding>
								<h3>Whitelist</h3>
							</Padding>
						</Grid.Column>
					</Grid>
				</Container>
				<FloatingButton bottomOffset={60}>
					<LoadingButton
						isLoading={false}
						onClickHandler={this.props.handleFetchWhitelist}
					/>
				</FloatingButton>
			</React.Fragment>
		);
	}
}

const mapStoreToProps = (store: Store): StoreProps => ({
	poa: store.poa
});

const mapsDispatchToProps = (dispatch: any): DispatchProps => ({
	handleFetchWhitelist: () => dispatch(whitelist())
});

export default connect<StoreProps, DispatchProps, OwnProps, Store>(
	mapStoreToProps,
	mapsDispatchToProps
)(Accounts);
