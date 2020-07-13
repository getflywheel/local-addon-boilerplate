import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { Button } from '@getflywheel/local-components';

export default class Boilerplate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//siteId: this.props.sites,
			count: 0,
		};

		this.renderCount = this.renderCount.bind(this);
		this.increaseCount = this.increaseCount.bind(this);
		this.decreaseCount = this.decreaseCount.bind(this);
		this.saveCount = this.saveCount.bind(this);
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
				<Button onClick={this.increaseCount}>Increment Count</Button>
				<Button onClick={this.saveCount}>Save Count for Site -{this.state.siteId}-</Button>
            </div>
        )
    }

}
