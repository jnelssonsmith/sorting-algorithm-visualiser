type FrameConfig = {
  positioning: number[],
  comparison: number[],
  operation: number[],
  highlight: number[],
  ordered: number[],
  comparisonCount: number,
  operationCount: number,
}

class Frame {
  private _positioning: number[];
  private _comparison: number[];
  private _operation: number[];
  private _highlight: number[];
  private _ordered: number[];
  private _comparisonCount: number;
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

  get positioning(): number[] {
    return this._positioning;
  }
  get comparison(): number[] {
    return this._comparison;
  }
  get operation(): number[] {
    return this._operation;
  }
  get highlight(): number[] {
    return this._highlight;
  }
  get ordered(): number[] {
    return this._ordered;
  }
  get comparisonCount(): number {
    return this._comparisonCount;
  }
  get operationCount(): number {
    return this._operationCount;
  }
}

export default Frame;
