/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import parser from "./util/parser.js";
import PurchasePriceValidator from "./domain/validator/PurchasePriceValidator.js";
import LottoMachine from "./domain/LottoMachine.js";
import NumbersValidator from "./domain/\bvalidator/NumbersValidator.js";
import BonusNumberValidator from "./domain/\bvalidator/BonusNumberValidator.js";

const buyButton = document.querySelector("#buyButton");
const inputPrice = document.querySelector("#inputPrice");
const lottoInfoWrap = document.querySelector(".lotto_information_wrap");
const lottoInfo = document.querySelector(".lotto_information");
const lottoCount = document.querySelector(".lotto_count");
const resultButton = document.querySelector(".result_button");
const modal = document.querySelector(".result_modal");
const winningNumberInputs = document.querySelectorAll(".winningNumberInput");
const bonusNumberInput = document.querySelector(".bonusNumberInput");
const modalCloseButton = document.querySelector(".modal_close_button");
const modalRestartButton = document.querySelector(".modal_restart_button");
const matchCounts = document.querySelectorAll(".match_count");
const winningRate = document.querySelector(".modal_winning_rate");

let lottoMachine;

inputPrice.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buyButton.click();
  }
});

// 구매하기
buyButton.addEventListener("click", () => {
  const price = parser.toNumber(inputPrice.value);
  try {
    PurchasePriceValidator.validatePurchasePrice(price);
    lottoInfoWrap.style.display = "block";
    lottoMachine = new LottoMachine(price);
    const lottosNumber = lottoMachine.getLottosNumber();
    lottoCount.textContent = `총 ${lottosNumber.length}개 구매했습니다.`;

    buyButton.disabled = true;
    inputPrice.disabled = true;

    winningNumberInputs[0].focus();

    // 로또 데이터 추가
    lottosNumber.forEach((numbers) => {
      const lottoDiv = document.createElement("div");
      lottoDiv.classList.add("lotto");

      const ticketIcon = document.createElement("div");
      ticketIcon.classList.add("ticket_icon");
      ticketIcon.textContent = "🎟️";

      const lottoNumbersDiv = document.createElement("div");
      lottoNumbersDiv.classList.add("lotto_number");
      lottoNumbersDiv.textContent = numbers.sort((a, b) => a - b).join(", ");

      lottoDiv.appendChild(ticketIcon);
      lottoDiv.appendChild(lottoNumbersDiv);

      lottoInfo.appendChild(lottoDiv);
    });
  } catch (error) {
    alert(error.message);
    lottoInfoWrap.style.display = "none";
    inputPrice.value = "";
  }
});

// 당첨 번호 입력과 보너스 번호 입력
resultButton.addEventListener("click", () => {
  try {
    const winningNumbers = Array.from(winningNumberInputs).map((winningInput) =>
      Number(winningInput.value)
    );
    const bonusNumber = Number(bonusNumberInput.value);

    NumbersValidator.validateNumbers(winningNumbers);
    BonusNumberValidator.validateBonusNumber(winningNumbers, bonusNumber);

    Array.from(winningNumberInputs).forEach((winningInput) => {
      winningInput.disabled = true;
    });
    bonusNumberInput.disabled = true;

    const statistics = lottoMachine.getStatistics(winningNumbers, bonusNumber);

    Array.from(matchCounts).forEach((matchCount, index) => {
      const counts = Object.values(statistics);
      matchCount.textContent = counts[index] + "개";
    });

    const rate = lottoMachine.getWinningRate(statistics);
    winningRate.innerHTML = `당신의 총 수익률은 ${rate.toFixed(2)}%입니다.`;

    modal.showModal();
  } catch (error) {
    console.error(error);
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
  inputPrice.disabled = false;
  buyButton.disabled = false;
  Array.from(winningNumberInputs).forEach((winningInput) => {
    winningInput.disabled = false;
    winningInput.value = "";
  });
  bonusNumberInput.disabled = false;
  bonusNumberInput.value = "";

  lottoInfo.innerHTML = "";

  inputPrice.focus();
});
