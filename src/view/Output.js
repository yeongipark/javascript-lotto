import { SPLIT, EMPTY, LOTTO_PRISE } from "../constant/definition.js";
import { RANK, LOTTO_RULE } from "../constant/definition.js";

const OUTPUT_MESSAGE = {
  LOTTO_AMOUNT: (lottoAmount) => `${lottoAmount}개를 구매했습니다.`,
  WINNING_STATISTICS: "당첨 통계",
  BOUNDARY: "--------------------",
  MATCH_RESULT: (rank, amount, prize) =>
    `${LOTTO_RULE[rank]}개 일치 ${
      rank === RANK.SECOND ? "보너스 번호 일치" : ""
    }(${prize}원) - ${amount}개`,
  WINNING_RATE: (rate) => `총 수익률은 ${rate}%입니다.`,
};

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
      this.print(`[${sortedLottoNumbers.join(`${SPLIT} `)}]`);
    });
  },

  winningStatistics() {
    this.print(OUTPUT_MESSAGE.WINNING_STATISTICS);
    this.print(OUTPUT_MESSAGE.BOUNDARY);
  },

  newLine() {
    this.print(EMPTY);
  },

  matchResult(countStatistics) {
    Object.entries(countStatistics).forEach(([rank, amount]) => {
      const prize = LOTTO_PRISE[rank].toLocaleString();
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
