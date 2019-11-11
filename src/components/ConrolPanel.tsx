import React from 'react';
import Select from 'react-select';

import speedOptions from '../config/speedOptions';
import algorithmOptions from '../config/algorithmOptions';
import sizeOptions from '../config/sizeOptions';

const ControlPanel = ({
  onSizeChange,
  onAlgorithmChange,
  onSpeedChange,
  disabled,
  speedOption,
  algorithmOption,
  sizeOption,
}) => {
  return (
    <section class="control-panel">
      <h2>Options</h2>
      <div className="controls">
        <div className="control">
          <label>
            Sorting Algorithm
            <Select
              className="select"
              isDisabled={disabled}
              value={algorithmOption}
              onChange={onAlgorithmChange}
              options={algorithmOptions}
            />
          </label>
        </div>
        <div className="control">
          <label>
            Array Length
            <Select
              className="select"
              isDisabled={disabled}
              value={sizeOption}
              onChange={onSizeChange}
              options={sizeOptions}
            />
          </label>
        </div>
        <div className="control">
          <label>
            Speed
            <Select
              className="select"
              isDisabled={disabled}
              value={speedOption}
              onChange={onSpeedChange}
              options={speedOptions}
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default ControlPanel;
