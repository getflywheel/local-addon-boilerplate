// https://getflywheel.github.io/local-addon-api/modules/_local_main_.html
import * as Local from "@getflywheel/local";
import * as LocalMain from "@getflywheel/local/main";

export default function (context: LocalMain.AddonMainContext): void {
	// The context object allows us to intereact with various parts of Electron's main thread.
	const { electron } = context;
	const { ipcMain } = electron;

	const { localLogger, siteData } = LocalMain.getServiceContainer().cradle;

	// Local uses Winston for logging which means we can create create child
	// loggers with additional metadata. For example, the below child logger
	// will log something like this within the Local log:
	//
	// {"thread":"main","addon":"boilerplate","level":"info","message":"Saving count 47 for site 5efOKun5u.","timestamp":"2022-12-21T16:43:40.515Z"}
	const logger = localLogger.child({
		thread: "main",
		addon: "boilerplate",
	});

	LocalMain.addIpcAsyncListener("get-random-count", async () => {
		return Math.floor(Math.random() * 100);
	});

	ipcMain.on("save-count", async (event, siteId, count) => {
		LocalMain.sendIPCEvent("instructions");
		logger.log("info", `Saving count ${count} for site ${siteId}.`);
		siteData.updateSite(siteId, {
			id: siteId,
			boilerplateAddon: {
				count,
			},
		} as Partial<Local.SiteJSON>);
	});
}
