import React from 'react';
import classNames from 'classnames';

import bubbleSortVisualiser from '../algorithms/bubbleSortVisualiser';

const renderGraphBar = (item, index, frameConfig) => {

  const classes = classNames({
    'graph-bar': true,
    'graph-bar--comparison': frameConfig && frameConfig.comparison.includes(index),
    'graph-bar--swap': frameConfig && frameConfig.swappers.includes(index),
    'graph-bar--ordered': frameConfig && frameConfig.ordered.includes(index),
  })

  return <div key={`${index}-${classes}-${item}`} style={{height: `${item}%`}} className={classes}></div>
  
}

const SPEED = 50;



class SortVisualiser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFrame: {
        positioning: props.items,
        comparison: [],
        swappers: [],
        ordered: [],
      }
    }
  }


  handleVisualise = () => {
    const frames = bubbleSortVisualiser(this.props.items);
    frames.forEach((frame, index) => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.setState({
            currentFrame: frame
          })
        })
      }, index * SPEED)
    })
  }


  render() {
    const { currentFrame } = this.state;
    return (
      <>
        <div class="graph-container">
          { 
            currentFrame.positioning.map((item, i) => renderGraphBar(item, i, currentFrame))
          }
        </div>
        <button onClick={this.handleVisualise}>Visualise</button>
      </>
    )
  }
}


export default SortVisualiser;

/**
 * Concept: 
 * 
 * 1. generate a random array of user selected variable length of random numbers between some given 
 * bounds
 * 2. based on sorting algorithm chosen by user, sort array and keep track of the steps taken and return
 * array of animations
 * 3. loop through animation states
 */