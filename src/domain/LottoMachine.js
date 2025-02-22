import Lotto from "../domain/Lotto.js";
import PurchasePriceValidator from "./\bvalidator/PurcahsePriceValidator.js";
import Calculator from "./Calculator.js";
import Lottos from "./Lottos.js";
import { LOTTO_LENGTH, LOTTO_NUMBER_RANGE } from "../constant/definition.js";
import { UNIT } from "../constant/definition.js";

export default class LottoMachine {
  #purchasePrice;
  #lottos;

  constructor(purchasePrice) {
    PurchasePriceValidator.purchasePrice(purchasePrice);
    this.#purchasePrice = purchasePrice;
    this.#lottos = this.#createLottos(purchasePrice);
  }

  #createLottos(purchasePrice) {
    const lottos = Array.from({ length: purchasePrice / UNIT }).map(
      () => new Lotto(this.#generateLottoNumbers())
    );
    return new Lottos(lottos);
  }

  #generateLottoNumbers() {
    const randomNumbers = new Set();
    while (randomNumbers.size < LOTTO_LENGTH) {
      const randomNumber = Math.floor(
        Math.random() * (LOTTO_NUMBER_RANGE.MAX - 1) + 1
      );
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
