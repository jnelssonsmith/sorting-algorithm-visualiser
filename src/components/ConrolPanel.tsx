import React from 'react';
import Select from 'react-select';
import { ActionMeta, ValueType } from "react-select/src/types"; // tslint:disable-line no-submodule-imports


import speedOptions from '../config/speedOptions';
import algorithmOptions from '../config/algorithmOptions';
import sizeOptions from '../config/sizeOptions';

import { NumberOption, StringOption } from '../types';


interface ControlPanelProps {
  onSizeChange: (value: ValueType<NumberOption>, actionMeta: ActionMeta) => void,
  onAlgorithmChange: (value: ValueType<StringOption>, actionMeta: ActionMeta) => void,
  onSpeedChange: (value: ValueType<NumberOption>, actionMeta: ActionMeta) => void,
  disabled: boolean,
  speedOption: NumberOption,
  algorithmOption: StringOption,
  sizeOption: NumberOption,
}


const ControlPanel: React.SFC<ControlPanelProps> = ({
  onSizeChange,
  onAlgorithmChange,
  onSpeedChange,
  disabled,
  speedOption,
  algorithmOption,
  sizeOption,
}: ControlPanelProps): JSX.Element => {
  return (
    <section className="control-panel">
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
