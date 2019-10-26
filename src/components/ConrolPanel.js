import React from 'react';
import Select from 'react-select';

import speedOptions from '../config/speedOptions';
import algorithmOptions from '../config/algorithmOptions';
import sizeOptions from '../config/sizeOptions';

const ControlPanel = ({
  onSizeChange,
  onAlgorithmChange,
  onSpeedChange,
  onRandomise,
  disabled,
  speedOption,
  algorithmOption,
  sizeOption,
}) => {
  return (
    <section class="control-panel">
      <h2>
        Control Panel
      </h2>
      <div className="controls">
        <div className="control">
          <label>
            Sorting Algorithm
          <Select className="select" value={algorithmOption} onChange={onAlgorithmChange} options={algorithmOptions} />
          </label>
        </div>
        <div className="control">
          <label>
            Array Length
          <Select className="select" value={sizeOption} onChange={onSizeChange} options={sizeOptions} />
          </label>
        </div>
        <div className="control">
          <label>
            Speed
          <Select className="select" value={speedOption} onChange={onSpeedChange} options={speedOptions} />
          </label>
        </div>
        <button disabled={disabled} onClick={onRandomise}>Randomise</button>
      </div>
    </section>
  )
}

export default ControlPanel;