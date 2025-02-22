import validationUtils from "../../util/validationUtil.js";
import ERROR from "../../constant/error.js";
import { LOTTO_NUMBER_RANGE, LOTTO_LENGTH } from "../../constant/definition.js";

export default class NumbersValidator {
  static numbers(numbers) {
    this.#isWrongArrayLength(numbers);
    this.#isNotNaturalNumberInArray(numbers);
    this.#isDuplicatedNumber(numbers);
    this.#isArrayNumberRangeOver(numbers);
  }

  static #isWrongArrayLength(numbers) {
    if (numbers.length !== LOTTO_LENGTH)
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
      numbers.some((number) =>
        validationUtils.isNumberRangeOver(
          number,
          LOTTO_NUMBER_RANGE.MIN,
          LOTTO_NUMBER_RANGE.MAX
        )
      )
    )
      throw new Error(ERROR.WINNING_NUMBERS.IS_ARRAY_NUMBER_RANGE_OVER);
  }
}
