import React from 'react';
// import Container from './Container.jsx';
import Board from './Board.jsx';

require('./App.css');

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const rows = [];
    // for (let i = 0; i < 16; i++) {
    //   rows.push(<Container id={'cid' + i}/>);
    // }
    return (
      <Board />
    );
  }
}
