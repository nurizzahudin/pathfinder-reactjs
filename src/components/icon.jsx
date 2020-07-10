import React, { Component } from 'react';
import LineIcon from 'react-lineicons';

const iconStyle = {
	position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
    fontSize: '1vw',
    marginLeft: '50%',
    marginTop: '50%',
    transform: 'translate(-50%, -50%)'
}
const startStyle = Object.assign({}, iconStyle, {color: '#ffcd3c'});
const objectiveStyle = Object.assign({}, iconStyle, { color: '#9b111e'});
const wallStyle = Object.assign({}, iconStyle, { color: '#dc5539'});
const trashStyle = Object.assign({}, iconStyle, { color: '#c21807'});
const plusStyle = Object.assign({}, iconStyle, { color: '#00a86b'});

class StartIcon extends Component {
	render() {
		const style = Object.assign({}, startStyle, this.props.style || {});
		return (<LineIcon name="star-filled" style={style} />)
	}
}

class ObjectiveIcon extends Component {
	render() {
		const style = Object.assign({}, objectiveStyle, this.props.style || {});
		return (<LineIcon name="heart" style={style} />)
	}
}

class ObjectiveCompletedIcon extends Component {
	render() {
		const style = Object.assign({}, objectiveStyle, this.props.style || {});
		return (<LineIcon name="heart-filled" style={style} />)
	}
}

class WallIcon extends Component {
	render() {
		const style = Object.assign({}, wallStyle, this.props.style || {});
		return (<LineIcon name="grid" style={style} />)
	}
}

class TrashIcon extends Component {
	render() {
		const style = Object.assign({}, trashStyle, this.props.style || {});
		return (<LineIcon name="trash" style={style} />)
	}
}

class PlusIcon extends Component {
	render() {
		const style = Object.assign({}, plusStyle, this.props.style || {});
		return (<LineIcon name="circle-plus" style={style} />)
	}
}

export {
	StartIcon,
	ObjectiveIcon,
	ObjectiveCompletedIcon,
	WallIcon,
	TrashIcon,
	PlusIcon
}