import LottoMachine from "../domain/LottoMachine.js";
import NumbersValidator from "../domain/\bvalidator/NumbersValidator.js";
import BonusNumberValidator from "../domain/\bvalidator/BonusNumberValidator.js";
import PurchasePriceValidator from "../domain/\bvalidator/PurchasePriceValidator.js";
import output from "../view/output.js";
import input from "../view/input.js";
import parser from "../util/parser.js";
import { errorHandler } from "../util/errorHandler.js";

const RESTART = "y";

export default class Main {
  #lottoMachine;

  constructor() {}
  async play() {
    const purchasePrice = await errorHandler(
      this.#inputPurchasePrice.bind(this)
    );
    this.printLottos(purchasePrice);
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
    PurchasePriceValidator.validatePurchasePrice(parsedPurchasePrice);
    return parsedPurchasePrice;
  }

  printLottos(purchasePrice) {
    this.#lottoMachine = new LottoMachine(purchasePrice);
    const lottos = this.#lottoMachine.getLottosNumber();
    output.lottoAmount(lottos.length);
    output.lottoNumbers(lottos);
    output.newLine();
  }

  async #inputWinningNumbers() {
    const winningNumbers = await input.winningNumbers();
    const parsedWinningNumbers = parser.toSplitNumberArray(winningNumbers);
    NumbersValidator.validateNumbers(parsedWinningNumbers);
    return parsedWinningNumbers;
  }

  async #inputBonusNumber(winningNumbers) {
    const bonusNumber = await input.bonusNumber();
    const parsedBonusNumber = parser.toNumber(bonusNumber);
    BonusNumberValidator.validateBonusNumber(winningNumbers, parsedBonusNumber);
    return parsedBonusNumber;
  }

  printStatistics(winningNumbers, bonusNumber) {
    output.winningStatistics();
    const countStatistics = this.#lottoMachine.getStatistics(
      winningNumbers,
      bonusNumber
    );

    output.matchResult(countStatistics);
    output.winningRate(this.#lottoMachine.getWinningRate(countStatistics));
    output.newLine();
  }

  async #inputRestart() {
    const restart = await input.restart();
    if (restart.toLowerCase() === RESTART) return this.play();
  }
}
