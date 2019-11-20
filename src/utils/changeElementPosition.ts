/**
 * Utility function to take the element at a given index
 * and insert it in at a new index in the array
 *
 * @param arr - array of items
 * @param element - the value of the 
 * @param insertionIndex 
 * @param originalIndex 
 */
const changeElementPosition = (
  arr: number[],
  element: number,
  insertionIndex: number,
  originalIndex: number
) => {

  //const element = arr[originalIndex];
  arr.splice(originalIndex, 1);
  arr.splice(insertionIndex, 0, element);
};

export default changeElementPosition;
