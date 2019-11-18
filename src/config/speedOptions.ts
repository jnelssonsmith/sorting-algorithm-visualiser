import { NumberOption } from '../types';

/**
 * The speeds indicate how fast the animation plays back,
 * 5ms is about the threshold where playback stays smooth, 
 * and 1000ms / step is about as slow as I imagine anyone 
 * would ever want
 */
const speedOptions: NumberOption[] = [
  { value: 5, label: '5ms/step' },
  { value: 16, label: '16ms/step' },
  { value: 30, label: '30ms/step' },
  { value: 50, label: '50ms/step' },
  { value: 100, label: '100ms/step' },
  { value: 200, label: '200ms/step' },
  { value: 500, label: '500ms/step' },
  { value: 1000, label: '1000ms/step' },
];

// be as fast and smooth as possible by default, use 5ms
export const defaultSpeedOption: NumberOption = speedOptions[0];
export default speedOptions;
