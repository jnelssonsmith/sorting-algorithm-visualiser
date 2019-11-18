
/**
 * A FrameConfig does as the name implies, it is an object that is passed
 * to a Frame to configure it
 */
type FrameConfig = {
  positioning: number[],
  comparison: number[],
  operation: number[],
  highlight: number[],
  ordered: number[],
  comparisonCount: number,
  operationCount: number,
}

/**
 * A Frame represents one step in a sorting algorithm, 
 * it contains the current positioning of all the elements that are being sorted,
 * maintains some counts for the number of comparisons/operations and also 
 * stores which elements are being compared, operated on, or should be highlighted.
 */
class Frame {

  // the current ordering of the items
  private _positioning: number[];

  // indicies of which items are currently being compared
  private _comparison: number[];

  // indicies of which items are currently being operated on (generally a swap or insert)
  private _operation: number[];

  // indicies of which items should be highlighted currently (useful for showing pivots etc)
  private _highlight: number[];

  // indices of which items are currently known to be sorted
  private _ordered: number[];

  // the number of comparisons that have occured
  private _comparisonCount: number;
  
  // the number of operations that have occured
  private _operationCount: number;

  constructor({
    positioning,
    comparison,
    operation,
    highlight,
    ordered,
    comparisonCount,
    operationCount,
  }: FrameConfig) {

    this._positioning = positioning;
    this._comparison = comparison;
    this._operation = operation;
    this._highlight = highlight;
    this._ordered = ordered;
    this._comparisonCount = comparisonCount;
    this._operationCount = operationCount;
  }

  public get positioning(): number[] {
    return this._positioning;
  }

  public get comparison(): number[] {
    return this._comparison;
  }

  public get operation(): number[] {
    return this._operation;
  }

  public get highlight(): number[] {
    return this._highlight;
  }

  public get ordered(): number[] {
    return this._ordered;
  }

  public get comparisonCount(): number {
    return this._comparisonCount;
  }

  public get operationCount(): number {
    return this._operationCount;
  }
}

export default Frame;
