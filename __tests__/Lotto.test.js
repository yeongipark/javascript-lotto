import Lotto from "../src/domain/Lotto.js";

describe("Lotto 클래스 유효성 검사", () => {
  test.each([
    ["번호에 중복된 값이 있는 경우 예외가 발생한다.", [1, 2, 3, 4, 5, 5]],
    ["번호의 갯수가 6개 아닌 경우 예외가 발생한다.", [1, 2, 3, 4, 5]],
    [
      "번호가 1~45 사이의 숫자가 아닌 경우 예외가 발생한다.",
      [1, 2, 100, 4, 5, 6],
    ],
    ["번호가 자연수가 아닌 경우 예외가 발생한다.", ["a", 1, 2, 3, 4, 5]],
  ])("%s", (_, numbers) => {
    expect(() => new Lotto(numbers)).toThrow();
  });
});

describe("Lotto 클래스 기능 테스트", () => {
  test("번호를 반환할 수 있다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("저장된 번호에 특정 번호가 있는지 조회할 수 있다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.has(1)).toEqual(true);
    expect(lotto.has(10)).toEqual(false);
  });

  test("다른 로또 번호와의 일치하는 번호의 갯수를 반환할 수 있다.", () => {
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = [4, 5, 6, 7, 8, 9];
    expect(lotto1.getMatchCount(lotto2)).toEqual(3);
  });
});
