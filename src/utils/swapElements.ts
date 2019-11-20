/**
 * Utility function to do an inplace swap between two elements in a given array
 * @param arr - array of items
 * @param indexA - index of first element to swap
 * @param indexB - index of second element to swap
 */
const swapElements = (arr: number[], indexA: number, indexB: number) => {
  const temp: number = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

export default swapElements;
