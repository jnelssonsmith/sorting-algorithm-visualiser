import SortingVisualisation from '../models/SortingVisualisation';

const quickSortVisualiser = (items) => {
  const visualisation = new SortingVisualisation(items, 'Swaps');

  const finalVisualisation = quickSort(items, 0, items.length - 1, visualisation)
  return finalVisualisation;
}

const quickSort = (arr, leftIndex, rightIndex, visualisation) => {
  if(leftIndex < rightIndex) {

    let [pivot, partitionVis] = partition(arr, leftIndex, rightIndex, visualisation)

    const leftVis = quickSort(arr, leftIndex, pivot - 1, partitionVis)
    const rightVis = quickSort(arr, pivot + 1, rightIndex, leftVis)

    return rightVis;
  } else {
    visualisation.addOrderedItem(rightIndex);
    visualisation.createFrame({});

    return visualisation;
  }
}

const partition = (arr, leftIndex, rightIndex, visualisation) => {
  let pivot = rightIndex

  // show pivot
  visualisation.createFrame({
    highlight: [pivot],
  });

  // Set i to leftIndex - 1 so that it can access the first index in the event that the value at arr[0] is greater than arr[pivot]
  // Succeeding comments will expound upon the above comment
  let i = leftIndex - 1
  let j = leftIndex

  // Increment j up to the index preceding the pivot
  while (j < pivot) {
    visualisation.createFrame({
      comparison: [j,i],
      highlight: [pivot],
    });

    // If the value is greater than the pivot increment j
    if (arr[j] > arr[pivot]) {
      j++
    } else {
      i++
      
      visualisation.createFrame({
        comparison: [i],
        operation: [j],
        highlight: [pivot],
      });

      swapElements(arr, j, i)

      visualisation.createFrame({
        updatedPositions: [...arr],
        comparison: [j],
        operation: [i],
        highlight: [pivot],
      });
      j++

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
  swapElements(arr, i + 1, pivot)

  visualisation.createFrame({
    updatedPositions: [...arr],
    operation: [pivot, i + 1],
  });

  visualisation.addOrderedItem(i + 1);
  visualisation.createFrame({});

  //You return i + 1, as the values to the left of it are less than arr[i+1], and values to the right are greater than arr[i + 1]
  // As such, when the recursive quicksorts are called, the new sub arrays will not include this the previously used pivot value
  return [
    i + 1,
    visualisation
  ]
}

const swapElements = (arr, indexA, indexB) => {
  const temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp; 
}


export default quickSortVisualiser;