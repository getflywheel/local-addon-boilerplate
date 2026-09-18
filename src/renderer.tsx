import path from 'node:path';
import type { AddonRendererContext } from '@getflywheel/local/renderer';
import fs from 'fs-extra';
import React from 'react';
import Boilerplate, { type BoilerplateProps } from './Boilerplate';

interface SiteInfoMenuItem {
	menuItem: string;
	path: string;
	render: (props: Record<string, unknown>) => React.ReactElement;
}

const packageJSON = fs.readJsonSync(path.join(__dirname, '../package.json')) as { slug: string };
const addonID = packageJSON.slug;

export default function (context: AddonRendererContext): void {
	const { hooks } = context;

	/*
	 * The `path` is relative to the context of this hook, which is the currently viewed site.
	 * The full path would look something like `/main/site-info/:siteID/<below-path-var>`
	 */
	hooks.addFilter('siteInfoToolsItem', (menu: SiteInfoMenuItem[]) => [
		...menu,
		{
			menuItem: 'Counter',
			path: `/${addonID}`,
			render: (props: Record<string, unknown>) => (
				<Boilerplate {...(props as unknown as BoilerplateProps)} />
			),
		},
	]);
}
