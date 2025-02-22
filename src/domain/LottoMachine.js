import Lotto from "../domain/Lotto.js";

const lottoMachine = {
  createLottos(money) {
    return Array.from({ length: money / 1000 }).map(() => new Lotto());
  },
};

export default lottoMachine;
