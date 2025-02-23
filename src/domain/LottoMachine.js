import PurchasePriceValidator from "./\bvalidator/PurchasePriceValidator.js";
import Calculator from "./Calculator.js";
import Lottos from "./Lottos.js";

export default class LottoMachine {
  #purchasePrice;
  #lottos;

  constructor(purchasePrice) {
    PurchasePriceValidator.purchasePrice(purchasePrice);
    this.#purchasePrice = purchasePrice;
    this.#lottos = new Lottos(purchasePrice);
  }

  getLottosNumber() {
    return this.#lottos.getLottosNumber();
  }

  getStatistics(winningNumbers, bonusNumber) {
    const matchCounts = this.#lottos.calculateMatchCounts(
      winningNumbers,
      bonusNumber
    );
    return Calculator.getStatistics(matchCounts);
  }

  getWinningRate(countStatistics) {
    return Calculator.getWinningRate(countStatistics, this.#purchasePrice);
  }
}
