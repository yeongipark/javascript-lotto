// NumbersValidator.test.js
import NumbersValidator from "../src/domain/\bvalidator/NumbersValidator";
import { LOTTO_NUMBER_RANGE } from "../src/constant/definition";

test.each([
  [[1, 2, 3, 4, 5, 6]],
  [[10, 15, 19, 20, 25, 30]],
  [[30, 31, 32, 33, 34, 35]],
])("로또 번호 배열이 정상인 경우 예외가 발생하지 않는다.", (numbers) => {
  expect(() => {
    NumbersValidator.numbers(numbers);
  }).not.toThrow();
});

test("로또 번호 배열의 길이가 올바르지 않으면 예외가 발생한다.", () => {
  const numbers = [1, 2, 3, 4, 5];
  expect(() => {
    NumbersValidator.numbers(numbers);
  }).toThrow();
});

test("로또 번호 배열에 자연수가 아닌 값이 포함되면 예외가 발생한다.", () => {
  const numbers = [1, 2, 3, 4, 5, 3.5];
  expect(() => {
    NumbersValidator.numbers(numbers);
  }).toThrow();
});

test("로또 번호 배열에 중복된 숫자가 있으면 예외가 발생한다.", () => {
  const numbers = [1, 2, 3, 3, 5, 6];
  expect(() => {
    NumbersValidator.numbers(numbers);
  }).toThrow();
});

test("로또 번호 배열에 범위를 벗어난 숫자가 있으면 예외가 발생한다.", () => {
  const numbers = [1, 2, 3, 4, 5, LOTTO_NUMBER_RANGE.MAX + 1];
  expect(() => {
    NumbersValidator.numbers(numbers);
  }).toThrow();
});
