import React from 'react';
import classNames from 'classnames';

import bubbleSortVisualiser from '../algorithms/bubbleSortVisualiser';
import selectionSortVisualiser from '../algorithms/selectionSortVisualiser';
import AlgorithmDetailView from './AlgorithmDetailView';
import algorithmDetails from '../data/algorithm-details.json'

const renderGraphBar = (item, index, frameConfig) => {

  const classes = classNames({
    'graph-bar': true,
    'graph-bar--comparison': frameConfig && frameConfig.comparison.includes(index),
    'graph-bar--swap': frameConfig && frameConfig.swappers.includes(index),
    'graph-bar--ordered': frameConfig && frameConfig.ordered.includes(index),
    'graph-bar--highlight': frameConfig && frameConfig.highlight.includes(index),
  })

  return <div key={`${index}-${classes}-${item}`} style={{height: `${item}%`}} className={classes}></div>
  
}


const arrDifferent = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return true;
  }

  for (let i=0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return true
    }
  }

  return false;
}


class SortVisualiser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFrame: {
        positioning: props.items,
        comparison: [],
        swappers: [],
        highlight: [],
        ordered: [],
        comparisonCount: 0,
        swapCount: 0,
      },
      visualising: false,
    }


    this.animations = []
  }


  componentDidUpdate(prevProps) {
      if (arrDifferent(prevProps.items, this.props.items)) {
        this.setState({
          currentFrame: {
            positioning: this.props.items,
            comparison: [],
            swappers: [],
            highlight: [],
            ordered: [],
            comparisonCount: 0,
            swapCount: 0,
          }
        })
      }
  }


  getVisualiser(visualiser) {
    console.log(visualiser)
    switch (visualiser) {
      case 'BUBBLE':
        return bubbleSortVisualiser;
      case 'SELECTION':
        return selectionSortVisualiser;
      default:
        return bubbleSortVisualiser;
    }
  }

  clearAnimations() {
    this.animations.forEach(anim => {
      clearTimeout(anim);
    })
    this.animations = [];
  }


  handleVisualise = () => {
    this.animations = [];
    const frames = this.getVisualiser(this.props.algorithm)(this.props.items);
    console.log(frames);
    this.setState({
      visualising: true,
    })

    frames.forEach((frame, index) => {
      const anim = setTimeout(() => {
        requestAnimationFrame(() => {

          let stateUpdate = {
            currentFrame: frame
          }

          if (index === (frames.length - 1)) {
            stateUpdate.visualising = false;
          }

          this.setState(stateUpdate)
        })
      }, index * this.props.speed)

      this.animations.push(anim);
    })
  }

  handleStop = () => {
    this.clearAnimations();
    this.setState({
      visualising: false,
    })
    this.props.onReset();
  }


  render() {
    const { currentFrame, visualising } = this.state;
    const { algorithm } = this.props;

    return (
      <div className="visualiser-container">
        <AlgorithmDetailView algorithmDetails={algorithmDetails[algorithm]} />
        <div className="operations-container">
          <p>Comparisons: {currentFrame.comparisonCount}</p>
          <p>Swaps: {currentFrame.swapCount}</p>
        </div>
        <div className="graph-container">
          <div className="graph">
            { 
              currentFrame.positioning.map((item, i) => renderGraphBar(item, i, currentFrame))
            }
          </div>
        </div>
        <div className="visualisation-controls">
          <button disabled={visualising} onClick={this.handleVisualise}>Visualise</button>
          <button disabled={!visualising} onClick={this.handleStop}>Stop</button>
        </div>
      </div>
    )
  }
}


export default SortVisualiser;