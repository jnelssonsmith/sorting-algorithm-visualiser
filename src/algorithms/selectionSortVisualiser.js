/**
 * Selection sort
 * @param {number[]} items - The number array to be sorted using selection sort
 */
const selectionSortVisualiser = (items) => {
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
    let minElement = mutableArr[0 + i];
    let minIndex = 0 + i;

    frames.push({
      positioning: [...mutableArr],
      comparison: [],
      swappers: [],
      highlight: [minIndex],
      ordered: [...orderedItems],
      comparisonCount: comparisonCount,
      swapCount: swapCount
    })
  
    for (let k = 0 + i + 1; k < mutableArr.length; k++) {

      // we are comparing the current min with the rest of the array
      frames.push({
        positioning: [...mutableArr],
        comparison: [minIndex, k],
        swappers: [],
        highlight: [],
        ordered: [...orderedItems],
        comparisonCount: comparisonCount,
        swapCount: swapCount
      })

      let comparisonEl = mutableArr[k];

      comparisonCount += 1;
      if (comparisonEl < minElement) {
        frames.push({
          positioning: [...mutableArr],
          comparison: [],
          swappers: [minIndex, k],
          highlight: [],
          ordered: [...orderedItems],
          comparisonCount: comparisonCount,
          swapCount: swapCount
        })

        minIndex = k;
        minElement = comparisonEl;

        frames.push({
          positioning: [...mutableArr],
          comparison: [],
          swappers: [],
          highlight: [minIndex],
          ordered: [...orderedItems],
          comparisonCount: comparisonCount,
          swapCount: swapCount
        })
      }
    }

    if (minIndex !== i) {
      frames.push({
        positioning: [...mutableArr],
        comparison: [],
        swappers: [minIndex, i],
        highlight: [],
        ordered: [...orderedItems],
        comparisonCount: comparisonCount,
        swapCount: swapCount
      })

      swapElements(mutableArr, minIndex, i);
      swapCount += 1;
      
      frames.push({
        positioning: [...mutableArr],
        comparison: [],
        swappers: [minIndex, i],
        highlight: [],
        ordered: [...orderedItems],
        comparisonCount: comparisonCount,
        swapCount: swapCount
      })
    }

    orderedItems.push(i);
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

export default selectionSortVisualiser;



/**
 * Utility function for swaping two elements in an array
 * NB: modifies given array, is not immutable
 */
const swapElements = (arr, indexA, indexB) => {
  const temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp; 
}