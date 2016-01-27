import React from 'react';
import Cell from './Cell.jsx';
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cells:[]};
    this.createCell();
  }
	renderCell(i) {
		return(
 	  	  <Cell key={i} id={this.state.cells[i].id} animal={this.state.cells[i].animal} updateCell={this.updateCell} />
		);
	}
  render() {
    const rows = [];
    for(let i = 0; i < 16; i++) {
      rows.push(this.renderCell(i));
    }

    return (
      <div className="grid" ref="cells">
       {rows}
      </div>
    );
  }
  createCell = () => {
    const cells = this.state.cells;
    const animals = ['A','B','C'];
    for(let i = 0; i < 16; i++) {
      let cell = {};
      cell.id = i;
      cell.animal = animals[Math.floor(Math.random()*3)];
      this.state.cells.push(cell);
    }
  };
  match = ([x, y]) => {
    let matchCells = [];
    let cells = this.state.cells;
    matchCells.push([x,y]);

    const right = (x, y) => {
      let oldId = x * 4 + y;
      let newId = x * 4 + (y + 1);
      if((y + 1) < 4 && cells[oldId].animal == cells[newId].animal) {
        matchCells.push([x, y+1]);
        right(x, y+1);
      } else return;
    }

    const left = (x, y) => {
      let oldId = x * 4 + y;
      let newId = x * 4 + (y - 1);
      if(((y - 1) >= 0) && cells[oldId].animal == cells[newId].animal) {
        matchCells.push([x, y-1]);
        left(x, y-1);
      } else return;
    }

    right(x,y);
    left(x,y);
    return matchCells;
  };
  toXY = (id) => {
    const x = Math.floor(id / 4);
    const y = id % 4;
    return [x, y];
  };
  updateCell = (sourceId, targetId) => {
    let cells = this.state.cells;
    let cleanCells = [];

    [cells[sourceId].animal,cells[targetId].animal] = [cells[targetId].animal,cells[sourceId].animal];
    this.setState({cells});

    if (this.match(this.toXY(sourceId)).length >= 3) {
      cleanCells = cleanCells.concat(this.match(this.toXY(sourceId)));
    }
    if (this.match(this.toXY(targetId)).length >= 3) {
      cleanCells = cleanCells.concat(this.match(this.toXY(targetId)));
    }

    if(cleanCells.length >= 3) {
      cleanCells.forEach((pos) => {
        const [x,y] = pos;
        const id = x*4 + y;
        cells[id].animal = '';
      });
    } else {
      [cells[sourceId].animal,cells[targetId].animal] = [cells[targetId].animal,cells[sourceId].animal];
    }
    this.setState({cells});
  };
  clean = () => {
    const cells = this.refs.cells.childNodes;
    for (let i = 0; i < cells.length; i++) {
      let value = cells[i].textContent;
      let x = Math.floor(i/4);
      let y = i % 4;
      console.log( x + ' ' + y + ' ' + value);
    }
  };
}
// Board.defaultProps = { r: 'xx' };  init props
