import Frame from './Frame';

/**
 * The configuration object that can be passed to
 * the SortingVisualisation when adding a Frame.
 *
 * This has less options than the underlying frame config
 * as we can intelligently use the existing values that
 * are stored in the class variables if not provided by the
 * user
 */
type SortingVisualisationFrameConfig = {
  updatedPositions?: number[];
  comparison?: number[];
  operation?: number[];
  highlight?: number[];
};

/**
 * A SortingVisualisation allows you to build a visualisation
 * made up of 'Frames', which are really just snapshots of
 * the state of an array at different stages during a sort
 *
 * Frames can be added via the createFrame api, and once
 * the visualisation is complete, you can request the
 * frames as needed via the getNextFrame api
 */
export default class SortingVisualisation {
  // the visualisation frames
  private _frames: Frame[];

  // tracks the indicies of which elements are currently sorted
  private _orderedItems: number[];

  // the number of comparisons that have occured
  private _comparisonCount: number;

  // the number of operations that have occured
  private _operationCount: number;

  // the type of operation that occurs (generally swap or insert)
  private _operationLabel: string;

  // whether or not the visualisation has played back all it's frames via getNextFrame
  private _finished: boolean;

  // tracks what frame the requesting service is up to
  private _currentFrameIndex: number;

  /**
   * When the Visualisation is instantiated
   * all we need is the items and the label for the
   * type of operation that occurs, we set the internal
   * variables accordingly and push an initial frame
   *
   * @param items - array of numbers initially
   * @param opLabel - label of operation used in algo
   */
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

  /**
   * Used for when you want to display a
   * static represensation of the array before the
   * visualisation has begun/been fully created
   */
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

  /**
   * Returns the positioning last recorded in a frame or
   * an empty array if no positioning has ever been recorded
   */
  private _getLastPositioning = (): number[] => {
    return this._frames.length
      ? this._frames[this._frames.length - 1].positioning
      : [];
  };

  /**
   * Creates a new frame based on the given config,
   * we set defaults for all the arguments in the
   * config object so users of the api can provide an
   * object that only includes the aspects they want to change
   */
  public createFrame = (
    configObj: SortingVisualisationFrameConfig = {}
  ): void => {
    const {
      updatedPositions = [...this._getLastPositioning()],
      comparison = [],
      operation = [],
      highlight = [],
    } = configObj;

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

  public getCurrentPositioning = (): number[] => [
    ...this._getLastPositioning(),
  ];

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

  public isLastFrame = (): boolean =>
    this._currentFrameIndex === this._frames.length - 1;
}
