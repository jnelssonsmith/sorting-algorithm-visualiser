
const insertionSortVisualiser = (items) => {
  let frames = [];
  let orderedItems = [];
  let comparisonCount = 0;
  let swapCount = 0;

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

  // by default the first item is initially seen as sorted
  frames.push({
    positioning: [...mutableArr],
    comparison: [],
    swappers: [],
    highlight: [0],
    ordered: [...orderedItems],
    comparisonCount: comparisonCount,
    swapCount: swapCount
  })

  

  for (let i = 1; i < mutableArr.length; i++) {
    let insertionIndex = i;
    for (let k = i - 1; k >= 0; k--) {

      comparisonCount += 1;
      frames.push({
        positioning: [...mutableArr],
        comparison: [k],
        swappers: [],
        highlight: [i],
        ordered: [...orderedItems],
        comparisonCount: comparisonCount,
        swapCount: swapCount
      })

      if (mutableArr[i] < mutableArr[k]) {
        insertionIndex -= 1;
      } else {
        frames.push({
          positioning: [...mutableArr],
          comparison: [],
          swappers: [k],
          highlight: [i],
          ordered: [...orderedItems],
          comparisonCount: comparisonCount,
          swapCount: swapCount
        })
        break;
      }
    }

    swapCount += 1;
    insert(mutableArr, mutableArr[i], insertionIndex, i);
    frames.push({
      positioning: [...mutableArr],
      comparison: [],
      swappers: [],
      highlight: [insertionIndex],
      ordered: [...orderedItems],
      comparisonCount: comparisonCount,
      swapCount: swapCount
    })
    
  }

  frames.push({
    positioning: [...mutableArr],
    comparison: [],
    swappers: [],
    highlight: [],
    ordered: [...mutableArr.map((_, i) => i)],
    comparisonCount: comparisonCount,
    swapCount: swapCount
  })

  return frames;
}

const insert = (arr, element, insertionIndex, originalIndex) => {
    arr.splice(originalIndex, 1)
    arr.splice(insertionIndex, 0, element);
}

export default insertionSortVisualiser;