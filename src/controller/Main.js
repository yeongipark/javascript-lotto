import LottoMachine from "../domain/LottoMachine.js";
import NumbersValidator from "../domain/\bvalidator/NumbersValidator.js";
import BonusNumberValidator from "../domain/\bvalidator/BonusNumberValidator.js";
import PurchasePriceValidator from "../domain/\bvalidator/PurcahsePriceValidator.js";
import output from "../view/output.js";
import input from "../view/input.js";
import parser from "../util/parser.js";
import { errorHandler } from "../util/errorHandler.js";

export default class Main {
  #lottoMachine;

  constructor() {}
  async play() {
    const purchasePrice = await errorHandler(
      this.#inputPurchasePrice.bind(this)
    );

    this.#lottoMachine = new LottoMachine(purchasePrice);
    this.printLottos();

    const winningNumbers = await errorHandler(
      this.#inputWinningNumbers.bind(this)
    );

    const bonusNumber = await errorHandler(() =>
      this.#inputBonusNumber.bind(this)(winningNumbers)
    );

    this.printStatistics(winningNumbers, bonusNumber);

    await this.#inputRestart();
  }

  async #inputPurchasePrice() {
    const purchasePrice = await input.purchasePrice();
    const parsedPurchasePrice = parser.toNumber(purchasePrice);
    PurchasePriceValidator.purchasePrice(parsedPurchasePrice);
    return parsedPurchasePrice;
  }

  async #inputWinningNumbers() {
    const winningNumbers = await input.winningNumbers();
    const parsedWinningNumbers = parser.toSplitNumberArray(winningNumbers);
    NumbersValidator.numbers(parsedWinningNumbers);
    return parsedWinningNumbers;
  }

  async #inputBonusNumber(winningNumbers) {
    const bonusNumber = await input.bonusNumber();
    const parsedBonusNumber = parser.toNumber(bonusNumber);
    BonusNumberValidator.bonusNumber(winningNumbers, parsedBonusNumber);
    return parsedBonusNumber;
  }

  async #inputRestart() {
    const restart = await input.restart();
    if (restart.toLowerCase() === "y") return this.play();
  }

  printStatistics(winningNumbers, bonusNumber) {
    output.winningStatistics();
    const countStatistics = this.#lottoMachine.getStatistics(
      winningNumbers,
      bonusNumber
    );
    Object.entries(countStatistics).forEach(([rank, amount]) =>
      output.matchResult(rank, amount)
    );

    output.winningRate(this.#lottoMachine.getWinningRate(countStatistics));

    output.newLine();
  }

  printLottos() {
    const lottos = this.#lottoMachine.getLottosNumber();
    output.lottoAmount(lottos.length);
    lottos.forEach((lottoNumber) => {
      output.lottoNumbers(lottoNumber);
    });
    output.newLine();
  }
}
