import validationUtils from "../../util/validationUtil.js";
import ERROR from "../../constant/error.js";

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
    if (money % 1000 !== 0)
      throw new Error(ERROR.PURCHASE_PRICE.IS_NOT_MULTIPLE);
  }

  static #isNumberRangeOver(money) {
    if (
      validationUtils.isNumberRangeOver(
        money,
        PurchasePriceValidator.PURCHASE_PRICE_RANGE.MIN,
        PurchasePriceValidator.PURCHASE_PRICE_RANGE.MAX
      )
    )
      throw new Error(ERROR.PURCHASE_PRICE.IS_NUMBER_RANGE_OVER);
  }
}
