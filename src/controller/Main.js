import LottoMachine from "../domain/LottoMachine.js";
import output from "../view/output.js";
import Winnings from "../domain/Winnings.js";
import input from "../view/input.js";
import parser from "../util/Parser.js";
import PurchasePriceValidator from "../domain/\bvalidator/PurcahsePriceValidator.js";
import { errorHandler } from "../util/errorHandler.js";
import NumbersValidator from "../domain/\bvalidator/NumbersValidator.js";
import BonusNumberValidator from "../domain/\bvalidator/BonusNumberValidator.js";

export default class Main {
  async play() {
    const purchasePrice = await errorHandler(
      this.#inputPurchasePrice.bind(this)
    );
    const lottos = LottoMachine.createLottos(purchasePrice);
    this.printLottos(lottos);

    const winningNumbers = await errorHandler(
      this.#inputWinningNumbers.bind(this)
    );
    const bonusNumber = await errorHandler(() =>
      this.#inputBonusNumber.bind(this)(winningNumbers)
    );
    this.printStatistics({
      winningNumbers,
      bonusNumber,
      lottos,
      purchasePrice,
    });

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

  printStatistics({ winningNumbers, bonusNumber, lottos, purchasePrice }) {
    output.winningStatistics();
    const winnings = new Winnings(winningNumbers, bonusNumber);
    const countStatistics = winnings.countStatistics(
      lottos.map((lotto) => lotto.numbers)
    );
    Object.entries(countStatistics).forEach(([rank, amount]) =>
      output.matchResult(rank, amount)
    );

    output.winningRate(
      winnings.calculateWinningRate(countStatistics, purchasePrice)
    );
    output.newLine();
  }

  printLottos(lottos) {
    output.lottoAmount(lottos.length);
    lottos.forEach((lotto) => {
      output.lottoNumbers(lotto.numbers);
    });
    output.newLine();
  }
}
