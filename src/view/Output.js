import {
  SPLIT,
  EMPTY,
  LOTTO_PRISE,
  RANK,
  LOTTO_RULE,
} from "../constant/definition.js";

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
  message(message) {
    console.log(message);
  },

  lottoAmount(lottoAmount) {
    this.message(OUTPUT_MESSAGE.LOTTO_AMOUNT(lottoAmount));
  },

  lottoNumbers(lottosNumber) {
    lottosNumber.forEach((lottoNumbers) => {
      const sortedLottoNumbers = lottoNumbers.toSorted((a, b) => a - b);
      this.message(`[${sortedLottoNumbers.join(`${SPLIT} `)}]`);
    });
  },

  winningStatistics() {
    this.message(OUTPUT_MESSAGE.WINNING_STATISTICS);
    this.message(OUTPUT_MESSAGE.BOUNDARY);
  },

  newLine() {
    this.message(EMPTY);
  },

  matchResult(countStatistics) {
    Object.entries(countStatistics).forEach(([rank, amount]) => {
      const prize = LOTTO_PRISE[rank].toLocaleString();
      this.message(OUTPUT_MESSAGE.MATCH_RESULT(rank, amount, prize));
    });
  },

  winningRate(rate) {
    this.message(OUTPUT_MESSAGE.WINNING_RATE(rate));
  },
};

export default output;
