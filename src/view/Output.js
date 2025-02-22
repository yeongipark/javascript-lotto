import DEFINITION, { RANK } from "../constant/Definition.js";
import ERROR from "../constant/error.js";
import { OUTPUT_MESSAGE } from "../constant/message.js";

const output = {
  print(message) {
    console.log(message);
  },

  lottoAmount(lottoAmount) {
    this.print(OUTPUT_MESSAGE.LOTTO_AMOUNT(lottoAmount));
  },

  lottoNumbers(lottosNumber) {
    lottosNumber.forEach((lottoNumbers) => {
      const sortedLottoNumbers = lottoNumbers.toSorted((a, b) => a - b);
      this.print(`[${sortedLottoNumbers.join(DEFINITION.SPLIT)}]`);
    });
  },

  winningStatistics() {
    this.print(OUTPUT_MESSAGE.WINNING_STATISTICS);
    this.print(OUTPUT_MESSAGE.BOUNDARY);
  },

  newLine() {
    this.print(DEFINITION.EMPTY);
  },

  matchResult(countStatistics) {
    Object.entries(countStatistics).forEach(([rank, amount]) => {
      const prize = DEFINITION.LOTTO_PRISE[rank].toLocaleString();
      this.print(OUTPUT_MESSAGE.MATCH_RESULT(rank, amount, prize));
    });
  },

  winningRate(rate) {
    this.print(OUTPUT_MESSAGE.WINNING_RATE(rate));
  },

  printErrorResults(errorResults, errorName) {
    Object.entries(errorResults).forEach(([key, value]) => {
      if (value) this.print(`${ERROR[errorName][key]}`);
    });
  },
};

export default output;
