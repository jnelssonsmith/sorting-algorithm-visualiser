import cloneDeep from 'lodash.clonedeep';

const mergeSortVisualiser = (items) => {
  let data = {
    frames: [],
    orderedItems: [],
    comparisonCount: 0,
    swapCount: 0,
    currentPositions: items.map(i => i),
  }

  data.frames.push({
    positioning: [...data.currentPositions],
    comparison: [],
    swappers: [],
    highlight: [],
    ordered: [...data.orderedItems],
    comparisonCount: data.comparisonCount,
    swapCount: data.swapCount
  });

  const [sorted, finalData] = mergeSort(items, data, 0, true);
  console.log(sorted);
  console.log(finalData.frames[finalData.frames.length - 1].positioning);
  return finalData.frames;
}

const mergeSort = (arr, data, offset, isFinalSort = false) => {
  if (arr.length === 1) {
    return [arr, cloneDeep(data)];
  }

  const middle = Math.floor(arr.length / 2);

  // This is where we will be dividing the array into left and right
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  const realLeftIndex = offset;
  const realRightIndex = middle + offset;

  // Using recursion to combine the left and right
  const [newLeft, leftUpdatedData] = mergeSort(left, cloneDeep(data), offset);
  const [newRight, rightUpdatedData] = mergeSort(right, cloneDeep(leftUpdatedData), offset + middle);

  return merge(newLeft, newRight, realLeftIndex, realRightIndex, cloneDeep(rightUpdatedData), isFinalSort);
}

