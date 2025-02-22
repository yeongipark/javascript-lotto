import validationUtils from "../../util/validationUtil.js";

const PURCHASE_PRICE = {
  IS_NUMBER_RANGE_OVER: "[ERROR] 1000 이상 100억 이하의 숫자를 입력해야합니다.",
  IS_NOT_MULTIPLE: "[ERROR] 1000 단위로 나누어 떨어지는 숫자여야합니다.",
};

export default class PurchasePriceValidator {
  static PURCHASE_PRICE_RANGE = {
    MIN: 1_000,
    MAX: 10_000_000_000,
  };

  static purchasePrice(money) {
    this.#isNotMultiple(money);
    this.#isNumberRangeOver(money);
  }

  static #isNotMultiple(money) {
    if (money % 1000 !== 0) throw new Error(PURCHASE_PRICE.IS_NOT_MULTIPLE);
  }

  static #isNumberRangeOver(money) {
    if (
      validationUtils.isNumberRangeOver(
        money,
        PurchasePriceValidator.PURCHASE_PRICE_RANGE.MIN,
        PurchasePriceValidator.PURCHASE_PRICE_RANGE.MAX
      )
    )
      throw new Error(PURCHASE_PRICE.IS_NUMBER_RANGE_OVER);
  }
}
