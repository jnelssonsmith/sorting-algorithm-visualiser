const generateRandomArr = (length: number, min: number, max: number) => {
  return Array.apply(null, Array(length)).map(function() {
    return Math.floor(Math.random() * (max - min)) + min;
  });
};

export default generateRandomArr;
