const validationUtils = {
  isNumberRangeOver: (number, min, max) => number < min || number > max,
  isNotNaturalNumber: (number) => number % 1 !== 0 || number < 1,
};

export default validationUtils;
