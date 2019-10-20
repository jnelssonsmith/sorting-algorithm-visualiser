

/**
 * 
 * @param {number[]} items 
 */
const bubbleSortVisualiser = (items) => {
  let frames = [];
  let orderedItems = [];
  
  // push initial frame
  frames.push({
    positioning: items,
    comparison: [],
    swappers: [],
    ordered: orderedItems,
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
        ordered: [...orderedItems],
      })

      if (mutableArr[k] > mutableArr[k + 1]) {
        /**
         * The two elements need to swap, so we push a 
         * frame indicating that they are out of order
         */
        frames.push({
          positioning: [...mutableArr],
          comparison: [],
          swappers: [k, k + 1],
          ordered: [...orderedItems],
        })

        swapElements(mutableArr, k, k + 1);

        /**
         * Push frame with them after the swap to help indicate 
         * that they have swapped
         */
        frames.push({
          positioning: [...mutableArr],
          comparison: [],
          swappers: [k, k + 1],
          ordered: [...orderedItems],
        })
        
        /**
         * Push comparison frame to show they are now
         * in order
         */
        frames.push({
          positioning: [...mutableArr],
          comparison: [k, k + 1],
          swappers: [],
          ordered: [...orderedItems],
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
      ordered: [...orderedItems],
    })
  }

  return frames;
}

const swapElements = (arr, indexA, indexB) => {
  const temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp; 
}

export default bubbleSortVisualiser;