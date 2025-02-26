/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import parser from "./util/parser.js";
import PurchasePriceValidator from "./domain/validator/PurchasePriceValidator.js";
import LottoMachine from "./domain/LottoMachine.js";
import NumbersValidator from "./domain/\bvalidator/NumbersValidator.js";
import BonusNumberValidator from "./domain/\bvalidator/BonusNumberValidator.js";

import { lottoMachine } from "./view/node.js";

const buyButton = document.querySelector(".paper_buy_button");
const inputPrice = document.querySelector(".paper_input_price");
const lottoInfoWrap = document.querySelector(".paper_lotto_information_wrap");
const lottoInfo = document.querySelector(".paper_lotto_information");
const lottoCount = document.querySelector(".paper_lotto_count");
const resultButton = document.querySelector(".paper_result_button");
const modal = document.querySelector(".result_modal");
const paper_winning_number_inputs = document.querySelectorAll(
  ".paper_winning_number_input"
);
const paper_bonus_number_input = document.querySelector(
  ".paper_bonus_number_input"
);
const modalCloseButton = document.querySelector(".modal_close_button");
const modalRestartButton = document.querySelector(".modal_restart_button");
const matchCounts = document.querySelectorAll(".modal_match_count");
const winningRate = document.querySelector(".modal_winning_rate");

// 금액 입력에서 엔터 누르면 구매되도록
inputPrice.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buyButton.click();
  }
});

// 구매하기
buyButton.addEventListener("click", () => {
  try {
    const price = parser.toNumber(inputPrice.value);

    PurchasePriceValidator.validatePurchasePrice(price);
    lottoInfoWrap.style.display = "block";
    lottoMachine = new LottoMachine(price);

    const lottosNumber = lottoMachine.getLottosNumber();
    lottoCount.textContent = `총 ${lottosNumber.length}개 구매했습니다.`;

    inputPriceBuyButtonDisabled(true);
    focusFirstNode(paper_winning_number_inputs);

    // 로또 데이터 추가
    lottosNumber.forEach((numbers) => {
      const lottoDiv = createElement({ tag: "div", className: "lotto" });
      const ticketIcon = createElement({
        tag: "div",
        className: "ticket_icon",
        text: "🎟️",
      });
      const lottoNumbersDiv = createElement({
        tag: "div",
        className: "lotto_number",
        text: numbers.sort((a, b) => a - b).join(", "),
      });

      lottoDiv.appendChild(ticketIcon);
      lottoDiv.appendChild(lottoNumbersDiv);
      lottoInfo.appendChild(lottoDiv);
    });
  } catch (error) {
    alert(error.message);
    inputPrice.value = "";
  }
});

// 당첨 번호 입력과 보너스 번호 입력
resultButton.addEventListener("click", () => {
  try {
    const winningNumbers = Array.from(paper_winning_number_inputs).map(
      (winningInput) => Number(winningInput.value)
    );
    const bonusNumber = Number(paper_bonus_number_input.value);

    NumbersValidator.validateNumbers(winningNumbers);
    BonusNumberValidator.validateBonusNumber(winningNumbers, bonusNumber);

    Array.from(paper_winning_number_inputs).forEach((winningInput) => {
      winningInput.disabled = true;
    });
    paper_bonus_number_input.disabled = true;

    const statistics = lottoMachine.getStatistics(winningNumbers, bonusNumber);

    Array.from(matchCounts).forEach((matchCount, index) => {
      const counts = Object.values(statistics);
      matchCount.textContent = counts[index] + "개";
    });

    const rate = lottoMachine.getWinningRate(statistics);
    winningRate.innerHTML = `당신의 총 수익률은 ${rate.toFixed(2)}%입니다.`;

    modal.showModal();
  } catch (error) {
    alert(error.message);
  }
});

// 모달창 닫기
modalCloseButton.addEventListener("click", () => {
  modal.close();
});

// 다시 시작하기
modalRestartButton.addEventListener("click", () => {
  modal.close();
  lottoInfoWrap.style.display = "none";
  inputPrice.value = "";

  inputPriceBuyButtonDisabled(false);
  initNodes(paper_winning_number_inputs);
  initNode(paper_bonus_number_input);
  lottoInfo.innerHTML = "";

  inputPrice.focus();
});

export function disabled(tags, bool) {
  tags.forEach((tag) => {
    tag.disabled = bool;
  });
}

export function createElement({ tag, className, text }) {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (text) element.textContent = text;
  return element;
}

export function focusFirstNode(nodes) {
  nodes[0].focus();
}

export function initNodes(nodes) {
  Array.from(nodes).forEach((node) => {
    initNode(node);
  });
}

export function initNode(node) {
  node.disabled = false;
  node.value = "";
}
