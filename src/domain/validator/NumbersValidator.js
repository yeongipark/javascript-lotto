import validationUtils from "../../util/validationUtil.js";

export default class NumbersValidator {
  static numbers(numbers) {
    this.#isWrongArrayLength(numbers);
    this.#isNotNaturalNumberInArray(numbers);
    this.#isDuplicatedNumber(numbers);
    this.#isArrayNumberRangeOver(numbers);
  }

  static #isWrongArrayLength(numbers) {
    if (numbers.length !== 6)
      throw new Error(ERROR.WINNING_NUMBERS.IS_WRONG_ARRAY_LENGTH);
  }

  static #isNotNaturalNumberInArray(numbers) {
    if (numbers.some((number) => validationUtils.isNotNaturalNumber(number)))
      throw new Error(ERROR.WINNING_NUMBERS.IS_NOT_NATURAL_NUMBER_IN_ARRAY);
  }

  static #isDuplicatedNumber(numbers) {
    if (new Set(numbers).size !== numbers.length)
      throw new Error(ERROR.WINNING_NUMBERS.IS_WRONG_ARRAY_LENGTH);
  }

  static #isArrayNumberRangeOver(numbers) {
    if (
      numbers.some((number) => validationUtils.isNumberRangeOver(number, 1, 45))
    )
      throw new Error(ERROR.WINNING_NUMBERS.IS_ARRAY_NUMBER_RANGE_OVER);
  }
}
