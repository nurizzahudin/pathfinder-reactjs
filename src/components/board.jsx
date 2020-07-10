import React, { Component } from 'react';
import styled from 'styled-components';
import Cell from './cell';

const Grid = styled.table`
	width: calc(100% - 45px);
	height: 100%;
	float: left;
`
const Row = styled.tr``

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nRow: props.row || 10,
			nCol: props.col || 10,
			pointerAction: props.pointerAction || 'Add',
			pointerTarget: props.pointerTarget || 'Start',
			startAvailable: false,
			objectiveCount: 0
		}
	} 

	_generateCell = (row) => {
		const { nCol, nRow, startAvailable, pointerTarget, pointerAction } = this.state;
		const width = Math.floor(100 / nCol);
		const height = Math.floor(100 / nRow);
		let cells = [];
		for(let col = 0; col < nCol; col++) {
			const key = `${row}_${col}`;
			cells.push(
				<Cell 
					width={width} 
					height={height} 
					key={key} 
					startAvailable={startAvailable} 
					pointerAction={pointerAction}
					pointerTarget={pointerTarget}
					listener={this.handleCellEvent} />
			)
		}
		return cells;
	}

	_generateGrid = () => {
		const { nRow } = this.state;
		let rows = [];
		for(let row=0; row < nRow; row++) {
			const cells = this._generateCell(row);
			rows.push(<Row key={row}>{ cells }</Row>);
		}
		return rows;
	}

	handleCellEvent = (e) => {
	 	const { objectiveCount } = this.state;
		switch(e) {
			case 'setStart':
				this.setState({ startAvailable: true })
				break;
			case 'removeStart':
				this.setState({ startAvailable: false })
				break;
			case 'setObjective':
				this.setState({ objectiveCount: objectiveCount + 1 })
				break;
			case 'removeObjective':
				this.setState({ objectiveCount: objectiveCount - 1 })
				break;
			default:
				break;
		}
	}

	_handleRightClick = (e) => {
		if(e.button === 2){
			e.preventDefault();
			return false;
		}
	}

	render() {
		const grids = this._generateGrid();
		console.log(this.state.pointerAction, this.state.pointerTarget)
		return (
			<Grid onContextMenu={this._handleRightClick}><tbody>{ grids }</tbody></Grid>
		)
	}
}