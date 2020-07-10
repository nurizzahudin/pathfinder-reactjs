import React, { Component } from 'react';
import styled from 'styled-components';

const Item = styled.div`
	position: relative;
	height: 40px;
	width: 40px;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #ffffff32
	}

	& .tooltip {
	  	visibility: hidden;
	  	width: 120px;
	  	background-color: rgba(0,0,0,0.75);
	  	color: #fff;
	  	text-align: center;
	  	padding: 5px 5px;
	  	border-radius: 6px;
		position: absolute;
		z-index: 1;
		right: 105%;
		margin-top: 50%;
		transform: translateY(-50%);
	}

	& .tooltip::after {
		content: ' ';
		position: absolute;
		top: 50%;
		left: 100%;
		margin-top: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent transparent rgba(0,0,0,0.75);
	}

	&:hover .tooltip {
		visibility: visible;
	}
`

export default class MenuItem extends Component {
	constructor(props) {
		super(props);
		const availableStates = this.props.states || [];
		const currentState = this.props.currentState;
		const currentStateIndex = availableStates.indexOf(currentState);
		this.state = {
			availableStates: availableStates,
			currentStateIndex: currentStateIndex
		}
	}
	_cycleState = () => {
		const { availableStates, currentStateIndex } = this.state;
		const { listener } = this.props;

		const currentState = availableStates[currentStateIndex];
		const nextStateIndex = currentStateIndex === availableStates.length - 1?
			currentStateIndex + 1 - availableStates.length : currentStateIndex + 1;

		if(listener && typeof listener === 'function')
			listener(currentState, availableStates[nextStateIndex]);

		this.setState({currentStateIndex: nextStateIndex});
	}
	render() {
		const { currentStateIndex } = this.state;
		const { children } = this.props;
		const tooltip = this.props.tooltip?<span className="tooltip">{this.props.tooltip}</span>:'';
		const icon = children[0];
		const subIcon = children.slice(1)[currentStateIndex];
		return (
			<Item onClick={this._cycleState}>{icon}{subIcon}{tooltip}</Item>
		)
	}
}