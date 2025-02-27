import NumbersValidator from "../domain/\bvalidator/NumbersValidator.js";
import BonusNumberValidator from "../domain/\bvalidator/BonusNumberValidator.js";
import { disabled } from "../util/webUtil.js";
import domRefs from "./dom.js";

// 당첨 번호 입력과 보너스 번호 입력
domRefs.$resultButton.addEventListener("click", () => {
  try {
    const { winningNumbers, bonusNumber } = getWinningAndBonus();

    winningAndBonusValidate(winningNumbers, bonusNumber);
    disabled(Array.from(domRefs.$paper_winning_number_inputs), true);
    disabled([domRefs.$paper_bonus_number_input], true);

    const statistics = domRefs.$lottoMachine.getStatistics(
      winningNumbers,
      bonusNumber
    );

    displayResult(statistics);

    domRefs.modal.showModal();
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

function getWinningAndBonus() {
  const winningNumbers = Array.from(domRefs.$paper_winning_number_inputs).map(
    (winningInput) => Number(winningInput.value)
  );
  const bonusNumber = Number(domRefs.$paper_bonus_number_input.value);
  return { winningNumbers, bonusNumber };
}

function winningAndBonusValidate(winningNumbers, bonusNumber) {
  NumbersValidator.validateNumbers(winningNumbers);
  BonusNumberValidator.validateBonusNumber(winningNumbers, bonusNumber);
}

function displayResult(statistics) {
  Array.from(domRefs.$matchCounts).forEach((matchCount, index) => {
    const counts = Object.values(statistics);
    matchCount.textContent = counts[index] + "개";
  });

  const rate = domRefs.$lottoMachine.getWinningRate(statistics);
  domRefs.$winningRate.innerHTML = `당신의 총 수익률은 ${rate.toFixed(
    2
  )}%입니다.`;
}
