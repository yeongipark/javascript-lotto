import validationUtils from "../../util/validationUtil.js";
import ERROR from "../../constant/Error.js";

export default class PurchasePriceValidator {
  static purchasePrice(money) {
    this.#isNotMultiple(money);
    this.#isNumberRangeOver(money);
  }

  static #isNotMultiple(money) {
    if (money % 1000 !== 0)
      throw new Error(ERROR.PURCHASE_PRICE.IS_NOT_MULTIPLE);
  }

  static #isNumberRangeOver(money) {
    if (validationUtils.isNumberRangeOver(money, 1_000, 10_000_000_000))
      throw new Error(ERROR.PURCHASE_PRICE.IS_NUMBER_RANGE_OVER);
  }
}
