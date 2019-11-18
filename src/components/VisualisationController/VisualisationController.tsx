import React from 'react';
import classNames from 'classnames';

import bubbleSortVisualiser from '../../algorithms/bubbleSortVisualiser';
import selectionSortVisualiser from '../../algorithms/selectionSortVisualiser';
import insertionSortVisualiser from '../../algorithms/insertionSortVisualiser';
import mergeSortVisualiser from '../../algorithms/mergeSortVisualiser';
import quickSortVisualiser from '../../algorithms/quickSortVisualiser';

import arrDifferent from '../../utils/arrDifferent';

import AlgorithmDetailView from '../AlgorithmDetailView';
import algorithmDetails from '../../config/algorithmDetails';
import SortingVisualisation from '../../models/SortingVisualisation';
import Frame from '../../models/Frame';
import {
  VisualisationControllerProps,
  VisualisationControllerState,
} from './VisualisationController.types';
import { Algorithms, AlgorithmDetail } from '../../types';

class VisualisationController extends React.Component<
  VisualisationControllerProps,
  VisualisationControllerState
> {
  private animations: NodeJS.Timeout[];
  private visualisation: SortingVisualisation | null;

  constructor(props: VisualisationControllerProps) {
    super(props);

    this.state = {
      currentFrame: SortingVisualisation.getDefaultFrame(props.items),
    };

    this.animations = [];
    this.visualisation = null;
  }

  componentDidUpdate(prevProps: VisualisationControllerProps) {
    if (arrDifferent(prevProps.items, this.props.items)) {
      this.setState({
        currentFrame: SortingVisualisation.getDefaultFrame(this.props.items),
      });
    }
  }

  getVisualiser(visualiser: string) {
    switch (visualiser) {
      case Algorithms.BUBBLE:
        return bubbleSortVisualiser;
      case Algorithms.SELECTION:
        return selectionSortVisualiser;
      case Algorithms.INSERTION:
        return insertionSortVisualiser;
      case Algorithms.MERGE:
        return mergeSortVisualiser;
      case Algorithms.QUICK:
        return quickSortVisualiser;
      default:
        return bubbleSortVisualiser;
    }
  }

  clearAnimations() {
    this.animations.forEach(anim => {
      clearTimeout(anim);
    });
    this.animations = [];
  }

  handleVisualise = () => {
    this.animations = [];
    this.visualisation = this.getVisualiser(this.props.algorithm)(
      this.props.items
    );
    this.props.onVisualisationStatusChange(true);

    while (!this.visualisation.isFinished()) {
      const frameIndex = this.visualisation.getFrameIndex();
      const frame = this.visualisation.getNextFrame();
      const isFinalFrame = this.visualisation.isLastFrame();

      const anim: NodeJS.Timeout = setTimeout(() => {
        requestAnimationFrame(() => {
          if (isFinalFrame) {
            this.props.onVisualisationStatusChange(false);
          }

          this.setState({
            currentFrame: frame,
          });
        });
      }, frameIndex * this.props.speed);

      this.animations.push(anim);
    }
  };

  handleStop = () => {
    this.clearAnimations();
    this.props.onVisualisationStatusChange(false);
    this.props.onReset();
  };

  renderGraphBar = (item: number, index: number, frame: Frame) => {
    const classes = classNames({
      'graph-bar': true,
      'graph-bar--comparison': frame.comparison.includes(index),
      'graph-bar--swap': frame.operation.includes(index),
      'graph-bar--ordered': frame.ordered.includes(index),
      'graph-bar--highlight': frame.highlight.includes(index),
    });

    return (
      <div
        key={`${index}-${classes}-${item}`}
        style={{ height: `${item}%` }}
        className={classes}
      ></div>
    );
  };

  render() {
    const { currentFrame } = this.state;
    const { algorithm, visualisationInProgress, onRandomise } = this.props;
    const algorithmDetail: AlgorithmDetail = algorithmDetails[algorithm];

    return (
      <div className="visualiser-container">
        <AlgorithmDetailView algorithmDetail={algorithmDetail} />
        <div className="operations-container">
          <p>Comparisons: {currentFrame.comparisonCount}</p>
          <p>Swaps: {currentFrame.operationCount}</p>
        </div>
        <div className="graph-container">
          <div className="graph">
            {currentFrame.positioning.map((item, i) =>
              this.renderGraphBar(item, i, currentFrame)
            )}
          </div>
        </div>
        <div className="visualisation-controls">
          {visualisationInProgress ? (
            <button onClick={this.handleStop}>Stop</button>
          ) : (
            <button onClick={this.handleVisualise}>Visualise</button>
          )}
          <button disabled={visualisationInProgress} onClick={onRandomise}>
            Randomise
          </button>
        </div>
      </div>
    );
  }
}

export default VisualisationController;
