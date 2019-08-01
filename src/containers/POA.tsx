import React, { useEffect } from 'react';
import styled from 'styled-components';

import Utils from 'evm-lite-utils';

import { useDispatch, useSelector } from 'react-redux';
import { config, Spring } from 'react-spring/renderprops';
import { Header, Grid, Container, Card } from 'semantic-ui-react';

import { Store } from '../store';

import { POAState, reload } from '../modules/poa';

import Banner from '../components/Banner';
import Nominee from '../components/Nominee';
import SJumbo from '../components/Jumbo';
import FloatingButton from '../components/FloatingButton';
import LoadingButton from '../components/LoadingButton';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const SStatus = styled.div`
	color: green !important;
`;

const SPadding = styled.div`
	margin: 25px 20px;
	margin-bottom: 0 !important;
`;

const SWhitelist = styled(Grid.Column)`
	margin-top: 15px !important;
	padding: 0 !important;
`;

const SWhitelistItemPadding = styled.div`
	padding: 10px !important;
	padding-left: 20px !important;
`;

const SWhitelistItem = styled.div`
	margin-top: 15px !important;
	padding-top: 10px !important;
	padding-bottom: 10px !important;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1) !important;
	background: #fff;
	border-top: 1px solid #eee;

	&:nth-child(2n) {
		border-bottom: none !important;
	}

	& h5 {
		margin-bottom: 0 !important;
	}

	& div {
		word-break: break-all !important;
	}
`;

const POA: React.FunctionComponent<{}> = () => {
	const dispatch = useDispatch();

	const poa = useSelector<Store, POAState>(store => store.poa);

	const reloadPOAData = () => dispatch(reload());

	useEffect(() => {
		reloadPOAData();
	}, []);

	return (
		<React.Fragment>
			<SJumbo>
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
						<SStatus>Online</SStatus>
					</Header.Subheader>
				</Header>
				<Header as="h2" floated="right">
					Validators
					<Header.Subheader>3</Header.Subheader>
				</Header>
			</SJumbo>
			<Banner color="purple">
				All accounts listed here are read in locally from your keystore.
			</Banner>
			<Container fluid={true}>
				<Grid columns="equal">
					<Grid.Column width={10}>
						<SPadding>
							<h2>Nominees</h2>
							<div>
								<Card.Group>
									{poa.nominees.map(nominee => (
										<Nominee
											key={nominee.address}
											moniker={nominee.moniker}
											address={nominee.address}
											upVotes={nominee.upVotes}
											downVotes={nominee.downVotes}
										/>
									))}
								</Card.Group>
								{!poa.nominees.length && 'No nominees found.'}
							</div>
						</SPadding>
					</Grid.Column>
					<SWhitelist>
						<SPadding>
							<h2>Whitelist</h2>
						</SPadding>
						<div>
							{poa.whitelist.map(item => (
								<SWhitelistItem key={item.address}>
									<SWhitelistItemPadding>
										<h5>{capitalize(item.moniker)}</h5>
										<div>
											{Utils.cleanAddress(item.address)}
										</div>
									</SWhitelistItemPadding>
								</SWhitelistItem>
							))}
							<SWhitelistItemPadding>
								{!poa.whitelist.length &&
									'No whitelist entries found.'}
							</SWhitelistItemPadding>
						</div>
					</SWhitelist>
				</Grid>
			</Container>
			<FloatingButton bottomOffset={60}>
				<LoadingButton
					isLoading={poa.loading.whitelist || poa.loading.nomineelist}
					onClickHandler={reloadPOAData}
				/>
			</FloatingButton>
		</React.Fragment>
	);
};

export default POA;
