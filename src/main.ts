import * as LocalMain from '@getflywheel/local/main';

export default function (context) {
	const { electron } = context;
	const { ipcMain } = electron;

	ipcMain.on('save-count', async (event, siteId, count) => {
		LocalMain.getServiceContainer().cradle.localLogger.log('info', `Received count ${count} for site ${siteId}.`);
		LocalMain.SiteData.updateSite(siteId, {
			id: siteId,
			count,
		});
		// event.reply(replyChannel, getResponse(siteId));
	});
}

function getResponse(siteId) {
	const site = LocalMain.SiteData.getSite(siteId);
	site;
	return 0;
}
