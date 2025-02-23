import Lotto from "./Lotto.js";
import { UNIT } from "../constant/definition.js";
import { LOTTO_LENGTH, LOTTO_NUMBER_RANGE } from "../constant/definition.js";

export default class Lottos {
  #lottos;

  constructor(purchasePrice) {
    this.#lottos = this.#createLottos(purchasePrice);
  }

  #createLottos(purchasePrice) {
    const lottos = Array.from({ length: purchasePrice / UNIT }).map(
      () => new Lotto(this.#generateLottoNumbers())
    );
    return lottos;
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
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }

  calculateMatchCounts(winningLottoNumbers, bonusNumber) {
    return this.#lottos.map((lotto) => {
      const matchCount = lotto.getMatchCount(winningLottoNumbers);
      const isMatchBonusNumber = lotto.has(bonusNumber);
      return { matchCount, isMatchBonusNumber };
    });
  }
}
