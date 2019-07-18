import React, { useState } from 'react';

import { Spring, config } from 'react-spring/renderprops';

interface Props {
	direction: 'left' | 'right';
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Animation: React.FunctionComponent<Props> = props => {
	const [constants] = useState({
		marginLeft: 50,
		marginRight: 50
	});

	return (
		<Spring
			from={{
				[`margin${capitalize(props.direction)}`]: -constants[
					`margin${capitalize(props.direction)}`
				],
				opacity: 0
			}}
			to={{
				marginRight: 0,
				opacity: 1
			}}
			config={config.wobbly}
		>
			{p => {
				return React.Children.map(props.children, (child: any) => {
					return React.cloneElement(child, {
						style: {
							...child.props.style,
							...p
						}
					});
				});
			}}
		</Spring>
	);
};

export default Animation;
