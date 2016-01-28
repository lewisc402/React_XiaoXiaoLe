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
    let rows = [];
    let cols = [];
    let cells = this.state.cells;
    matchCells.push([x,y]);

    const id = x * 4 + y;
    let animal = cells[id].animal;
    //right
    for(let i=y+1; i<4; i++) {
      let newId = x * 4 + i;
      if(animal == cells[newId].animal) {
        rows.push([x,i]);
      } else break;
    }
    //left
    for(let i=y-1; i>=0; i--) {
      let newId = x * 4 + i;
      if(animal == cells[newId].animal) {
        rows.push([x,i]);
      } else break;
    } 
    if (rows.length >= 2) {
      matchCells = matchCells.concat(rows);
    }
    //up
    for(let i=x-1; i>=0; i--) {
      let newId = i * 4 + y;
      if(animal == cells[newId].animal) {
        cols.push([i,y]);
      } else break;
    }
    //down
    for(let i=x+1; i<4; i++) {
      let newId = i * 4 + y;
      if(animal == cells[newId].animal) {
        cols.push([i,y]);
      } else break;
    }

    if (cols.length >= 2) {
      matchCells = matchCells.concat(cols);
    }
    // console.log(rows);
    // console.log(cols);
    // console.log(matchCells);

    return matchCells;
  };
  toXY = (id) => {
    return [Math.floor(id / 4), id % 4];
  };
  updateCell = (sourceId, targetId) => {
    let cells = this.state.cells;
    let cleanCells = [];

    [cells[sourceId].animal,cells[targetId].animal] = [cells[targetId].animal,cells[sourceId].animal];
    this.setState({cells});

    let srcCells = this.match(this.toXY(sourceId));
    let targetCells = this.match(this.toXY(targetId));
    if (srcCells.length >= 3) {
      cleanCells = cleanCells.concat(srcCells);
    }
    if (targetCells.length >= 3) {
      cleanCells = cleanCells.concat(targetCells);
    }

    if(cleanCells.length >= 3) {
      cleanCells.forEach((pos) => {
        const [x,y] = pos;
        cells[x*4 + y].animal = '';
      });
    } else {
      [cells[sourceId].animal,cells[targetId].animal] = [cells[targetId].animal,cells[sourceId].animal];
    }
    this.setState({cells});
    this.fillValue();
  };
  fillValue = () => {
    let cells = this.state.cells;
    const animals = ['A','B','C'];
    for(let i = 15; i>=0; i--) {
      if(!cells[i].animal) {
        let [x, y] = this.toXY(i);
        for(let mx = x; mx >= 0; mx--) {
          if(cells[mx * 4 + y].animal) {
            if(mx >= 0) { 
              cells[i].animal = cells[mx * 4 + y].animal;
              cells[mx * 4 + y].animal = '';
              break;
            }
            // } else {
            //   cells[i].animal = animals[Math.floor(Math.random()*3)];
            // }
          } else if(mx == 0) {
            cells[i].animal = animals[Math.floor(Math.random()*3)];
            break;
          }
        }
        // cells[i].animal = animals[Math.floor(Math.random()*3)];
      }
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
