import validationUtils from "../../util/validationUtil.js";

export default class BonusNumberValidator {
  static bonusNumber(winningNumbers, bonusNumber) {
    this.#isNumberRangeOver(bonusNumber);
    this.#isNotNaturalNumber(bonusNumber);
    this.#isDuplicated(winningNumbers, bonusNumber);
  }

  static #isNumberRangeOver(bonusNumber) {
    if (validationUtils.isNumberRangeOver(bonusNumber, 1, 45))
      throw new Error(ERROR.BONUS_NUMBER.IS_NUMBER_RANGE_OVER);
  }

  static #isNotNaturalNumber(bonusNumber) {
    if (validationUtils.isNotNaturalNumber(bonusNumber))
      throw new Error(ERROR.BONUS_NUMBER.IS_NOT_NATURAL_NUMBER);
  }

  static #isDuplicated(winningNumbers, bonusNumber) {
    if (
      new Set([...winningNumbers, bonusNumber]).size !==
      winningNumbers.length + 1
    )
      throw new Error(ERROR.BONUS_NUMBER.IS_DUPLICATED);
  }
}
