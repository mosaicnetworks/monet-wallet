import React from 'react';

import Utils from 'evm-lite-utils';
import styled from 'styled-components';

import { Image, SemanticSIZES } from 'semantic-ui-react';

const AvatarContainer = styled(Image)`
	border-radius: 100px;
`;

interface Props {
	address: string;
	size?: SemanticSIZES;
	float?: 'right' | 'left';
}

const Avatar: React.FunctionComponent<Props> = props => {
	return (
		<AvatarContainer
			floated={props.float}
			size={props.size}
			src={`https://s.gravatar.com/avatar/${Utils.trimHex(
				props.address
			)}?size=100&default=retro`}
		/>
	);
};

export default Avatar;
