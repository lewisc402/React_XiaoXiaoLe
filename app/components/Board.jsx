import React from 'react';
import Cell from './Cell.jsx';
import Animal from './Animal.jsx';
import update from 'react/lib/update';
import Container from './Container.jsx';
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

// @DragDropContext(HTML5Backend)
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.moveCells = this.moveCells.bind(this);
    this.state = {containers:[]};
    this.initContainers();
  }
  render() {
    const {containers} = this.state;
    let rows = [];

    return (
      <div className="grid">
        {containers.filter((elem, i) => { return true }).map((container, i) => {
          return (
          <Container key={container.id} index={i} cid = {i} cell={container.cell}moveCells={this.moveCells}/>
          );
          }
        )} 
      </div>
    );
  }

  initContainers = () => {
    const animals = ['A','B','C'];
    for(let i = 0; i < 16; i++) {
      let container = {};
      container.id = i;
      // container.cell = i+'cl';
      container.cell = animals[Math.floor(Math.random()*3)];
      this.state.containers.push(container);
    }
  };
  match = ([x, y]) => {
    let matchCells = [];
    let rows = [];
    let cols = [];
    let containers = this.state.containers;
    let cell = containers[x * 4 + y].cell;
    // matchCells.push([x,y]);
    // console.log('matchCells: ' + x + ' ' + y);

    //right
    for(let i=y+1; i<4; i++) {
      let newId = x * 4 + i;
      if(cell == containers[newId].cell) {
        rows.push([x,i]);
      } else break;
    }
    //left
    for(let i=y-1; i>=0; i--) {
      let newId = x * 4 + i;
      if(cell == containers[newId].cell) {
        rows.push([x,i]);
      } else break;
    } 
    if (rows.length >= 2) {
      matchCells = matchCells.concat(rows);
    }
    //up
    for(let i=x-1; i>=0; i--) {
      let newId = i * 4 + y;
      if(cell == containers[newId].cell) {
        cols.push([i,y]);
      } else break;
    }
    //down
    for(let i=x+1; i<4; i++) {
      let newId = i * 4 + y;
      if(cell == containers[newId].cell) {
        cols.push([i,y]);
      } else break;
    }

    if (cols.length >= 2) {
      matchCells = matchCells.concat(cols);
    }
    console.log(matchCells);
    if (matchCells.length >=2) {
      matchCells.push([x,y]);
    }
    return matchCells;
  };
  toXY = (id) => {
    return [Math.floor(id / 4), id % 4];
  };
  moveCells = (sourceIndex, targetIndex) => {
    let {containers} = this.state;
    let cell = containers[sourceIndex];
    const targetcell = containers[targetIndex];

    console.log('sss' + typeof targetIndex);
    let cl = containers[targetIndex].cell;
    containers[targetIndex].cell = containers[sourceIndex].cell; 
    containers[sourceIndex].cell = cl; 
    // let containers2 = update(this.state, {containers: {$splice:}
    this.setState({containers:containers});
    const mcells = this.match(this.toXY(sourceIndex));
    mcells.forEach(([x,y], i) => {
      containers[x * 4 + y].cell = '';
    })
    this.setState({containers:containers});
    this.fillValue();
  };
  fillValue = () => {
    let containers = this.state.containers;
    let animals = ['A','B','C'];
    for(let i = 15; i>=0; i--) {
      if(!containers[i].cell) {
        let [x, y] = this.toXY(i);
        for(let mx = x; mx >= 0; mx--) {
          if(containers[mx * 4 + y].cell) {
            if(mx >= 0) { 
              containers[i].cell = containers[mx * 4 + y].cell;
              containers[mx * 4 + y].cell = '';
              break;
            }
            // } else {
            //   containers[i].cell = animals[Math.floor(Math.random()*3)];
            // }
          } else if(mx == 0) {
            containers[i].cell = animals[Math.floor(Math.random()*3)];
            break;
          }
        }
        // containers[i].cell = animals[Math.floor(Math.random()*3)];
      }
    }
    this.setState({containers});
  };
}
// Board.defaultProps = { r: 'xx' };  init props
