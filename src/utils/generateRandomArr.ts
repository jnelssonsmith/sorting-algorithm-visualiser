/**
 * Will generate an array of pseudo random numbers of the specified length
 * and between the given bounds
 * 
 * @param length - length of array you want to generate
 * @param min - min value any element in the array can be
 * @param max - max value any element in the array can be
 */
const generateRandomArr = (length: number, min: number, max: number) => {
  return Array.apply(null, Array(length)).map(function() {
    return Math.floor(Math.random() * (max - min)) + min;
  });
};

export default generateRandomArr;
