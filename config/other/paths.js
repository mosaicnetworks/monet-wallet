const path = require('path');
const fs = require('fs');

const resolveRelativeToApp = relativePath =>
	path.resolve(fs.realpathSync(process.cwd()), relativePath);

module.exports = {
	paths: {
		dist: resolveRelativeToApp('dist'),
		indexHTML: resolveRelativeToApp('src/index.html'),
		indexJS: resolveRelativeToApp('src/app/index.tsx'),
		nodeModules: resolveRelativeToApp('node_modules'),
		packageJSON: resolveRelativeToApp('package.json'),
		src: resolveRelativeToApp('src'),
		tsConfig: resolveRelativeToApp('tsconfig.json'),
		tsLint: resolveRelativeToApp('tslint.json')
	}
};
