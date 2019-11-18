import React from 'react';
import './App.scss';
import { ActionMeta, OptionProps, ValueType } from "react-select/src/types"; // tslint:disable-line no-submodule-imports


import SortVisualiser from './components/SortVisualiser';
import ControlPanel from './components/ConrolPanel';

import {StringOption, NumberOption} from './types';

import generateRandomArr from './utils/generateRandomArr';

import { defaultSizeOption } from './config/sizeOptions';
import { defaultAlgorithmOption } from './config/algorithmOptions';
import { defaultSpeedOption } from './config/speedOptions';

const MAX_ARR_NUM: number = 100;
const MIN_ARR_NUM: number = 10;

interface AppProps {}

interface AppState {
  items: number[],
  sizeOption: ValueType<NumberOption>,
  algorithmOption: ValueType<StringOption>,
  visualisationInProgress: boolean,
  speedOption: ValueType<NumberOption>,
}

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);

    this.state = {
      items: generateRandomArr(defaultSizeOption.value, MIN_ARR_NUM, MAX_ARR_NUM),
      sizeOption: defaultSizeOption,
      algorithmOption: defaultAlgorithmOption,
      visualisationInProgress: false,
      speedOption: defaultSpeedOption,
    };
  }

  public handleSizeChange = (option: ValueType<NumberOption>, _: ActionMeta): void => {
    const numOption = option as NumberOption;
    this.setState({
      sizeOption: numOption,
      items: generateRandomArr(numOption.value, MIN_ARR_NUM, MAX_ARR_NUM),
    });
  };

  public handleAlgorithmChange = (option: ValueType<StringOption>, _: ActionMeta): void => {
    const strOption = option as StringOption;
    this.setState({
      algorithmOption: strOption,
    });
  };

  public handleRandomise = (): void => {
    this.setState(prevState => {
      const prevSizeOpt = prevState.sizeOption as NumberOption;
      return {
        items: generateRandomArr(prevSizeOpt.value, MIN_ARR_NUM, MAX_ARR_NUM),
      }
      
    });
  };

  public handleSpeedChange = (option: ValueType<NumberOption>, _: ActionMeta): void => {
    this.setState({
      speedOption: option,
    });
  };

  public handleVisualisationStatusChange = (isVisualising: boolean): void => {
    this.setState({
      visualisationInProgress: isVisualising,
    });
  };

  public render() {
    const {
      items,
      algorithmOption,
      visualisationInProgress,
      sizeOption,
      speedOption,
    } = this.state;

    if (
      !sizeOption ||
      !speedOption ||
      !algorithmOption
    ) {
      return null;
    }

    const safeSizeOpt = sizeOption as NumberOption;
    const safeSpeedOpt = speedOption as NumberOption;
    const safeAlgoOpt = algorithmOption as StringOption;

    return (
      <div className="App">
        <div className="layout">
          <header>
            <h1>Sorting Algorithm Visualiser</h1>
            <p>
              A tool to help better understand how sorting algorithms work. Use
              the control panel below to choose between different algorithms,
              you can also alter the speed of the animations and the number of
              items to be sorted.{' '}
            </p>
          </header>
          <main>
            <ControlPanel
              disabled={visualisationInProgress}
              speedOption={safeSpeedOpt}
              algorithmOption={algorithmOption as StringOption}
              sizeOption={safeSizeOpt}
              onSizeChange={this.handleSizeChange}
              onSpeedChange={this.handleSpeedChange}
              onAlgorithmChange={this.handleAlgorithmChange}
            />
            <SortVisualiser
              onReset={this.handleRandomise}
              algorithm={safeAlgoOpt.value}
              speed={safeSpeedOpt.value}
              items={items}
              onRandomise={this.handleRandomise}
              visualisationInProgress={visualisationInProgress}
              onVisualisationStatusChange={this.handleVisualisationStatusChange}
            />
          </main>
          <footer>
            <p>
              Made with <i className="fas fa-heart" /> in Melbourne, Australia
            </p>
            <p>Copyright © 2019 Josh Nelsson-Smith</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
