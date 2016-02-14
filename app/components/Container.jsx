import React from 'react';
import Cell from './Cell.jsx';
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class Container extends React.Component {
  render() {
    const {key, cid, cell, moveCells} = this.props;

    return (
        <div className="container">
                <Cell key={key} cid={cid} cell={cell} moveCells={moveCells}/>
        </div>
    );
  }
}
