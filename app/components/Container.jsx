import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd'
import Cell from './Cell.jsx';

@DragDropContext(HTML5Backend)
export default class Container extends React.Component {
  render() {
    const { id } = this.props;
    return <Cell id = {id}/> 
  }
}
