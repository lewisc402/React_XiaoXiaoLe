import React from 'react';
import Cell from './Cell.jsx';
import {DragSource, DropTarget} from 'react-dnd'

const cellSource = {
	beginDrag(props) {
		return {
		  updateCell:props.updateCell,
		  value: props.value,
		  cellId: props.cellId
		};
	}
};

const canMove = (s, t) => {
    let xs = Math.floor(s/4);
    let ys = s % 4; 
    let xt = Math.floor(t/4);
    let yt = t % 4; 
    return ((Math.abs(xs-xt) + Math.abs(ys-yt)) == 1) ? true : false;
};

const cellTarget = {
	canDrop(props, monitor) {
		const sourceProps = monitor.getItem();

    	const targetCellId = props.cellId;
    	const targetValue = props.value;

    	return true;
	},

    drop(props, monitor) {
    	const sourceProps = monitor.getItem();

    	const sourceUpdateCell = sourceProps.updateCell;
    	const sourceCellId = sourceProps.cellId;
    	const sourceValue = sourceProps.value;

    	const targetUpdateCell = props.updateCell;
    	const targetCellId = props.cellId;
    	const targetValue = props.value;

    	if (canMove(sourceCellId, targetCellId)) {
	    	sourceUpdateCell(sourceCellId, targetCellId);
    	}
    }
};

@DropTarget('ANIMAL', cellTarget, (connect) => ({
	connectDropTarget: connect.dropTarget()
}))
@DragSource('ANIMAL', cellSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))
export default class Animal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
    const { id, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

      return(
    	connectDragSource(connectDropTarget(
			<div style={{width:'100%', height:'100%', background: 'gold', opacity }}> 
			 { this.props.value}
		    </div>
		))
      );
	}
}
