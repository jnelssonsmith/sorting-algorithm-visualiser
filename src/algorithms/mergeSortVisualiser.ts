import SortingVisualisation from '../models/SortingVisualisation';
import changeElementPosition from '../utils/changeElementPosition';

type ArrVis = [number[], SortingVisualisation];

const mergeSortVisualiser = (items: number[]): SortingVisualisation => {
  const visualisation: SortingVisualisation = new SortingVisualisation(
    items,
    'Insertions'
  );

  const [_, finalVisualisation]: ArrVis = mergeSort(
    items,
    visualisation,
    0,
    true
  );
  return finalVisualisation;
};

const mergeSort = (
  arr: number[],
  visualisation: SortingVisualisation,
  offset: number,
  isFinalSort: boolean = false
): ArrVis => {
  if (arr.length === 1) {
    return [arr, visualisation];
  }

  const middle: number = Math.floor(arr.length / 2);

  // This is where we will be dividing the array into left and right
  const left: number[] = arr.slice(0, middle);
  const right: number[] = arr.slice(middle);

  const realLeftIndex: number = offset;
  const realRightIndex: number = middle + offset;

  // Using recursion to combine the left and right
  const [newLeft, leftUpdatedVis]: ArrVis = mergeSort(
    left,
    visualisation,
    offset
  );
  const [newRight, rightUpdatedVis]: ArrVis = mergeSort(
    right,
    leftUpdatedVis,
    offset + middle
  );

  return merge(
    newLeft,
    newRight,
    realLeftIndex,
    realRightIndex,
    rightUpdatedVis,
    isFinalSort
  );
};

const merge = (
  leftArr: number[],
  rightArr: number[],
  leftRealStartIndex: number,
  rightRealStartIndex: number,
  visualisation: SortingVisualisation,
  isFinalSort: boolean = false
): ArrVis => {
  let leftIndex: number = 0;
  let rightIndex: number = 0;
  let results: number[] = [];

  let rightSideSwaps: number = 0;

  const leftArrIndices: number[] = leftArr.map(
    (_, i) => i + leftRealStartIndex
  );
  const rightArrIndices: number[] = rightArr.map(
    (_, i) => i + rightRealStartIndex
  );

  // initial animation to show what two sides are being compared
  visualisation.createFrame({
    highlight: leftArrIndices,
  });

  visualisation.createFrame({
    highlight: rightArrIndices,
  });

  visualisation.createFrame({
    highlight: [...leftArrIndices, ...rightArrIndices],
  });

  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
    const leftTargetIndex = leftIndex + leftRealStartIndex;
    const rightTargetIndex = rightIndex + rightRealStartIndex;
    
    visualisation.createFrame({
      comparison: [
        leftTargetIndex,
        rightTargetIndex,
      ],
    });
    visualisation.incrementComparisons();

    // choose from left side if left array element is smaller, or the
    // right arr has run out
    const pickFromLeft = (
      leftArr[leftIndex] < rightArr[rightIndex] ||
      rightIndex >= rightArr.length
    )

    visualisation.createFrame({
      comparison: [pickFromLeft ? rightTargetIndex : leftTargetIndex],
      operation: [pickFromLeft ? leftTargetIndex : rightTargetIndex],
    });

    const positioning: number[] = visualisation.getCurrentPositioning();

    const updatedPosition = pickFromLeft
      ? leftTargetIndex + rightSideSwaps
      : rightTargetIndex;
  
    changeElementPosition(
      positioning,
      leftRealStartIndex + results.length,
      updatedPosition
    );
    visualisation.incrememntOperations();

    if (!pickFromLeft) {
      rightSideSwaps += 1;
    }
    
    const updatedOperationIndex = (
      pickFromLeft
        ? leftRealStartIndex
        : rightRealStartIndex
      ) + results.length;
    
    visualisation.createFrame({
      updatedPositions: [...positioning],
      operation: [updatedOperationIndex],
    });

    if (isFinalSort) {
      visualisation.addOrderedItem(leftRealStartIndex + results.length);
      visualisation.createFrame();
    }

    if (pickFromLeft) {
      results.push(leftArr[leftIndex]);
      leftIndex++;
    } else {
      results.push(rightArr[rightIndex]);
      rightIndex++;
    }
  }

  if (rightIndex < rightArr.length) {
    while (rightIndex < rightArr.length) {
      const positioning: number[] = visualisation.getCurrentPositioning();
      changeElementPosition(
        positioning,
        leftRealStartIndex + results.length,
        rightIndex + rightRealStartIndex
      );
      rightSideSwaps += 1;

      visualisation.createFrame({
        updatedPositions: [...positioning],
      });

      if (isFinalSort) {
        visualisation.addOrderedItem(leftRealStartIndex + results.length);
        visualisation.createFrame();
      }

      results.push(rightArr[rightIndex]);
      rightIndex++;
    }
  } else {
    while (leftIndex < leftArr.length) {
      const positioning: number[] = visualisation.getCurrentPositioning();
      changeElementPosition(
        positioning,
        leftRealStartIndex + results.length,
        leftIndex + leftRealStartIndex + rightSideSwaps
      );

      visualisation.createFrame({
        updatedPositions: [...positioning],
      });

      if (isFinalSort) {
        visualisation.addOrderedItem(leftRealStartIndex + results.length);
        visualisation.createFrame();
      }

      results.push(leftArr[leftIndex]);
      leftIndex++;
    }
  }

  return [results, visualisation];
};

export default mergeSortVisualiser;
