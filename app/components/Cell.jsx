import React from 'react';
import Container from './Container.jsx';
import { findDOMNode } from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd'

let cnt = 1;
const canMove = (s, t) => {
    let [xs, ys] = [Math.floor(s/4), s % 4];
    let [xt, yt] = [Math.floor(t/4), t % 4];
    return ((Math.abs(xs-xt) + Math.abs(ys-yt)) == 1) ? true : false;
};

const cellSource = {
  beginDrag(props) {
  return {
      // moveCells: props.moveCells,
      // // animal: props.animal,
      index: props.cid,
      // id: props.id
      };
  },
  endDrag (props, monitor) {
      const targetIndex = monitor.getDropResult().index
      console.log(targetIndex);
      const sourceIndex = props.cid;
      console.log('aaaa ' + sourceIndex + ' tttooo ' + targetIndex);

      if (sourceIndex === targetIndex) {
        // console.log(sourceIndex + ' ' +targetIndex);
        console.log('d')
        return;
      }
      if(!canMove(sourceIndex, targetIndex)) {
        console.log('c')
        return;
      }

      props.moveCells(sourceIndex, targetIndex);
      // props.moveCells(targetIndex,sourceIndex);
      // console.log(targetIndex);
      monitor.getItem().index = targetIndex;
  }
};

const cellTarget = {
  drop(props) {
    return {
      index: props.cid,
    };
  },
  hover(props, monitor, component) {
    return;
      const sourceIndex = monitor.getItem().index;
      const targetIndex = props.cid;
      // console.log('aaaa ' + sourceIndex + ' tttooo ' + targetIndex);

      if (sourceIndex === targetIndex) {
        // console.log(sourceIndex + ' ' +targetIndex);
        console.log('d')
        return;
      }
      if(!canMove(sourceIndex, targetIndex)) {
        console.log('c')
        return;
      }

      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;


      // if (sourceIndex < targetIndex && hoverClientY < hoverMiddleY) {
      //   console.log('a')
      //   return;
      // }

      // if (sourceIndex > targetIndex && hoverClientY > hoverMiddleY) {
      //   console.log('b')
      //   return;
      // }

      // Don't replace items with themselves
      // if(canMove(sourceIndex, targetIndex)) {
        // cnt = cnt + 1;
        // console.log('moveeee' + cnt);
      console.log(sourceIndex + ' a ' +targetIndex);
      props.moveCells(sourceIndex, targetIndex);
      console.log(sourceIndex + ' aa ' +targetIndex);
      props.moveCells(targetIndex,sourceIndex);
      // }
      console.log(sourceIndex + ' aaa ' +targetIndex);
      monitor.getItem().index = targetIndex;
      // console.log('z');
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
    const {cid, id, index, cell, isDragging, connectDragSource, connectDropTarget} = this.props;
    const opacity = isDragging ? 0 : 1;
    const className = cell ? "cell" : " ";
    return connectDragSource(connectDropTarget(
       <div style={{ opacity }} className={className}>
        {cell} 
       </div>
  	));
  }
}
