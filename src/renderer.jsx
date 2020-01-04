import Boilerplate from './Boilerplate';

export default function (context) {
	const { React, hooks } = context;
	const { Route } = context.ReactRouter;

	// Create the route/page of content that will be displayed when the menu option is clicked
	hooks.addContent('routesSiteInfo', () => <Route key="boilerplate-addon" path="/main/site-info/:siteID/boilerplate"
		render={(props) => <Boilerplate {...props} />} />);


	// Add menu option within the site menu bar
	hooks.addFilter("siteInfoMoreMenu", function (menu, site) {
		menu.push({
			label: "Boilerplate Addon",
			enabled: true,
			click: () => {
				context.events.send('goToRoute', `/main/site-info/${site.id}/boilerplate`);
			}
		});

		return menu;
	});
}
