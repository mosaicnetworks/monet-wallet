import { app, BrowserWindow, nativeImage } from 'electron';
import * as path from 'path';

const application = app;
let main: BrowserWindow | null;

function createWindow() {
	const icon = nativeImage.createFromPath(
		path.resolve(__dirname, './assets/monet_logo.png')
	);

	main = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		},
		width: 1350,
		height: 757,
		title: 'Monet Wallet',
		resizable: false,
		fullscreen: false,
		icon
	});

	// createMenu();

	// main.loadURL(`file://${__dirname}/index.html`);
	main.loadURL(`http://localhost:8081`);

	main.on('closed', () => {
		main = null;
	});
}

application.on('ready', createWindow);

application.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

application.on('activate', () => {
	if (main === null) {
		createWindow();
	}
});
