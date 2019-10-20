import React from 'react';

const ControlPanel = ({
  onSizeChange,
  onAlgorithmChange,
  onRandomise,
}) => {
  return (
    <section>
      <label>
        Sorting Algorithm
      <select onChange={onAlgorithmChange}>
        <option selected value="BUBBLE">Bubble Sort</option>
      </select>
      </label>
      <br />
      <label>
        Array Length
      <select onChange={onSizeChange}>
        <option value="10">10</option>
        <option selected value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
      </select>
      </label>
      <button onClick={onRandomise}>Randomise</button>
    </section>
  )
}

export default ControlPanel;