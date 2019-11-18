import SortingVisualisation from '../models/SortingVisualisation';
import swapElements from '../utils/swapElements';

/**
 * Bubble sort
 * @param {number[]} items - The number array to be sorted using bubble sort
 */
const bubbleSortVisualiser = (items: number[]): SortingVisualisation => {
  const visualisation: SortingVisualisation = new SortingVisualisation(
    items,
    'Swaps'
  );

  let mutableArr: number[] = items.map(i => i);
  for (let i: number = 0; i < mutableArr.length; i++) {
    for (let k: number = 0; k < mutableArr.length - i - 1; k++) {
      /**
       * Push comparison frame for current
       * pair we are looking at
       */
      visualisation.createFrame({
        comparison: [k, k + 1],
      });
      visualisation.incrementComparisons();

      if (mutableArr[k] > mutableArr[k + 1]) {
        /**
         * The two elements need to swap, so we push a
         * frame indicating that they are out of order
         */
        visualisation.createFrame({
          operation: [k, k + 1],
        });

        swapElements(mutableArr, k, k + 1);
        visualisation.incrememntOperations();

        /**
         * Push frame with them after the swap to help indicate
         * that they have swapped
         */
        visualisation.createFrame({
          updatedPositions: [...mutableArr],
          operation: [k, k + 1],
        });

        /**
         * Push comparison frame to show they are now
         * in order
         */
        visualisation.createFrame({
          comparison: [k, k + 1],
        });
      }
    }

    /**
     * At the end of the loop we know that the
     * last index is sorted so we add it to the ordered arr
     */
    const orderedIndex: number = mutableArr.length - i - 1;
    visualisation.addOrderedItem(orderedIndex);
    visualisation.createFrame({});
  }

  return visualisation;
};

export default bubbleSortVisualiser;
