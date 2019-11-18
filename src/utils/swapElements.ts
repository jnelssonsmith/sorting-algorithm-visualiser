const swapElements = (
  arr: number[],
  indexA: number,
  indexB: number
) => {
  const temp: number = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

export default swapElements;