const merge = (leftArr, rightArr, leftRealStartIndex, rightRealStartIndex, data, isFinalSort = false) => {
  let leftIndex = 0;
  let rightIndex = 0;
  let results = [];

  let leftSideSwaps = 0;
  let rightSideSwaps = 0;

  const leftArrIndices = leftArr.map((_, i) => i + leftRealStartIndex);
  const rightArrIndices = rightArr.map((_, i) => i + rightRealStartIndex);

  // initial animation to show what two sides are being compared
  data.frames.push({
    positioning: [...data.currentPositions],
    comparison: [],
    swappers: [],
    highlight: leftArrIndices,
    ordered: [...data.orderedItems],
    comparisonCount: data.comparisonCount,
    swapCount: data.swapCount
  })

  data.frames.push({
    positioning: [...data.currentPositions],
    comparison: [],
    swappers: [],
    highlight: rightArrIndices,
    ordered: [...data.orderedItems],
    comparisonCount: data.comparisonCount,
    swapCount: data.swapCount
  })

  data.frames.push({
    positioning: [...data.currentPositions],
    comparison: [],
    swappers: [],
    highlight: [...leftArrIndices, ...rightArrIndices],
    ordered: [...data.orderedItems],
    comparisonCount: data.comparisonCount,
    swapCount: data.swapCount
  })

  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {

    data.frames.push({
      positioning: [...data.currentPositions],
      comparison: [leftIndex + leftRealStartIndex, rightIndex + rightRealStartIndex],
      swappers: [],
      highlight: [],
      ordered: [...data.orderedItems],
      comparisonCount: data.comparisonCount,
      swapCount: data.swapCount
    })

    if (leftArr[leftIndex] < rightArr[rightIndex] || rightIndex >= rightArr.length) {

      data.frames.push({
        positioning: [...data.currentPositions],
        comparison: [rightIndex + rightRealStartIndex],
        swappers: [leftIndex + leftRealStartIndex],
        highlight: [],
        ordered: [...data.orderedItems],
        comparisonCount: data.comparisonCount,
        swapCount: data.swapCount
      })

      insert(data.currentPositions, leftArr[leftIndex], leftRealStartIndex + results.length, leftIndex + leftRealStartIndex + rightSideSwaps);
      leftSideSwaps += 1;

      data.frames.push({
        positioning: [...data.currentPositions],
        comparison: [],
        swappers: [leftRealStartIndex + results.length],
        highlight: [],
        ordered: [...data.orderedItems],
        comparisonCount: data.comparisonCount,
        swapCount: data.swapCount
      })

      if (isFinalSort) {
        data.orderedItems.push(leftRealStartIndex + results.length)
        data.frames.push({
          positioning: [...data.currentPositions],
          comparison: [],
          swappers: [],
          highlight: [],
          ordered: [...data.orderedItems],
          comparisonCount: data.comparisonCount,
          swapCount: data.swapCount
        })
      }

      results.push(leftArr[leftIndex]);
      leftIndex++;
    } else {

      data.frames.push({
        positioning: [...data.currentPositions],
        comparison: [leftIndex + leftRealStartIndex],
        swappers: [rightIndex + rightRealStartIndex],
        highlight: [],
        ordered: [...data.orderedItems],
        comparisonCount: data.comparisonCount,
        swapCount: data.swapCount
      })

      insert(data.currentPositions, rightArr[rightIndex], leftRealStartIndex + results.length, rightIndex + rightRealStartIndex);
      rightSideSwaps += 1;

      data.frames.push({
        positioning: [...data.currentPositions],
        comparison: [],
        swappers: [rightRealStartIndex + results.length],
        highlight: [],
        ordered: [...data.orderedItems],
        comparisonCount: data.comparisonCount,
        swapCount: data.swapCount
      })

      if (isFinalSort) {
        data.orderedItems.push(leftRealStartIndex + results.length)
        data.frames.push({
          positioning: [...data.currentPositions],
          comparison: [],
          swappers: [],
          highlight: [],
          ordered: [...data.orderedItems],
          comparisonCount: data.comparisonCount,
          swapCount: data.swapCount
        })
      }

      results.push(rightArr[rightIndex]);
      rightIndex++;
    }
  }

  if (rightIndex < rightArr.length) {
    while (rightIndex < rightArr.length) {
      insert(data.currentPositions, rightArr[rightIndex], leftRealStartIndex + results.length, rightIndex + rightRealStartIndex);
      rightSideSwaps += 1;

      data.frames.push({
        positioning: [...data.currentPositions],
        comparison: [],
        swappers: [],
        highlight: [],
        ordered: [...data.orderedItems],
        comparisonCount: data.comparisonCount,
        swapCount: data.swapCount
      })

      if (isFinalSort) {
        data.orderedItems.push(leftRealStartIndex + results.length)
        data.frames.push({
          positioning: [...data.currentPositions],
          comparison: [],
          swappers: [],
          highlight: [],
          ordered: [...data.orderedItems],
          comparisonCount: data.comparisonCount,
          swapCount: data.swapCount
        })
      }

      results.push(rightArr[rightIndex]);
      rightIndex++;
    }
  } else {
    while (leftIndex < leftArr.length) {
      insert(data.currentPositions, leftArr[leftIndex], leftRealStartIndex + results.length, leftIndex + leftRealStartIndex + rightSideSwaps);
      leftSideSwaps += 1;

      data.frames.push({
        positioning: [...data.currentPositions],
        comparison: [],
        swappers: [],
        highlight: [],
        ordered: [...data.orderedItems],
        comparisonCount: data.comparisonCount,
        swapCount: data.swapCount
      })

      if (isFinalSort) {
        data.orderedItems.push(leftRealStartIndex + results.length)
        data.frames.push({
          positioning: [...data.currentPositions],
          comparison: [],
          swappers: [],
          highlight: [],
          ordered: [...data.orderedItems],
          comparisonCount: data.comparisonCount,
          swapCount: data.swapCount
        })
      }

      results.push(leftArr[leftIndex]);
      leftIndex++;
    }
  }

  return [
    results,
    data
  ];
}

const insert = (arr, element, insertionIndex, originalIndex) => {
  arr.splice(originalIndex, 1)
  arr.splice(insertionIndex, 0, element);
}

export default mergeSortVisualiser;


