import * as LocalRenderer from '@getflywheel/local/renderer';
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { Button } from '@getflywheel/local-components';

export default class Boilerplate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			siteId: props.match.params.siteID,
			count: this.fetchCount(),
		};

		this.renderCount = this.renderCount.bind(this);
		this.increaseCount = this.increaseCount.bind(this);
		this.decreaseCount = this.decreaseCount.bind(this);
		this.saveCount = this.saveCount.bind(this);
	}

	fetchCount() {
		const site = this.props.sites[this.props.match.params.siteID],
		return site.count ?? 0;
	}

	saveCount() {
		ipcRenderer.send(
			'save-count',
			this.state.siteId,
			this.state.count,
		);
	}

	increaseCount() {
		const oldCount = this.state.count;
		this.setState({
			count: oldCount + 1,
		});
	}

	decreaseCount() {
		const oldCount = this.state.count;
		this.setState({
			count: oldCount - 1,
		});
	}

	renderCount() {
		return <p>Count: {this.state.count}</p>;
	}

    render() {
        return (
            <div style={{ flex: '1', overflowY: 'auto', margin: '10px' }}>
                <h2>Hello, World!</h2>
				{this.renderCount()}
				<div>
					<Button onClick={this.increaseCount}>Increment Count</Button> &nbsp;
					<Button onClick={this.decreaseCount}>Decrement Count</Button> &nbsp;
					<Button onClick={this.saveCount}>Save Count</Button>
				</div>
            </div>
        )
    }

}
