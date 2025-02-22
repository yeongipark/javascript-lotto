// Calculator.test.js
import Calculator from "../src/domain/Calculator.js";
import { LOTTO_PRISE, RANK } from "../src/constant/definition.js";

describe("Calculator 클래스 테스트", () => {
  test("빈 배열을 입력하면 모든 등수의가 0이어야 한다", () => {
    const stats = Calculator.getStatistics([]);
    expect(stats).toEqual({
      [RANK.FIFTH]: 0,
      [RANK.FOURTH]: 0,
      [RANK.THIRD]: 0,
      [RANK.SECOND]: 0,
      [RANK.FIRST]: 0,
    });
  });

  test("등수 통계를 계산할 수 있다.", () => {
    const matchCounts = [
      { matchCount: 3, isMatchBonusNumber: false },
      { matchCount: 3, isMatchBonusNumber: false },
      { matchCount: 4, isMatchBonusNumber: false },
      { matchCount: 5, isMatchBonusNumber: false },
      { matchCount: 5, isMatchBonusNumber: true },
      { matchCount: 6, isMatchBonusNumber: false },
    ];

    const stats = Calculator.getStatistics(matchCounts);
    expect(stats).toEqual({
      [RANK.FIFTH]: 2,
      [RANK.FOURTH]: 1,
      [RANK.THIRD]: 1,
      [RANK.SECOND]: 1,
      [RANK.FIRST]: 1,
    });
  });

  test("수익률을 계산할 수 있다.", () => {
    const countStatistics = {
      [RANK.FIFTH]: 2,
      [RANK.FOURTH]: 1,
      [RANK.THIRD]: 1,
      [RANK.SECOND]: 1,
      [RANK.FIRST]: 1,
    };

    const purchasePrice = 5000;

    const expectedSum =
      LOTTO_PRISE[RANK.FIFTH] * 2 +
      LOTTO_PRISE[RANK.FOURTH] * 1 +
      LOTTO_PRISE[RANK.THIRD] * 1 +
      LOTTO_PRISE[RANK.SECOND] * 1 +
      LOTTO_PRISE[RANK.FIRST] * 1;
    const expectedWinningRate = (expectedSum / purchasePrice) * 100;

    const winningRate = Calculator.getWinningRate(
      countStatistics,
      purchasePrice
    );
    expect(winningRate).toBe(expectedWinningRate);
  });
});
