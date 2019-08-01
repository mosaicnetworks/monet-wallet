import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import utils from 'evm-lite-utils';

import { toast } from 'react-toastify';
import { config, Transition } from 'react-spring/renderprops';
import { Button, Input } from 'semantic-ui-react';

import { AccountsState, IAccountsCreate } from '../modules/accounts';

import Animation from './animations/Animation';

const SOpen = styled.div`
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

const SClose = styled.div`
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

const SContent = styled.div`
	position: fixed;
	bottom: ${props => props.theme.bottomOffset}px;
	right: -361px;
	width: auto;
	background: #fff !important;
	box-shadow: 0 4px 20px -6px #999 !important;

	& h4 {
		background: rgba(0, 0, 0, 0.07);
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
	bottomOffset: number;
	create: IAccountsCreate;
	accounts: AccountsState;
}

const AccountCreate: React.FunctionComponent<Props> = props => {
	const [visible, setVisibility] = useState(false);
	const [fields, setFields] = useState({
		moniker: '',
		password: '',
		verifyPassword: ''
	});

	const handleCreateAccount = () => {
		if (!fields.password || !fields.verifyPassword || !fields.moniker) {
			return toast.error('Both fields must be filled in.');
		}

		if (fields.password !== fields.verifyPassword) {
			return toast.error('Passwords do not match.');
		}

		if (!utils.validMoniker(fields.moniker)) {
			return toast.error(
				'Moniker can only contain letters, numbers and undercores.'
			);
		}

		setVisibility(false);

		props.create(fields.moniker, fields.password.trim());

		setFields({
			moniker: '',
			password: '',
			verifyPassword: ''
		});
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
					enter={{ right: '380px', display: 'block' }}
					leave={{ right: '0px', display: 'none' }}
					config={config.stiff}
				>
					{show =>
						show &&
						(p => (
							<SOpen style={p} onClick={handleCreateAccount}>
								<Button
									icon="check"
									color="green"
									disabled={props.accounts.loading.create}
									loading={props.accounts.loading.create}
								/>
							</SOpen>
						))
					}
				</Transition>
				<Transition
					items={visible}
					from={{ opacity: 0, right: '0px' }}
					enter={{ opacity: 1, right: '380px' }}
					leave={{ opacity: 0, right: '0px' }}
					config={config.stiff}
				>
					{show =>
						show &&
						(p => (
							<SClose
								style={p}
								onClick={() => setVisibility(!visible)}
							>
								<Button
									icon="times"
									disabled={props.accounts.loading.create}
									loading={props.accounts.loading.create}
									color="red"
								/>
							</SClose>
						))
					}
				</Transition>
				{!visible && (
					<Animation direction="right">
						<SOpen onClick={() => setVisibility(true)}>
							<Button
								icon="plus"
								disabled={props.accounts.loading.create}
								loading={props.accounts.loading.create}
								color="green"
							/>
						</SOpen>
					</Animation>
				)}
				<Transition
					items={visible}
					from={{ right: '-380px' }}
					enter={{ right: '0px' }}
					leave={{ right: '-380px' }}
					config={config.stiff}
				>
					{show =>
						show &&
						(props => (
							<SContent style={props}>
								<h4>Create An Account</h4>
								<div className="help">
									Enter a password to encrypt the created
									account.
								</div>
								<div>
									<Input
										placeholder="Moniker"
										type="text"
										onChange={(e, { value }) =>
											setFields({
												...fields,
												moniker: value
											})
										}
									/>
									<br />
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
							</SContent>
						))
					}
				</Transition>
			</React.Fragment>
		</ThemeProvider>
	);
};

export default AccountCreate;
