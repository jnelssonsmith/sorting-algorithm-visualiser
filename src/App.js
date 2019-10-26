import React from 'react';
import './App.css';

import SortVisualiser from './components/SortVisualiser';
import ControlPanel from './components/ConrolPanel';

import { defaultSizeOption } from './config/sizeOptions';
import { defaultAlgorithmOption } from './config/algorithmOptions';
import { defaultSpeedOption } from './config/speedOptions';

const getRandomArr = (length) => {
  return Array.apply(null, Array(length)).map(function() { return Math.floor(Math.random() * 90) + 10; })
}


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: getRandomArr(defaultSizeOption.value),
      sizeOption: defaultSizeOption,
      algorithmOption: defaultAlgorithmOption,
      visualisationInProgress: false,
      speedOption: defaultSpeedOption,
    }
  }

  handleSizeChange = (option) => {
    this.setState({
      sizeOption: option,
      items: getRandomArr(option.value)
    })
  }

  handleAlgorithmChange = (option) => {
    this.setState({
      algorithmOption: option,
    })
  }

  handleRandomise = () => {
    this.setState(prevState => ({
      items: getRandomArr(prevState.sizeOption.value)
    }))
  }

  handleSpeedChange = (option) => {
    this.setState({
      speedOption: option,
    })
  }

  render() {
    const { items, algorithmOption, visualisationInProgress, sizeOption, speedOption } = this.state;

    return (
      <div className="App">
        <header className="">
          <h1>Sorting Algorithm Visualiser</h1>
        </header>
        <main>
          <div className="layout-l">
            <ControlPanel
              disabled={visualisationInProgress}
              speedOption={speedOption}
              algorithmOption={algorithmOption}
              sizeOption={sizeOption}
              onSizeChange={this.handleSizeChange}
              onSpeedChange={this.handleSpeedChange}
              onAlgorithmChange={this.handleAlgorithmChange}
              onRandomise={this.handleRandomise}          
            />
            <SortVisualiser onReset={this.handleRandomise} algorithm={algorithmOption.value} speed={speedOption.value} items={items}></SortVisualiser>
          </div>
        </main>
        <footer>
          <p>
            Made with <i class="fas fa-heart" /> in Melbourne, Australia
          </p>
          <p>Copyright © 2019 Josh Nelsson-Smith</p>
          </footer>
      </div>
    );
  }
  
}

export default App;
