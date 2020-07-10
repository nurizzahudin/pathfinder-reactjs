import React, { Component } from 'react';
import styled from 'styled-components';
import { StartIcon, ObjectiveIcon, WallIcon } from './icon';

const Col = styled.td`
	background-color: #eaeaea;
	width: ${prop => prop.width}%;
	height: ${prop => prop.height}%;
	text-align: center;
	cursor: pointer;
	position: relative;
	
	&.unvisited {
		background-color: #eaeaea;
	}

	&.visited {
		background-color: #eaeaea;
	}

	/*&.wall {
		background-color: #bbbbbb;
	}

	&.start {
		background-image: url(./img/star.png);
	    background-size: contain;
	    background-repeat: no-repeat;
	    background-position: center;
	}

	&.objective {
		background-image: url(./img/objective.png);
	    background-size: contain;
	    background-repeat: no-repeat;
	    background-position: center;
	}*/

	&:hover {
		opacity: 0.5;
	}
`

const cellContentStyle = {
	marginTop: '40%'
}

export default class Cell extends Component {
	constructor(props) {
		super(props);
		const pointerAction = props.pointerAction || 'Add';
		const pointerTarget = props.pointerTarget || 'Start';
		const pointerState = pointerAction + pointerTarget;
		this.state = {
			width: props.width || 10,
			height: props.height || 10,
			pointerState: pointerState,
			role: 'unvisited'
		}
	}

	_transformCell = () => {
		const { role, pointerState } = this.state;
		const listener = this.props.listener;
		console.log(pointerState);
		switch(pointerState) {
			case 'AddWall': 
				if(['wall', 'start', 'objective'].indexOf(role) === -1)
					this.setState({role: 'wall'});
				break;
			case 'RemoveWall':
				if(role === 'wall') 
					this.setState({role: 'unvisited'});
				break;
			case 'AddStart':
				if(['wall', 'start', 'objective'].indexOf(role) === -1 && !this.props.startAvailable)
					this.setState({role: 'start'});
				else if(role === 'start') {
					this.setState({role: 'unvisited'});
				}
				break;
			case 'RemoveStart':
				if(role === 'start')
					this.setState({
						role: 'unvisited'
					})
				break;
			case 'AddObjective':
				if(['wall', 'start', 'objective'].indexOf(role) === -1)
					this.setState({role: 'objective'});
				else if(role === 'objective') {
					this.setState({role: 'unvisited'});
				}
				break;
			case 'removeObjective':
				if(role === 'objective')
					this.setState({
						role: 'unvisited'
					})
				break;
			default:
				break;
		}
		if(listener && typeof listener === 'function') {
			listener(pointerState)
		}
	}

	_handleClick = (e) => {
		if(this.state.pointerState !== 'idle')
			if(e.buttons === 1)
				this._transformCell('click');
	}

	_handleHover = (e) => {
		if(this.state.pointerState !== 'idle')
			if(e.buttons === 1) {
				this._transformCell('hover');
			}
	}

	render() {
		const { role, width, height } = this.state;
		let cellContent;
		if(role === 'start') 
			cellContent = <StartIcon style={cellContentStyle}/>
		else if(role === 'objective') 
			cellContent = <ObjectiveIcon style={cellContentStyle}/>
		else if(role === 'wall') 
			cellContent = <WallIcon style={cellContentStyle}/>
		return(
			<Col
				onMouseDown={this._handleClick}
				onMouseEnter={this._handleHover}
				width={width}
				height={height} 
				className={role}>
				{ cellContent }
			</Col>
		)
	}
}