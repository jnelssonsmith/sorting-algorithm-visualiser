import { NumberOption } from '../types';

/**
 * The different size arrays that the visualiser
 * supports, these could really be anything, but I feel
 * 10-200 gives a good sense of the differences between the
 * algorithms
 */
const sizeOptions: NumberOption[] = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 200, label: '200' },
];

// size of 100 is a good size to show the default algo, merge sort
export const defaultSizeOption: NumberOption = sizeOptions[3];
export default sizeOptions;
