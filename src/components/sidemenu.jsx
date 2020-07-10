import React, { Component } from 'react';
import styled from 'styled-components';
import MenuItem from './menuitem';
import { StartIcon, ObjectiveCompletedIcon, WallIcon, TrashIcon, PlusIcon } from './icon';

const Menu = styled.div`
	width: 45px;
	height: 100%;
	float: right;
	background-color: #252552;
	padding: 5px 2px;
`
const iconStyle = {
	fontSize: '2vw'
}
const subIcon = {
	fontSize: '1vw',
	padding: '0.3vw',
	borderRadius: '50%',
	color: 'white',
	top: '10px',
	left: '10px'	
}
const addStyle = Object.assign({}, subIcon, {backgroundColor: '#00a86b'})
const deleteStyle = Object.assign({}, subIcon, {backgroundColor: '#c21807'})

const menuItemState = ['Add', 'Remove']

export default class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expand: false,
			startMenuState: 'Remove',
			objectiveMenuState: 'Add',
			wallMenuState: 'Add'
		}
	}
	handleStartMenuEvent = (current, next) => {
		this.setState({
			startMenuState: next
		})
		this._handleListener('Start', current)
	}
	handleObjectiveMenuEvent = (current, next) => {
		this.setState({
			objectiveMenuState: next
		})
		this._handleListener('Objective', current)
	}
	handleWallMenuEvent = (current, next) => {
		this.setState({
			wallMenuState: next
		})
		this._handleListener('Wall', current)
	}
	_handleListener = (target, action) => {
		const listener = this.props.listener;
		if(listener && typeof listener === 'function')
			listener(target, action);
	} 
	render() {
		const { startMenuState, objectiveMenuState, wallMenuState } = this.state;
		return (
			<Menu>
				<MenuItem 
					tooltip={`${startMenuState} Start Point`} 
					states={menuItemState} 
					currentState={startMenuState} 
					listener={this.handleStartMenuEvent}>
						<StartIcon style={iconStyle}/>
						<PlusIcon style={addStyle}/>
						<TrashIcon style={deleteStyle}/>
				</MenuItem>
				<MenuItem 
					tooltip={`${objectiveMenuState} Objectives`} 
					states={menuItemState} 
					currentState={objectiveMenuState} 
					listener={this.handleObjectiveMenuEvent}>
						<ObjectiveCompletedIcon style={iconStyle}/>
						<PlusIcon style={addStyle}/>
						<TrashIcon style={deleteStyle}/>
				</MenuItem>
				<MenuItem 
					tooltip={`${wallMenuState} Wall`} 
					states={menuItemState} 
					currentState={wallMenuState} 
					listener={this.handleWallMenuEvent}>
						<WallIcon style={iconStyle}/>
						<PlusIcon style={addStyle}/>
						<TrashIcon style={deleteStyle}/>
				</MenuItem>
			</Menu>
		)
	}
}