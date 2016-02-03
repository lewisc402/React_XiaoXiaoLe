import React from 'react';
import Cell from './Cell.jsx';
import update from 'react/lib/update';
// import Animal from './Animal.jsx';
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.moveCells = this.moveCells.bind(this);
    this.state = {cells:[]};
    this.initCell();
  }
  render() {
    const {cells} = this.state;
    let rows = [];
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 4; j++) {
        const id = i * 4 + j;
        rows.push(<Cell key={cells[id].id} index={id} id={cells[id].id} animal={cells[id].animal} moveCells={this.moveCells} />);
      }
    }

    return (
      <div className="grid">
      <div className="row">
        {cells.filter((elem, i) => { return i < 4}).map((cell, i) => {
          return (
          <Cell key={cell.id} index={i} id={cell.id} animal={cell.animal} moveCells={this.moveCells} />
          );
          }
        )} 
      </div>  
      <div className="row">
        {cells.filter((elem, i) => { return 4 <= i && i < 8}).map((cell, i) => {
          return (
          <Cell key={cell.id} index={i} id={cell.id} animal={cell.animal} moveCells={this.moveCells} />
          );
          }
        )} 
      </div>  
      </div>
    );
  }
  initCell = () => {
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
    let animal = cells[x * 4 + y].animal;
    // matchCells.push([x,y]);
    console.log('matchCells: ' + x + ' ' + y);

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
    if (rows.length >= 3) {
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

    if (cols.length >= 3) {
      matchCells = matchCells.concat(cols);
    }
    // console.log(rows);
    console.log('lll: ' + matchCells.length);
    return matchCells;
  };
  toXY = (id) => {
    return [Math.floor(id / 4), id % 4];
  };
  moveCells = (sourceIndex, targetIndex) => {
    const {cells} = this.state;
    const cell = cells[sourceIndex];
    // if(this.match(this.toXY(sourceIndex)).length >=3) {
      // console.log(sourceIndex + ' ' + targetIndex);
      this.setState(update(this.state, {cells: {$splice: [[sourceIndex,1],[targetIndex,0,cell]]}}));
    // }
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
}
// Board.defaultProps = { r: 'xx' };  init props
