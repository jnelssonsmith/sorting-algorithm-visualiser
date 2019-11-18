import Frame from './Frame';

type SortingVisualisationFrameConfig  = {
  updatedPositions?: number[],
  comparison?: number[],
  operation?: number[],
  highlight?: number[],
}

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

  static getDefaultFrame = (items: number[]): Frame =>
    new Frame({
      positioning: [...items],
      comparison: [],
      operation: [],
      highlight: [],
      ordered: [],
      comparisonCount: 0,
      operationCount: 0,
    });

  private _getLastPositioning = (): number[] => {
    return this._frames.length
      ? this._frames[this._frames.length - 1].positioning
      : [];
  };

  public createFrame = ({
    updatedPositions = [...this._getLastPositioning()],
    comparison = [],
    operation = [],
    highlight = [],
  }: SortingVisualisationFrameConfig): void => {
    const nextFrame = new Frame({
      positioning: updatedPositions,
      comparison,
      operation,
      highlight,
      ordered: [...this._orderedItems],
      comparisonCount: this._comparisonCount,
      operationCount: this._operationCount,
    });

    this._frames.push(nextFrame);
  };

  public incrementComparisons = (): void => {
    this._comparisonCount += 1;
  };

  public incrememntOperations = (): void => {
    this._operationCount += 1;
  };

  public addOrderedItem = (item: number): void => {
    this._orderedItems.push(item);
  };

  public getCurrentPositioning = (): number[] => [...this._getLastPositioning()];

  public getNextFrame = (): Frame => {
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

  public isFinished = (): boolean => this._finished;

  public getFrameIndex = (): number => this._currentFrameIndex;

  public isLastFrame = (): boolean => this._currentFrameIndex === this._frames.length - 1;
}
