import {AlgoOption, Algorithms} from '../types';

/**
 * Users can pick from a range of sorting algorithms to see
 * in action, used by the algo select input
 */
const algorithmOptions: AlgoOption[] = [
  { value: Algorithms.MERGE, label: 'Merge Sort' },
  { value: Algorithms.QUICK, label: 'Quick Sort' },
  { value: Algorithms.BUBBLE, label: 'Bubble Sort' },
  { value: Algorithms.SELECTION, label: 'Selection Sort' },
  { value: Algorithms.INSERTION, label: 'Insertion Sort' },
];

// use merge sort by default, it's a cool looking algo ;)
export const defaultAlgorithmOption: AlgoOption = algorithmOptions[0];
export default algorithmOptions;
