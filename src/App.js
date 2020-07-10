import React, { Component } from 'react';
import './App.css';

import SideMenu from './components/sidemenu';
import Board from './components/board';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActivePointerAction: 'Add',
      currentActivePointerTarget: 'Start'
    }
  }
  handleMenuEvent = (action, target) => {
    this.setState({
      currentActivePointerAction: action,
      currentActivePointerTarget: target
    })
  }
  render() {
    const {currentActivePointerTarget, currentActivePointerAction} = this.state;
    return (
      <div className="App">
        <Board row={50} col={50} pointerAction={currentActivePointerAction} pointerTarget={currentActivePointerTarget}/>
        <SideMenu listener={this.handleMenuEvent}/>
      </div>
    )
  }
}