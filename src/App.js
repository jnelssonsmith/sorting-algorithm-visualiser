import React from 'react';
import './App.scss';

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

  handleVisualisationStatusChange = (isVisualising) => {
    this.setState({
      visualisationInProgress: isVisualising
    })
  }

  render() {
    const { items, algorithmOption, visualisationInProgress, sizeOption, speedOption } = this.state;

    return (
      <div className="App">
        <div className="layout">
          <header>
            <h1>Sorting Algorithm Visualiser</h1>
            <p>A tool to help better understand how sorting algorithms work. Use the control panel below to choose between different algorithms, you can also alter the speed of the animations and the number of items to be sorted. </p>
          </header>
          <main>
            <ControlPanel
                disabled={visualisationInProgress}
                speedOption={speedOption}
                algorithmOption={algorithmOption}
                sizeOption={sizeOption}
                onSizeChange={this.handleSizeChange}
                onSpeedChange={this.handleSpeedChange}
                onAlgorithmChange={this.handleAlgorithmChange}
              />
              <SortVisualiser
                onReset={this.handleRandomise}
                algorithm={algorithmOption.value}
                speed={speedOption.value}
                items={items}
                onRandomise={this.handleRandomise} 
                visualisationInProgress={visualisationInProgress}
                onVisualisationStatusChange={this.handleVisualisationStatusChange}
              />
          </main>
          <footer>
            <p>
              Made with <i class="fas fa-heart" /> in Melbourne, Australia
            </p>
            <p>Copyright © 2019 Josh Nelsson-Smith</p>
            </footer>
          </div>
      </div>
    );
  }
  
}

export default App;
