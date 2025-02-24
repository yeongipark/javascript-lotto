import Lottos from "../src/domain/Lottos.js";

describe("Lottos 클래스 테스트", () => {
  test("로또 번호들을 반환할 수 있다.", () => {
    const purchasePrice = 3000;

    const lottos = new Lottos(purchasePrice);
    const result = lottos.getLottosNumber();

    expect(result.length).toEqual(3);

    expect(result[0].length).toEqual(6);
  });

  test("로또 배열의 정답 객체를 리턴할 수 있다.", () => {
    const purchasePrice = 1000;

    const lottos = new Lottos(purchasePrice);
    const result = lottos.calculateMatchCounts([], 0);

    expect(result).toEqual([{ matchCount: 0, isMatchBonusNumber: false }]);
  });
});
