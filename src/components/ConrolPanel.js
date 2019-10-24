import React from 'react';

const ControlPanel = ({
  onSizeChange,
  onAlgorithmChange,
  onRandomise,
  disabled,
}) => {
  return (
    <section class="control-panel">
      <h2>
        Control Panel
      </h2>
      <div className="controls">
        <label>
          Sorting Algorithm
        <select disabled={disabled} onChange={onAlgorithmChange}>
          <option selected value="BUBBLE">Bubble Sort</option>
          <option value="SELECTION">Selection Sort</option>
        </select>
        </label>
        <label>
          Array Length
        <select disabled={disabled} onChange={onSizeChange}>
          <option value="10">10</option>
          <option selected value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
        </label>
        <button disabled={disabled} onClick={onRandomise}>Randomise</button>
      </div>
    </section>
  )
}

export default ControlPanel;