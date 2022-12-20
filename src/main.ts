// https://getflywheel.github.io/local-addon-api/modules/_local_main_.html
import * as Local from "@getflywheel/local";
import * as LocalMain from "@getflywheel/local/main";

export default function (context: LocalMain.AddonMainContext): void {
	// The context object allows us to intereact with various parts of Electron's main thread.
	const { electron } = context;
	const { ipcMain } = electron;

	const { localLogger, siteData } = LocalMain.getServiceContainer().cradle;

	LocalMain.addIpcAsyncListener("get-random-count", async () => {
		return Math.floor(Math.random() * 100);
	});

	ipcMain.on("save-count", async (event, siteId, count) => {
		LocalMain.sendIPCEvent("instructions");
		localLogger.log("info", `Saving count ${count} for site ${siteId}.`);
		siteData.updateSite(siteId, {
			id: siteId,
			boilerplateAddon: {
				count,
			},
		} as Partial<Local.SiteJSON>);
	});
}
