import Frame from './Frame';

export default class SortingVisualisation {
  constructor(items) {
    this.frames = [];

    const initialFrame = new Frame({
      positioning: [...items]
    })

    this.frames.push(initialFrame);
  }
}