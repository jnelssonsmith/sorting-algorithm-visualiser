import SortingVisualisation from '../models/SortingVisualisation';
import changeElementPosition from '../utils/changeElementPosition';

const insertionSortVisualiser = (items: number[]): SortingVisualisation => {
  const visualisation: SortingVisualisation = new SortingVisualisation(
    items,
    'Insertions'
  );

  let mutableArr: number[] = items.map(i => i);

  // by default the first item is initially seen as sorted
  visualisation.createFrame({
    highlight: [0],
  });

  for (let i: number = 1; i < mutableArr.length; i++) {
    let insertionIndex = i;
    for (let k: number = i - 1; k >= 0; k--) {
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
    changeElementPosition(mutableArr, insertionIndex, i);
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
};

export default insertionSortVisualiser;
