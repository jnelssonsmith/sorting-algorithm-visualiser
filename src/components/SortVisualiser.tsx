import React from 'react';
import classNames from 'classnames';

import bubbleSortVisualiser from '../algorithms/bubbleSortVisualiser';
import selectionSortVisualiser from '../algorithms/selectionSortVisualiser';
import insertionSortVisualiser from '../algorithms/insertionSortVisualiser';
import mergeSortVisualiser from '../algorithms/mergeSortVisualiser';
import quickSortVisualiser from '../algorithms/quickSortVisualiser';

import AlgorithmDetailView from './AlgorithmDetailView';
import algorithmDetails from '../data/algorithm-details.json';
import SortingVisualisation from '../models/SortingVisualisation';

const renderGraphBar = (item, index, frameConfig) => {
  const classes = classNames({
    'graph-bar': true,
    'graph-bar--comparison':
      frameConfig && frameConfig.comparison.includes(index),
    'graph-bar--swap': frameConfig && frameConfig.operation.includes(index),
    'graph-bar--ordered': frameConfig && frameConfig.ordered.includes(index),
    'graph-bar--highlight':
      frameConfig && frameConfig.highlight.includes(index),
  });

  return (
    <div
      key={`${index}-${classes}-${item}`}
      style={{ height: `${item}%` }}
      className={classes}
    ></div>
  );
};

const arrDifferent = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return true;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return true;
    }
  }

  return false;
};

class SortVisualiser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFrame: SortingVisualisation.getDefaultFrame(props.items),
    };

    this.animations = [];
    this.visualisation = null;
  }

  componentDidUpdate(prevProps) {
    if (arrDifferent(prevProps.items, this.props.items)) {
      this.setState({
        currentFrame: SortingVisualisation.getDefaultFrame(this.props.items),
      });
    }
  }

  getVisualiser(visualiser) {
    console.log(visualiser);
    switch (visualiser) {
      case 'BUBBLE':
        return bubbleSortVisualiser;
      case 'SELECTION':
        return selectionSortVisualiser;
      case 'INSERTION':
        return insertionSortVisualiser;
      case 'MERGE':
        return mergeSortVisualiser;
      case 'QUICK':
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

      const anim = setTimeout(() => {
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

  render() {
    const { currentFrame } = this.state;
    const { algorithm, visualisationInProgress, onRandomise } = this.props;

    return (
      <div className="visualiser-container">
        <AlgorithmDetailView algorithmDetails={algorithmDetails[algorithm]} />
        <div className="operations-container">
          <p>Comparisons: {currentFrame.comparisonCount}</p>
          <p>Swaps: {currentFrame.swapCount}</p>
        </div>
        <div className="graph-container">
          <div className="graph">
            {currentFrame.positioning.map((item, i) =>
              renderGraphBar(item, i, currentFrame)
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

export default SortVisualiser;
