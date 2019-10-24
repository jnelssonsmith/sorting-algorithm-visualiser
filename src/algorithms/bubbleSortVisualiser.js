/**
 * Bubble sort
 * @param {number[]} items - The number array to be sorted using bubble sort
 */
const bubbleSortVisualiser = (items) => {
  let frames = [];
  let orderedItems = [];
  let comparisonCount = 0;
  let swapCount = 0;
  
  // push initial frame
  frames.push({
    positioning: items,
    comparison: [],
    swappers: [],
    highlight: [],
    ordered: [...orderedItems],
    comparisonCount: comparisonCount,
    swapCount: swapCount
  })

  let mutableArr = items.map(i => i);
  for (let i = 0; i < mutableArr.length; i++) {
    for (let k = 0; k < mutableArr.length - i - 1; k++) {
      /**
       * Push comparison frame for current 
       * pair we are looking at
       */
      frames.push({
        positioning: [...mutableArr],
        comparison: [k, k + 1],
        swappers: [],
        highlight: [],
        ordered: [...orderedItems],
        comparisonCount: comparisonCount,
        swapCount: swapCount
      })

      comparisonCount += 1;
      if (mutableArr[k] > mutableArr[k + 1]) {
        /**
         * The two elements need to swap, so we push a 
         * frame indicating that they are out of order
         */
        frames.push({
          positioning: [...mutableArr],
          comparison: [],
          swappers: [k, k + 1],
          highlight: [],
          ordered: [...orderedItems],
          comparisonCount: comparisonCount,
          swapCount: swapCount
        })

        swapElements(mutableArr, k, k + 1);
        swapCount += 1;
        /**
         * Push frame with them after the swap to help indicate 
         * that they have swapped
         */
        frames.push({
          positioning: [...mutableArr],
          comparison: [],
          swappers: [k, k + 1],
          highlight: [],
          ordered: [...orderedItems],
          comparisonCount: comparisonCount,
          swapCount: swapCount
        })

        
        
        /**
         * Push comparison frame to show they are now
         * in order
         */
        frames.push({
          positioning: [...mutableArr],
          comparison: [k, k + 1],
          swappers: [],
          highlight: [],
          ordered: [...orderedItems],
          comparisonCount: comparisonCount,
          swapCount: swapCount
        })
      }
    }

    /**
     * At the end of the loop we know that the 
     * last index is sorted so we add it to the ordered arr
     */
    orderedItems.push(mutableArr.length -i -1)
    frames.push({
      positioning: [...mutableArr],
      comparison: [],
      swappers: [],
      highlight: [],
      ordered: [...orderedItems],
      comparisonCount: comparisonCount,
      swapCount: swapCount
    })
  }

  return frames;
}


/**
 * Utility function for swaping two elements in an array
 * NB: modifies given array, is not immutable
 */
const swapElements = (arr, indexA, indexB) => {
  const temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp; 
}

export default bubbleSortVisualiser;