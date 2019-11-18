const insertElement = (
  arr: number[],
  element: number,
  insertionIndex: number,
  originalIndex: number
) => {
  arr.splice(originalIndex, 1);
  arr.splice(insertionIndex, 0, element);
};

export default insertElement;
