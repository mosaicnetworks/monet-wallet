import React, { useEffect } from 'react';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';

import Avatar from '../components/Avatar';

import { listAccounts } from '../modules/accounts';
import { selectAccounts } from '../selectors';

const SSidebar = styled(Col)`
	background: #fff !important;
	height: calc(100vh - 70px);
	padding: 0 !important;
	margin: 0 !important;
	overflow-x: auto;
	box-shadow: 1px 0px 30px rgba(0, 0, 0, 0.05);
`;

const SAvatar = styled.div`
	display: block;
	cursor: pointer;
	padding: 15px;
	padding-top: 15px;

	img {
		margin: auto !important;
		box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
	}

	:hover {
		background: #fff;
	}
`;

const Sidebar: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);

	const fetchAll = () => dispatch(listAccounts(true));

	useEffect(() => {
		fetchAll();
	}, []);

	return (
		<>
			<SSidebar className="sticky-top-70 text-center" md={1}>
				{accounts.map(a => (
					<SAvatar>
						<Avatar address={a.address} size={45} />
					</SAvatar>
				))}
				{accounts.map(a => (
					<SAvatar>
						<Avatar address={a.address} size={45} />
					</SAvatar>
				))}
			</SSidebar>
		</>
	);
};

export default Sidebar;
