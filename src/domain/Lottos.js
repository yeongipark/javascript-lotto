export default class Lottos {
  #lottos;

  constructor(lottos) {
    this.#lottos = lottos;
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
