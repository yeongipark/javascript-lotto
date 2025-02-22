import Lottos from "../src/domain/Lottos.js";
import Lotto from "../src/domain/Lotto.js";

describe("Lottos 클래스 테스트", () => {
  test("로또 번호들을 반환할 수 있다.", () => {
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([7, 8, 9, 10, 11, 12]);

    const lottos = new Lottos([lotto1, lotto2]);
    const result = lottos.getLottosNumber();

    expect(result).toEqual([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ]);
  });

  test("로또 배열의 정답 객체를 리턴할 수 있다.", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([7, 8, 9, 10, 11, 12]);

    const lottos = new Lottos([lotto1, lotto2]);
    const result = lottos.calculateMatchCounts(winningNumbers, bonusNumber);

    expect(result).toEqual([
      { matchCount: 6, isMatchBonusNumber: false },
      { matchCount: 0, isMatchBonusNumber: true },
    ]);
  });
});
