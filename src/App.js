import React from 'react';
import './App.css';

import SortVisualiser from './components/SortVisualiser';
import ControlPanel from './components/ConrolPanel';

const getRandomArr = (length) => {
  return Array.apply(null, Array(length)).map(function() { return Math.floor(Math.random() * 90) + 10; })
}

const INITIAL_ALGORITHM = "BUBBLE";
const INITIAL_SIZE = 20;

// 10, 20, 50, 100, 200
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: getRandomArr(INITIAL_SIZE),
      size: INITIAL_SIZE,
      algorithm: INITIAL_ALGORITHM,
    }
  }


  handleSizeChange = (e) => {
    const newSize = Number.parseInt(e.target.value, 10);
    this.setState({
      size: newSize,
      items: getRandomArr(newSize)
    })
  }

  handleAlgorithmChange = (algorithm) => {

  }

  handleRandomise = () => {
    this.setState(prevState => ({
      items: getRandomArr(prevState.size)
    }))
  }

  render() {
    const { items } = this.state;
    console.log(items.length)
    return (
      <div className="App">
        <header className="App-header">
          <h1>Test</h1>
        </header>
        <main>
          <ControlPanel
            onSizeChange={this.handleSizeChange}
            onAlgorithmChange={this.handleAlgorithmChange}
            onRandomise={this.handleRandomise}          
          />
          <SortVisualiser items={items}></SortVisualiser>
        </main>
      </div>
    );
  }
  
}

export default App;
