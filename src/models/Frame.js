export default class Frame {
  constructor({
    positioning,
    comparison,
    operation,
    highlight,
    ordered,
    comparisonCount,
    operationCount,
  }) {

    this._positioning = positioning;
    this._comparison = comparison;
    this._operation = operation;
    this._highlight = highlight;
    this._ordered = ordered;
    this._comparisonCount = comparisonCount;
    this._operationCount = operationCount;
  }

  get positioning() { return this._positioning; }
  get comparison() { return this._comparison; }
  get operation() { return this._operation; }
  get highlight() { return this._highlight; }
  get ordered() { return this._ordered; }
  get comparisonCount() { return this._comparisonCount; }
  get operationCount() { return this._operationCount; }
}