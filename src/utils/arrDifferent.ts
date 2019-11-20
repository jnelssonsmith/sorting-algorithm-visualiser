/**
 * Does a basic shallow comparison between two maybe arrays,
 * comparing their items.
 * @param arr1 - array to compare against
 * @param arr2 - second array to compare first with
 */
const arrDifferent = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) {
    return true;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return true;
    }
  }

  return false;
};

export default arrDifferent;
