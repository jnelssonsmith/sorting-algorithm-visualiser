import SortingVisualisation from '../models/SortingVisualisation';

const insertionSortVisualiser = (items) => {
  const visualisation = new SortingVisualisation(items, 'Insertions');

  let mutableArr = items.map(i => i);

  // by default the first item is initially seen as sorted
  visualisation.createFrame({
    highlight: [0]
  });

  for (let i = 1; i < mutableArr.length; i++) {
    let insertionIndex = i;
    for (let k = i - 1; k >= 0; k--) {

      visualisation.incrementComparisons();
      visualisation.createFrame({
        comparison: [k],
        highlight: [i],
      });

      if (mutableArr[i] < mutableArr[k]) {
        insertionIndex -= 1;
      } else {
        visualisation.createFrame({
          operation: [k],
          highlight: [i],
        });
        break;
      }
    }

    visualisation.incrememntOperations();
    insertElement(mutableArr, mutableArr[i], insertionIndex, i);
    visualisation.createFrame({
      updatedPositions: [...mutableArr],
      highlight: [insertionIndex],
    });
  }

  for (let i = 0; i < items.length; i++) {
    visualisation.addOrderedItem(i);
  }

  visualisation.createFrame({});

  return visualisation;
}

const insertElement = (arr, element, insertionIndex, originalIndex) => {
    arr.splice(originalIndex, 1)
    arr.splice(insertionIndex, 0, element);
}

export default insertionSortVisualiser;