import React from 'react';

import styled from 'styled-components';

import utils, { Currency } from 'evm-lite-utils';

import { useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';

import Avatar from '../components/Avatar';
import Transfer from '../components/Transfer';

import { SContent } from '../components/styled';

import { selectedAccount } from '../selectors';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const SJumbotron = styled(Jumbotron)`
	box-shadow: 0 2px 20px -15px #ddd !important;
`;

const SHeadingContainer = styled(Container)`
	padding: 0 5px !important;
`;

const Accounts: React.FunctionComponent<{}> = () => {
	const selected = useSelector(selectedAccount);

	const renderUnlocked = () => (
		<SContent>
			<Container>
				<Transfer />
			</Container>
		</SContent>
	);

	const parseBalance = (balance: Currency) => {
		const b = balance.format('T');
		const l = b.split('.');

		if (l.length !== 2) {
			return l.join('.');
		}

		if (l[1]) {
			l[1] = l[1].slice(0, 4);
		}

		return l.join('.') + 'T';
	};

	return (
		<>
			<SJumbotron fluid={true}>
				<SHeadingContainer>
					<Row noGutters={true} className="align-items-center">
						<Col md={6} lg={8}>
							{selected ? (
								<Media>
									<Avatar address={selected.address} />
									<Media.Body>
										<h3>{capitalize(selected.moniker)}</h3>
										<p className={'mono'}>
											{utils.cleanAddress(
												selected.address
											)}
										</p>
									</Media.Body>
								</Media>
							) : (
								<>
									<h3>Not Selected</h3>
									<p>Use the dropdown to select an account</p>
								</>
							)}
						</Col>
						<Col>
							<h4>Balance</h4>
							<p className={(selected && 'mono') || ''}>
								{selected
									? parseBalance(selected.balance)
									: '-'}
							</p>
						</Col>
						<Col>
							<h4>Nonce</h4>
							<p className={(selected && 'mono') || ''}>
								{selected ? selected.nonce : '-'}
							</p>
						</Col>
					</Row>
				</SHeadingContainer>
			</SJumbotron>
			{selected && renderUnlocked()}
		</>
	);
};

export default Accounts;
