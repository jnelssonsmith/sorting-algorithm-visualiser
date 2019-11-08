export default class Frame {
  constructor({
    positioning = [],
    comparison = [],
    swappers = [],
    highlight = [],
    ordered = [],
    comparisonCount = 0,
    swapCount = 0,
  }) {

    this.positioning = positioning;
    this.comparison = comparison;
    this.swappers = swappers;
    this.highlight = highlight;
    this.ordered = ordered;
    this.comparisonCount = comparisonCount;
    this.swapCount = swapCount;
  }
}