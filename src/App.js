import React from 'react';
import './App.css';

import SortVisualiser from './components/SortVisualiser';
import ControlPanel from './components/ConrolPanel';

const getRandomArr = (length) => {
  return Array.apply(null, Array(length)).map(function() { return Math.floor(Math.random() * 90) + 10; })
}

const INITIAL_ALGORITHM = "BUBBLE";
const INITIAL_SIZE = 20;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: getRandomArr(INITIAL_SIZE),
      size: INITIAL_SIZE,
      algorithm: INITIAL_ALGORITHM,
      visualisationInProgress: false,
    }
  }


  handleSizeChange = (e) => {
    const newSize = Number.parseInt(e.target.value, 10);
    this.setState({
      size: newSize,
      items: getRandomArr(newSize)
    })
  }

  handleAlgorithmChange = (e) => {
    const algorithm = e.target.value;
    this.setState({
      algorithm,
    })
  }

  handleRandomise = () => {
    this.setState(prevState => ({
      items: getRandomArr(prevState.size)
    }))
  }

  render() {
    const { items, algorithm, visualisationInProgress } = this.state;
    console.log(items.length)
    return (
      <div className="App">
        <header className="">
          <h1>Sorting Algorithm Visualiser</h1>
        </header>
        <main>
          <div className="layout-l">
            <ControlPanel
              disabled={visualisationInProgress}
              onSizeChange={this.handleSizeChange}
              onAlgorithmChange={this.handleAlgorithmChange}
              onRandomise={this.handleRandomise}          
            />
            <SortVisualiser onReset={this.handleRandomise} algorithm={algorithm} items={items}></SortVisualiser>
          </div>
        </main>
      </div>
    );
  }
  
}

export default App;
