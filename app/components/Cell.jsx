import React from 'react';
import Animal from './Animal.jsx';
import { findDOMNode } from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd'

let cnt = 1;
const canMove = (s, t) => {
    let [xs, ys] = [Math.floor(s/4), s % 4];
    let [xt, yt] = [Math.floor(t/4), t % 4];
    // return ((Math.abs(xs-xt) + Math.abs(ys-yt)) == 1) ? true : false;
    return true
};

const cellSource = {
  beginDrag(props) {
  return {
      moveCells: props.moveCells,
      animal: props.animal,
      index: props.index,
      id: props.id
      };
  }
};

const cellTarget = {
  hover(props, monitor, component) {
      const sourceIndex = monitor.getItem().index;
      const targetIndex = props.index;

      if (sourceIndex === targetIndex) {
        return;
      }

      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      console.log(clientOffset);
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;


      if (sourceIndex < targetIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (sourceIndex > targetIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Don't replace items with themselves
      // if(canMove(sourceIndex, targetIndex)) {
        // cnt = cnt + 1;
        // console.log('moveeee' + cnt);
        props.moveCells(sourceIndex, targetIndex);
      // }
      // console.log(targetIndex);
       monitor.getItem().index = targetIndex;
  }
};


// @DragDropContext(HTML5Backend)
@DropTarget('ANIMAL', cellTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource('ANIMAL', cellSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))

export default class Cell extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const {id, animal, isDragging, connectDragSource, connectDropTarget} = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
       <div id={id} style={{ opacity }} className="cell">
        {animal}
       </div>
  	));
  }
}
