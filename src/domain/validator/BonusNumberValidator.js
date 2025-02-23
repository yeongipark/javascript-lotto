import validationUtils from "../../util/validationUtil.js";
import { LOTTO_NUMBER_RANGE } from "../../constant/definition.js";

const BONUS_NUMBER = {
  IS_NUMBER_RANGE_OVER: `[ERROR] ${LOTTO_NUMBER_RANGE.MIN}~${LOTTO_NUMBER_RANGE.MAX} 사이의 숫자를 입력해야합니다.`,
  IS_NOT_NATURAL_NUMBER: "[ERROR] 숫자는 자연수여야 합니다.",
  IS_DUPLICATED: "[ERROR] 당첨번호와 중복된 숫자는 입력하실 수 없습니다.",
};

export default class BonusNumberValidator {
  static validateBonusNumber(winningNumbers, bonusNumber) {
    this.#isNumberRangeOver(bonusNumber);
    this.#isNotNaturalNumber(bonusNumber);
    this.#isDuplicated(winningNumbers, bonusNumber);
  }

  static #isNumberRangeOver(bonusNumber) {
    if (
      validationUtils.isNumberRangeOver(
        bonusNumber,
        LOTTO_NUMBER_RANGE.MIN,
        LOTTO_NUMBER_RANGE.MAX
      )
    )
      throw new Error(BONUS_NUMBER.IS_NUMBER_RANGE_OVER);
  }

  static #isNotNaturalNumber(bonusNumber) {
    if (validationUtils.isNotNaturalNumber(bonusNumber))
      throw new Error(BONUS_NUMBER.IS_NOT_NATURAL_NUMBER);
  }

  static #isDuplicated(winningNumbers, bonusNumber) {
    if (
      new Set([...winningNumbers, bonusNumber]).size !==
      winningNumbers.length + 1
    )
      throw new Error(BONUS_NUMBER.IS_DUPLICATED);
  }
}
