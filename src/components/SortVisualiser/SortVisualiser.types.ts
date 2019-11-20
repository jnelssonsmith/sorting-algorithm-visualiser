import { ValueType } from 'react-select/src/types'; // tslint:disable-line no-submodule-imports
import { NumberOption, AlgoOption } from '../../types';

export interface SortVisualiserProps {}

export interface SortVisualiserState {
  items: number[];
  sizeOption: ValueType<NumberOption>;
  algorithmOption: ValueType<AlgoOption>;
  visualisationInProgress: boolean;
  speedOption: ValueType<NumberOption>;
}