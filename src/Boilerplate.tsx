import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';

// https://getflywheel.github.io/local-addon-api/modules/_local_renderer_.html
import * as LocalRenderer from '@getflywheel/local/renderer';

// https://github.com/getflywheel/local-components
import { Button, FlyModal, Text, Title } from '@getflywheel/local-components';

interface BoilerplateAddonData {
	count: number;
}

interface BoilerplateSite {
	id: string;
	boilerplateAddon?: BoilerplateAddonData;
}

export interface BoilerplateProps {
	site: BoilerplateSite;
}

export default function Boilerplate({ site }: BoilerplateProps): React.ReactElement {
	const [count, setCount] = useState<number>(site.boilerplateAddon?.count ?? 0);
	const [showInstructions, setShowInstructions] = useState<boolean>(false);

	useEffect(() => {
		ipcRenderer.once('instructions', () => {
			setShowInstructions(true);
		});

		return () => {
			ipcRenderer.removeAllListeners('instructions');
		};
	}, []);

	function saveCount(): void {
		ipcRenderer.send('save-count', site.id, count);
	}

	async function randomlySetCount(): Promise<void> {
		const newCount = (await LocalRenderer.ipcAsync('get-random-count')) as number;
		setCount(newCount);
	}

	return (
		<div style={{ flex: '1', overflowY: 'auto', margin: '10px' }}>
			<h2>Hello, World!</h2>

			<FlyModal isOpen={showInstructions} onRequestClose={() => setShowInstructions(false)}>
				<Title>Boilerplate Add-on</Title>
				<div style={{ padding: '20px' }}>
					<Text>
						You just saved the count for this site! You can exit this add-on and return to find the
						count will remain the same (but only if you save!). This is a boilerplate add-on to help
						you get started with development. Visit{' '}
						<a href="https://localwp.com/get-involved">the Local webpage about add-ons</a> for more
						information about making an add-on for Local. We can&apos;t wait to see what you create!
					</Text>
				</div>
			</FlyModal>

			<p>Count: {count}</p>

			<div>
				<Button onClick={() => setCount((c) => c - 1)}>Decrement Count</Button> &nbsp;
				<Button onClick={() => setCount((c) => c + 1)}>Increment Count</Button> &nbsp;
				<Button onClick={() => void randomlySetCount()}>Randomize Count</Button> &nbsp;
				<Button onClick={saveCount}>Save Count</Button>
			</div>
		</div>
	);
}
