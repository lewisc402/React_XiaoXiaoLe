import React from 'react';
import Animal from './Animal.jsx';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd'

@DragDropContext(HTML5Backend)
export default class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {id} = this.props;
    const opacity = 1;

    return (
       <div style={{ opacity }} id= {id} className="cell">
        <Animal cellId = {id} value = {this.props.animal} updateCell={this.props.updateCell}/>
       </div>
  	);
  }
}
