import SortingVisualisation from '../models/SortingVisualisation';
import swapElements from '../utils/swapElements';

type NumVis = [number, SortingVisualisation];

const quickSortVisualiser = (items: number[]) => {
  const visualisation: SortingVisualisation = new SortingVisualisation(
    items,
    'Swaps'
  );

  const finalVisualisation: SortingVisualisation = quickSort(
    items,
    0,
    items.length - 1,
    visualisation
  );
  return finalVisualisation;
};

const quickSort = (
  arr: number[],
  leftIndex: number,
  rightIndex: number,
  visualisation: SortingVisualisation
): SortingVisualisation => {
  if (leftIndex < rightIndex) {
    let [pivot, partitionVis]: NumVis = partition(
      arr,
      leftIndex,
      rightIndex,
      visualisation
    );

    const leftVis: SortingVisualisation = quickSort(
      arr,
      leftIndex,
      pivot - 1,
      partitionVis
    );
    const rightVis: SortingVisualisation = quickSort(
      arr,
      pivot + 1,
      rightIndex,
      leftVis
    );

    return rightVis;
  } else {
    visualisation.addOrderedItem(rightIndex);
    visualisation.createFrame();

    return visualisation;
  }
};

const partition = (
  arr: number[],
  leftIndex: number,
  rightIndex: number,
  visualisation: SortingVisualisation
): NumVis => {
  let pivot: number = rightIndex;

  // show pivot
  visualisation.createFrame({
    highlight: [pivot],
  });

  // Set i to leftIndex - 1 so that it can access the first index in the event that the value at arr[0] is greater than arr[pivot]
  // Succeeding comments will expound upon the above comment
  let i: number = leftIndex - 1;
  let j: number = leftIndex;

  // Increment j up to the index preceding the pivot
  while (j < pivot) {
    visualisation.createFrame({
      comparison: [j, i],
      highlight: [pivot],
    });

    // If the value is greater than the pivot increment j
    if (arr[j] > arr[pivot]) {
      j++;
    } else {
      i++;

      visualisation.createFrame({
        comparison: [i],
        operation: [j],
        highlight: [pivot],
      });

      swapElements(arr, j, i);

      visualisation.createFrame({
        updatedPositions: [...arr],
        comparison: [j],
        operation: [i],
        highlight: [pivot],
      });
      j++;

      visualisation.createFrame({
        comparison: [i, j],
        highlight: [pivot],
      });
    }
  }

  visualisation.createFrame({
    operation: [pivot, i + 1],
  });

  //The value at arr[i + 1] will be greater than the value of arr[pivot]
  swapElements(arr, i + 1, pivot);

  visualisation.createFrame({
    updatedPositions: [...arr],
    operation: [pivot, i + 1],
  });

  visualisation.addOrderedItem(i + 1);
  visualisation.createFrame();

  //You return i + 1, as the values to the left of it are less than arr[i+1], and values to the right are greater than arr[i + 1]
  // As such, when the recursive quicksorts are called, the new sub arrays will not include this the previously used pivot value
  return [i + 1, visualisation];
};

export default quickSortVisualiser;
