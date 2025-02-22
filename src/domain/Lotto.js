import NumbersValidator from "./\bvalidator/NumbersValidator.js";
export default class Lotto {
  #numbers;

  constructor(numbers) {
    NumbersValidator.numbers(numbers);
    this.#numbers = numbers;
  }

  getNumbers() {
    return [...this.#numbers];
  }

  has(number) {
    return this.#numbers.includes(number);
  }

  getMatchCount(numbers) {
    const sumNumbers = [...this.#numbers, ...numbers];
    const setLotto = new Set(sumNumbers);

    return sumNumbers.length - setLotto.size;
  }
}
