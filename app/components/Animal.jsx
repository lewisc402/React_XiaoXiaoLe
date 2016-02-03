import React from 'react';
import Cell from './Cell.jsx';
import { findDOMNode } from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd'

const cellSource = {
    beginDrag(props) {
    return {
        updateCell:props.updateCell,
        value: props.value,
        cellId: props.cellId,
        index: props.index
        };
    }
};

const canMove = (s, t) => {
    let [xs, ys] = [Math.floor(s/4), s % 4];
    let [xt, yt] = [Math.floor(t/4), t % 4];
    return ((Math.abs(xs-xt) + Math.abs(ys-yt)) == 1) ? true : false;
};

const cellTarget = {
    // canDrop(props, monitor) {
    //     const sourceProps = monitor.getItem();
    //     const targetCellId = props.cellId;
    //     const targetValue = props.value;

    //     return true;
    // },

    hover(props, monitor, component) {
        const sourceProps = monitor.getItem();
        const sourceUpdateCell = sourceProps.updateCell;
        const sourceCellId = sourceProps.cellId;

        const targetUpdateCell = props.updateCell;
        const targetCellId = props.cellId;

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // if(hoverClientY < hoverMiddleY) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        targetUpdateCell(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex;
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
    const { cellId, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

      return(
        connectDragSource(connectDropTarget(
    <div className="cell">
        <div style={{border: '1px dashed gray', width:'100%', height:'100%', background: 'gold', opacity }}> 
        { this.props.value}
        </div>
    </div>
        ))
      );
    }
}
