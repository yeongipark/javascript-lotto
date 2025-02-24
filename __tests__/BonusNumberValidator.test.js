import BonusNumberValidator from "../src/domain/\bvalidator/BonusNumberValidator.js";
import { LOTTO_NUMBER_RANGE } from "../src/constant/definition.js";

test.each([[45], [10], [11], [12]])(
  "정상적인 보너스 번호가 입력되면 예외가 발생하지 않는다.",
  (bonusNumber) => {
    expect(() => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      BonusNumberValidator.bonusNumber(winningNumbers, bonusNumber);
    }).not.toThrow();
  }
);

test("보너스 번호가 범위를 벗어나면 예외가 발생한다.", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = LOTTO_NUMBER_RANGE.MIN - 1;

  expect(() => {
    BonusNumberValidator.bonusNumber(winningNumbers, bonusNumber);
  }).toThrow();
});

test("보너스 번호가 자연수가 아니면 예외가 발생한다.", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 1.5;

  expect(() => {
    BonusNumberValidator.bonusNumber(winningNumbers, bonusNumber);
  }).toThrow();
});

test("보너스 번호가 당첨 번호와 중복되면 예외가 발생한다.", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 3;

  expect(() => {
    BonusNumberValidator.bonusNumber(winningNumbers, bonusNumber);
  }).toThrow();
});
