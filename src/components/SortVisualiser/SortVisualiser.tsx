import React from 'react';
import { ActionMeta, ValueType } from 'react-select/src/types'; // tslint:disable-line no-submodule-imports

// config
import { defaultSizeOption } from '../../config/sizeOptions';
import { defaultAlgorithmOption } from '../../config/algorithmOptions';
import { defaultSpeedOption } from '../../config/speedOptions';

// types
import { AlgoOption, NumberOption } from '../../types';
import { SortVisualiserProps, SortVisualiserState } from './SortVisualiser.types';

// utils
import generateRandomArr from '../../utils/generateRandomArr';

// components
import VisualisationController from '../VisualisationController';
import ControlPanel from '../ConrolPanel';

/**
 * Here we define the max and min height of the random number
 * arrays that we generate, we keep the minimum height > 0 to 
 * make it easier to see each item
 */
const MAX_ARR_NUM: number = 100;
const MIN_ARR_NUM: number = 10;

class SortVisualiser extends React.Component<SortVisualiserProps, SortVisualiserState> {
  public constructor(props: SortVisualiserProps) {
    super(props);

    this.state = {
      items: generateRandomArr(
        defaultSizeOption.value,
        MIN_ARR_NUM,
        MAX_ARR_NUM
      ),
      sizeOption: defaultSizeOption,
      algorithmOption: defaultAlgorithmOption,
      visualisationInProgress: false,
      speedOption: defaultSpeedOption,
    };
  }

  public handleSizeChange = (
    option: ValueType<NumberOption>,
    _: ActionMeta
  ): void => {
    const numOption = option as NumberOption;
    this.setState({
      sizeOption: numOption,
      items: generateRandomArr(numOption.value, MIN_ARR_NUM, MAX_ARR_NUM),
    });
  };

  public handleAlgorithmChange = (
    option: ValueType<AlgoOption>,
    _: ActionMeta
  ): void => {
    const strOption = option as AlgoOption;
    this.setState({
      algorithmOption: strOption,
    });
  };

  public handleRandomise = (): void => {
    this.setState(prevState => {
      const prevSizeOpt = prevState.sizeOption as NumberOption;
      return {
        items: generateRandomArr(prevSizeOpt.value, MIN_ARR_NUM, MAX_ARR_NUM),
      };
    });
  };

  public handleSpeedChange = (
    option: ValueType<NumberOption>,
    _: ActionMeta
  ): void => {
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

    if (!sizeOption || !speedOption || !algorithmOption) {
      return null;
    }

    const safeSizeOpt = sizeOption as NumberOption;
    const safeSpeedOpt = speedOption as NumberOption;
    const safeAlgoOpt = algorithmOption as AlgoOption;

    return (
      <>
        <ControlPanel
          disabled={visualisationInProgress}
          speedOption={safeSpeedOpt}
          algorithmOption={safeAlgoOpt}
          sizeOption={safeSizeOpt}
          onSizeChange={this.handleSizeChange}
          onSpeedChange={this.handleSpeedChange}
          onAlgorithmChange={this.handleAlgorithmChange}
        />
        <VisualisationController
          onReset={this.handleRandomise}
          algorithm={safeAlgoOpt.value}
          speed={safeSpeedOpt.value}
          items={items}
          onRandomise={this.handleRandomise}
          visualisationInProgress={visualisationInProgress}
          onVisualisationStatusChange={this.handleVisualisationStatusChange}
        />
      </>
    );
  }
}

export default SortVisualiser;
