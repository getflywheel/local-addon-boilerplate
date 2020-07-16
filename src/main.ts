import * as LocalMain from '@getflywheel/local/main';

export default function (context) {
	const { electron } = context;
	const { ipcMain } = electron;

	LocalMain.addIpcAsyncListener('get-random-count', async () => {
		return Math.floor(Math.random() * 100);
	});

	ipcMain.on('save-count', async (event, siteId, count) => {
		LocalMain.getServiceContainer().cradle.localLogger.log('info', `Saving count ${count} for site ${siteId}.`);
		LocalMain.SiteData.updateSite(siteId, {
			id: siteId,
			count,
		});
	});
}
