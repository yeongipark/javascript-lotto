import Lotto from "../domain/Lotto.js";
import PurchasePriceValidator from "./\bvalidator/PurcahsePriceValidator.js";
import Calculator from "./Calculator.js";
import Lottos from "./Lottos.js";

export default class LottoMachine {
  #purchasePrice;
  #lottos;

  constructor(purchasePrice) {
    PurchasePriceValidator.purchasePrice(purchasePrice);
    this.#purchasePrice = purchasePrice;
    this.#lottos = this.#createLottos(purchasePrice);
  }

  #createLottos(purchasePrice) {
    const lottos = Array.from({ length: purchasePrice / 1000 }).map(
      () => new Lotto(this.#generateLottoNumbers())
    );
    return new Lottos(lottos);
  }

  #generateLottoNumbers() {
    const randomNumbers = new Set();
    while (randomNumbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 44 + 1);
      randomNumbers.add(randomNumber);
    }
    return [...randomNumbers];
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
