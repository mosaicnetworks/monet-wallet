import React, { useState } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { toast } from 'react-toastify';
import { config, Transition } from 'react-spring/renderprops';
import { Button, Input } from 'semantic-ui-react';

import { AccountsState } from '../modules/accounts';

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
		box-shadow: 0 4px 20px -6px #000 !important;
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
	right: -341px;
	width: auto;
	background: #fff !important;
	box-shadow: 0 4px 20px -6px #999 !important;

	& h4 {
		background: rgba(0, 0, 0, 0.04);
		padding: 10px;
		letter-spacing: 0.5px;
		margin: 0 !important;
	}
	& div {
		padding: 5px 10px;
		padding-top: 0px;
	}
	& div.help {
		background: rgba(0, 0, 0, 0.02);
		padding: 4px 10px;
		color: #888;
		margin-bottom: 14px;
	}
`;

interface Props {
	bottomOffset: number;
	create: any;
	accounts: AccountsState;
}

const AccountCreate: React.FunctionComponent<Props> = props => {
	const [visible, setVisibility] = useState(false);
	const [fields, setFields] = useState({
		password: '',
		verifyPassword: ''
	});

	const handleCreateAccount = () => {
		if (!fields.password || !fields.verifyPassword) {
			toast.error('Both fields must be filled in.');
			return;
		}

		if (fields.password !== fields.verifyPassword) {
			toast.error('Passwords do not match.');
			return;
		}

		setVisibility(false);
		setFields({
			password: '',
			verifyPassword: ''
		});

		props.create(fields.password);
	};

	const theme = {
		bottomOffset: props.bottomOffset
	};

	return (
		<ThemeProvider theme={theme}>
			<React.Fragment>
				<Transition
					items={visible}
					from={{ right: '0px', display: 'none' }}
					enter={{ right: '340px', display: 'block' }}
					leave={{ right: '0px', display: 'none' }}
					config={config.stiff}
				>
					{show =>
						show &&
						(p => (
							<Open style={p} onClick={handleCreateAccount}>
								<Button
									icon="check"
									color="green"
									disabled={props.accounts.loading.create}
									loading={props.accounts.loading.create}
								/>
							</Open>
						))
					}
				</Transition>
				<Transition
					items={visible}
					from={{ opacity: 0, right: '0px' }}
					enter={{ opacity: 1, right: '340px' }}
					leave={{ opacity: 0, right: '0px' }}
					config={config.stiff}
				>
					{show =>
						show &&
						(p => (
							<Close
								style={p}
								onClick={() => setVisibility(!visible)}
							>
								<Button
									icon="times"
									disabled={props.accounts.loading.create}
									loading={props.accounts.loading.create}
									color="red"
								/>
							</Close>
						))
					}
				</Transition>
				{!visible && (
					<Animation direction="right">
						<Open onClick={() => setVisibility(true)}>
							<Button
								icon="plus"
								disabled={props.accounts.loading.create}
								loading={props.accounts.loading.create}
								color="green"
							/>
						</Open>
					</Animation>
				)}
				<Transition
					items={visible}
					from={{ right: '-340px' }}
					enter={{ right: '0px' }}
					leave={{ right: '-340px' }}
					config={config.stiff}
				>
					{show =>
						show &&
						(props => (
							<Content style={props}>
								<h4>Create An Account</h4>
								<div className="help">
									Enter a password to encrypt the created
									account.
								</div>
								<div>
									<Input
										placeholder="Set Password"
										type="password"
										onChange={(e, { value }) =>
											setFields({
												...fields,
												password: value
											})
										}
									/>
									<br />
									<Input
										placeholder="Verify Password"
										type="password"
										onChange={(e, { value }) =>
											setFields({
												...fields,
												verifyPassword: value
											})
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

export default AccountCreate;
