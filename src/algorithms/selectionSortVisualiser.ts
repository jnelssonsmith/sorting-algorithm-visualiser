import SortingVisualisation from '../models/SortingVisualisation';
import swapElements from '../utils/swapElements';

/**
 * Selection sort
 * @param {number[]} items - The number array to be sorted using selection sort
 */
const selectionSortVisualiser = (items: number[]) => {
  const visualisation: SortingVisualisation = new SortingVisualisation(
    items,
    'Swaps'
  );

  let mutableArr: number[] = items.map(i => i);
  for (let i = 0; i < mutableArr.length; i++) {
    let minElement: number = mutableArr[0 + i];
    let minIndex: number = 0 + i;

    visualisation.createFrame({
      highlight: [minIndex],
    });

    for (let k: number = 0 + i + 1; k < mutableArr.length; k++) {
      // we are comparing the current min with the rest of the array
      visualisation.createFrame({
        comparison: [minIndex, k],
      });

      let comparisonEl: number = mutableArr[k];

      visualisation.incrementComparisons();
      if (comparisonEl < minElement) {
        visualisation.createFrame({
          operation: [minIndex, k],
        });

        minIndex = k;
        minElement = comparisonEl;
      }
    }

    if (minIndex !== i) {
      visualisation.createFrame({
        operation: [minIndex, i],
      });

      swapElements(mutableArr, minIndex, i);
      visualisation.incrememntOperations();

      visualisation.createFrame({
        updatedPositions: [...mutableArr],
        operation: [minIndex, i],
      });
    }

    visualisation.addOrderedItem(i);
    visualisation.createFrame({});
  }

  return visualisation;
};

export default selectionSortVisualiser;
