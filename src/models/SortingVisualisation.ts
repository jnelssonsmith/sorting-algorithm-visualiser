import Frame from './Frame';

export default class SortingVisualisation {
  private _frames: Frame[];
  private _orderedItems: number[];
  private _comparisonCount: number;
  private _operationCount: number;
  private _operationLabel: string;
  private _finished: boolean;
  private _currentFrameIndex: number;
  
  constructor(items: number[], opLabel: string) {
    this._frames = [];
    this._orderedItems = [];
    this._comparisonCount = 0;
    this._operationCount = 0;
    this._operationLabel = opLabel;
    this._finished = false;
    this._currentFrameIndex = 0;

    const initialFrame = new Frame({
      positioning: [...items],
      comparison: [],
      operation: [],
      highlight: [],
      ordered: [...this._orderedItems],
      comparisonCount: this._comparisonCount,
      operationCount: this._operationCount,
    });

    this._frames.push(initialFrame);
  }

  static getDefaultFrame = (items: number[]) =>
    new Frame({
      positioning: [...items],
      comparison: [],
      operation: [],
      highlight: [],
      ordered: [],
      comparisonCount: 0,
      operationCount: 0,
    });

  _getLastPositioning = () => {
    return this._frames.length
      ? this._frames[this._frames.length - 1].positioning
      : [];
  };

  createFrame = ({
    updatedPositions = [...this._getLastPositioning()],
    comparison = [],
    operation = [],
    highlight = [],
    ordered = [...this._orderedItems],
    comparisonCount = this._comparisonCount,
    operationCount = this._operationCount,
  }) => {
    const nextFrame = new Frame({
      positioning: updatedPositions,
      comparison,
      operation,
      highlight,
      ordered,
      comparisonCount,
      operationCount,
    });

    this._frames.push(nextFrame);
  };

  incrementComparisons = () => {
    this._comparisonCount += 1;
  };

  incrememntOperations = () => {
    this._operationCount += 1;
  };

  addOrderedItem = (item: number) => {
    this._orderedItems.push(item);
  };

  getCurrentPositioning = () => [...this._getLastPositioning()];

  getNextFrame = () => {
    const frameIndex = Math.min(
      this._currentFrameIndex,
      this._frames.length - 1
    );

    if (this._currentFrameIndex < this._frames.length - 1) {
      this._currentFrameIndex += 1;
    } else {
      this._finished = true;
    }

    return this._frames[frameIndex];
  };

  isFinished = () => this._finished;

  getFrameIndex = () => this._currentFrameIndex;

  isLastFrame = () => this._currentFrameIndex === this._frames.length - 1;
}
