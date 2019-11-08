const insertElement = (arr, element, insertionIndex, originalIndex) => {
  arr.splice(originalIndex, 1)
  arr.splice(insertionIndex, 0, element);
}

export default insertElement;