import React, { useState } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { config, Transition } from 'react-spring/renderprops';
import { Button, Input } from 'semantic-ui-react';

import { Store } from '../store';
import { AccountsState, unlock as unlockAccount } from '../modules/accounts';

import Animation from './animations/Animation';

const Open = styled.div`
	position: fixed;
	bottom: ${props => props.theme.bottomOffset}px;
	right: 0;
	width: auto;
	color: white !important;
	border-top-left-radius: 7px;
	border-bottom-left-radius: 7px;

	&:hover {
		cursor: pointer;
	}

	& button {
		border-top-right-radius: 0px !important;
		border-bottom-right-radius: 0px !important;
		margin: 0 !important;
		margin-left: -2px !important;
	}
`;

const Close = styled.div`
	position: fixed;
	bottom: ${props => props.theme.bottomOffset + 40}px;
	right: 0;
	width: auto;
	color: white !important;
	border-top-left-radius: 7px;
	border-bottom-left-radius: 7px;

	& button {
		border-top-right-radius: 0px !important;
		border-bottom-right-radius: 0px !important;
		margin: 0 !important;
		margin-left: -2px !important;
	}

	&:hover {
		cursor: pointer;
	}
`;

const Content = styled.div`
	position: fixed;
	bottom: ${props => props.theme.bottomOffset}px;
	right: -464px;
	width: auto;
	background: #fff !important;
	box-shadow: 0 4px 20px -6px #999 !important;

	& h4 {
		background: rgba(118, 70, 146, 1);
		color: #fff;
		font-weight: 300 !important;
		padding: 10px 20px;
		margin: 0 !important;
	}

	& div {
		padding: 5px 10px;
		padding-top: 0px;
	}

	& div.help {
		background: rgba(0, 0, 0, 0.02);
		padding: 10px 20px;
		color: #555;
		margin-bottom: 14px;
	}
`;

interface Props {
	address: string;
	bottomOffset: number;
}

const AccountUnlock: React.FunctionComponent<Props> = props => {
	const dispatch = useDispatch();

	const [show, setVisibility] = useState(false);
	const [password, setPassword] = useState('');

	const accounts = useSelector<Store, AccountsState>(store => store.accounts);

	const unlock = () =>
		dispatch(unlockAccount(props.address, password.trim()));

	const handleUnlockAccount = () => {
		if (!password) {
			toast.error('Password cannot be empty.');
			return;
		}

		unlock();
		setPassword('');
	};

	const theme = {
		bottomOffset: props.bottomOffset
	};

	return (
		<ThemeProvider theme={theme}>
			<React.Fragment>
				<Transition
					items={show}
					from={{ right: '-40px' }}
					enter={{ right: '464px' }}
					leave={{ right: '-40px' }}
					config={config.stiff}
				>
					{show =>
						show &&
						(props => (
							<Open style={props}>
								<Button
									icon="check"
									color="green"
									onClick={handleUnlockAccount}
									disabled={accounts.loading.unlock}
									loading={accounts.loading.unlock}
								/>
							</Open>
						))
					}
				</Transition>
				<Transition
					items={show}
					from={{ opacity: 0, right: '0px' }}
					enter={{ opacity: 1, right: '464px' }}
					leave={{ opacity: 0, right: '0px' }}
					config={config.stiff}
				>
					{show =>
						show &&
						(props => (
							<Close
								style={props}
								onClick={() => setVisibility(!show)}
							>
								<Button icon="times" color="red" />
							</Close>
						))
					}
				</Transition>
				{!show && (
					<Animation direction="right">
						<Open onClick={() => setVisibility(true)}>
							<Button icon="lock" color="orange" />
						</Open>
					</Animation>
				)}
				<Transition
					items={show}
					from={{ right: '-464px' }}
					enter={{ right: '0px' }}
					leave={{ right: '-464px' }}
					config={config.stiff}
				>
					{show =>
						show &&
						(props => (
							<Content style={props}>
								<h4>Unlock account</h4>
								<div className="help">
									Unlocked accounts can be used to sign
									transactions without a password.
								</div>
								<div>
									<Input
										placeholder="Password"
										type="password"
										onChange={(_, { value }) =>
											setPassword(value)
										}
									/>
								</div>
							</Content>
						))
					}
				</Transition>
			</React.Fragment>
		</ThemeProvider>
	);
};

export default AccountUnlock;
