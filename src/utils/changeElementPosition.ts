/**
 * Utility function to take the element at a given index
 * and insert it in at a new index in the array
 *
 * @param arr - array of items
 * @param insertionIndex - the index of where to move the item to within the array
 * @param originalIndex - the index of the item we want to change position
 */
const changeElementPosition = (
  arr: number[],
  insertionIndex: number,
  originalIndex: number
) => {
  const element = arr[originalIndex];
  arr.splice(originalIndex, 1);
  arr.splice(insertionIndex, 0, element);
};

export default changeElementPosition;
