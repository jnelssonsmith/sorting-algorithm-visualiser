const quickSortVisualiser = (items) => {
  let data = {
    frames: [],
    comparisonCount: 0,
    swapCount: 0,
    orderedItems: [],
  }

  data.frames.push({
    positioning: [...items],
    comparison: [],
    swappers: [],
    highlight: [],
    ordered: [...data.orderedItems],
    comparisonCount: data.comparisonCount,
    swapCount: data.swapCount
  });

  const finalData = quickSort(items, 0, items.length - 1, data)
  return finalData.frames;
}

const quickSort = (arr, leftIndex, rightIndex, data) => {
  if(leftIndex < rightIndex) {

    let [pivot, partitionData] = partition(arr, leftIndex, rightIndex, data)

    const updatedData = quickSort(arr, leftIndex, pivot - 1, partitionData)
    const returnData = quickSort(arr, pivot + 1, rightIndex, updatedData)

    return returnData
  } else {
    data.orderedItems.push(rightIndex);
    data.frames.push({
      positioning: [...arr],
      comparison: [],
      swappers: [],
      highlight: [],
      ordered: [...data.orderedItems],
      comparisonCount: data.comparisonCount,
      swapCount: data.swapCount
    });

    return data;
  }
}

const partition = (arr, leftIndex, rightIndex, data) => {
  let pivot = rightIndex

  // show pivot
  data.frames.push({
    positioning: [...arr],
    comparison: [],
    swappers: [],
    highlight: [pivot],
    ordered: [...data.orderedItems],
    comparisonCount: data.comparisonCount,
    swapCount: data.swapCount
  });

  // Set i to leftIndex - 1 so that it can access the first index in the event that the value at arr[0] is greater than arr[pivot]
  // Succeeding comments will expound upon the above comment
  let i = leftIndex - 1
  let j = leftIndex

  // Increment j up to the index preceding the pivot
  while (j < pivot) {
    data.frames.push({
      positioning: [...arr],
      comparison: [j,i],
      swappers: [],
      highlight: [pivot],
      ordered: [...data.orderedItems],
      comparisonCount: data.comparisonCount,
      swapCount: data.swapCount
    });

    // If the value is greater than the pivot increment j
    if (arr[j] > arr[pivot]) {
      j++
    } else {
      i++
      
      data.frames.push({
        positioning: [...arr],
        comparison: [i],
        swappers: [j],
        highlight: [pivot],
        ordered: [...data.orderedItems],
        comparisonCount: data.comparisonCount,
        swapCount: data.swapCount
      });

      swapElements(arr, j, i)

      data.frames.push({
        positioning: [...arr],
        comparison: [j],
        swappers: [i],
        highlight: [pivot],
        ordered: [...data.orderedItems],
        comparisonCount: data.comparisonCount,
        swapCount: data.swapCount
      });
      j++

      data.frames.push({
        positioning: [...arr],
        comparison: [i, j],
        swappers: [],
        highlight: [pivot],
        ordered: [...data.orderedItems],
        comparisonCount: data.comparisonCount,
        swapCount: data.swapCount
      });
    }

  }

  data.frames.push({
    positioning: [...arr],
    comparison: [],
    swappers: [pivot, i + 1],
    highlight: [],
    ordered: [...data.orderedItems],
    comparisonCount: data.comparisonCount,
    swapCount: data.swapCount
  });

  //The value at arr[i + 1] will be greater than the value of arr[pivot]
  swapElements(arr, i + 1, pivot)

  data.frames.push({
    positioning: [...arr],
    comparison: [],
    swappers: [pivot, i + 1],
    highlight: [],
    ordered: [...data.orderedItems],
    comparisonCount: data.comparisonCount,
    swapCount: data.swapCount
  });

  data.orderedItems.push(i + 1);
  data.frames.push({
    positioning: [...arr],
    comparison: [],
    swappers: [],
    highlight: [],
    ordered: [...data.orderedItems],
    comparisonCount: data.comparisonCount,
    swapCount: data.swapCount
  });

  //You return i + 1, as the values to the left of it are less than arr[i+1], and values to the right are greater than arr[i + 1]
  // As such, when the recursive quicksorts are called, the new sub arrays will not include this the previously used pivot value
  return [
    i + 1,
    data
  ]
}

const swapElements = (arr, indexA, indexB) => {
  const temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp; 
}


export default quickSortVisualiser;