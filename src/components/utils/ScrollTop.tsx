import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import ReactTooltip from 'react-tooltip';

const ScrollTop: React.FC<{}> = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
		ReactTooltip.rebuild();
	}, [pathname]);

	return null;
};

export default ScrollTop;
