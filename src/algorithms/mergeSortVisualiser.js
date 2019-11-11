import SortingVisualisation from '../models/SortingVisualisation'
import insertElement from '../utils/insertElement';

const mergeSortVisualiser = (items) => {
  const visualisation = new SortingVisualisation(items, 'Insertions')

  const [_, finalVisualisation] = mergeSort(items, visualisation, 0, true);
  return finalVisualisation;
}

const mergeSort = (arr, visualisation, offset, isFinalSort = false) => {
  if (arr.length === 1) {
    return [arr, visualisation];
  }

  const middle = Math.floor(arr.length / 2);

  // This is where we will be dividing the array into left and right
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  const realLeftIndex = offset;
  const realRightIndex = middle + offset;

  // Using recursion to combine the left and right
  const [newLeft, leftUpdatedVis] = mergeSort(left, visualisation, offset);
  const [newRight, rightUpdatedVis] = mergeSort(right, leftUpdatedVis, offset + middle);

  return merge(newLeft, newRight, realLeftIndex, realRightIndex, rightUpdatedVis, isFinalSort);
}

const merge = (leftArr, rightArr, leftRealStartIndex, rightRealStartIndex, visualisation, isFinalSort = false) => {
  let leftIndex = 0;
  let rightIndex = 0;
  let results = [];

  let rightSideSwaps = 0;

  const leftArrIndices = leftArr.map((_, i) => i + leftRealStartIndex);
  const rightArrIndices = rightArr.map((_, i) => i + rightRealStartIndex);

  // initial animation to show what two sides are being compared
  visualisation.createFrame({
    highlight: leftArrIndices,
  })

  visualisation.createFrame({
    highlight: rightArrIndices,
  })

  visualisation.createFrame({
    highlight: [...leftArrIndices, ...rightArrIndices],
  })

  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {

    visualisation.createFrame({
      comparison: [leftIndex + leftRealStartIndex, rightIndex + rightRealStartIndex],
    })

    if (leftArr[leftIndex] < rightArr[rightIndex] || rightIndex >= rightArr.length) {

      visualisation.createFrame({
        comparison: [rightIndex + rightRealStartIndex],
        operation: [leftIndex + leftRealStartIndex],
      })

      const positioning = visualisation.getCurrentPositioning();
      insertElement(positioning, leftArr[leftIndex], leftRealStartIndex + results.length, leftIndex + leftRealStartIndex + rightSideSwaps);

      visualisation.createFrame({
        updatedPositions: [...positioning],
        operation: [leftRealStartIndex + results.length],
      })

      if (isFinalSort) {
        visualisation.addOrderedItem(leftRealStartIndex + results.length)
        visualisation.createFrame({})
      }

      results.push(leftArr[leftIndex]);
      leftIndex++;
    } else {

      visualisation.createFrame({
        comparison: [leftIndex + leftRealStartIndex],
        operation: [rightIndex + rightRealStartIndex],
      })

      const positioning = visualisation.getCurrentPositioning();
      insertElement(positioning, rightArr[rightIndex], leftRealStartIndex + results.length, rightIndex + rightRealStartIndex);
      rightSideSwaps += 1;

      visualisation.createFrame({
        updatedPositions: [...positioning],
        operation: [rightRealStartIndex + results.length],
      })

      if (isFinalSort) {
        visualisation.addOrderedItem(leftRealStartIndex + results.length)
        visualisation.createFrame({})
      }

      results.push(rightArr[rightIndex]);
      rightIndex++;
    }
  }

  if (rightIndex < rightArr.length) {
    while (rightIndex < rightArr.length) {
      const positioning = visualisation.getCurrentPositioning();
      insertElement(positioning, rightArr[rightIndex], leftRealStartIndex + results.length, rightIndex + rightRealStartIndex);
      rightSideSwaps += 1;

      visualisation.createFrame({
        updatedPositions: [...positioning],
      })

      if (isFinalSort) {
        visualisation.addOrderedItem(leftRealStartIndex + results.length)
        visualisation.createFrame({})
      }

      results.push(rightArr[rightIndex]);
      rightIndex++;
    }
  } else {
    while (leftIndex < leftArr.length) {
      const positioning = visualisation.getCurrentPositioning();
      insertElement(positioning, leftArr[leftIndex], leftRealStartIndex + results.length, leftIndex + leftRealStartIndex + rightSideSwaps);

      visualisation.createFrame({
        updatedPositions: [...positioning],
      })

      if (isFinalSort) {
        visualisation.addOrderedItem(leftRealStartIndex + results.length)
        visualisation.createFrame({})
      }

      results.push(leftArr[leftIndex]);
      leftIndex++;
    }
  }

  return [
    results,
    visualisation
  ];
}

export default mergeSortVisualiser;


