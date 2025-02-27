import $lottoMachine from "../domain/LottoMachine.js";
import PurchasePriceValidator from "../domain/\bvalidator/PurchasePriceValidator.js";
import domRefs from "./dom.js";
import parser from "../util/parser.js";
import { disabled, focusFirstNode, createElement } from "../util/webUtil.js";

domRefs.$buyButton.addEventListener("click", () => {
  try {
    const price = parser.toNumber(domRefs.$inputPrice.value);
    PurchasePriceValidator.validatePurchasePrice(price);

    domRefs.$$lottoInfoWrap.style.display = "block";
    domRefs.$lottoMachine = new $lottoMachine(price);

    const lottosNumber = domRefs.$lottoMachine.getLottosNumber();
    domRefs.$lottoCount.textContent = `총 ${lottosNumber.length}개 구매했습니다.`;

    disabled([domRefs.$inputPrice, domRefs.$buyButton], true);
    focusFirstNode(domRefs.$paper_winning_number_inputs);

    // 로또 데이터 추가
    createLotto(lottosNumber);
  } catch (error) {
    alert(error.message);
    domRefs.$inputPrice.value = "";
  }
});

// 로또 생성
function createLotto(lottosNumber) {
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
    domRefs.$lottoInfo.appendChild(lottoDiv);
  });
}

// 금액 입력에서 엔터 누르면 구매되도록
domRefs.$inputPrice.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    domRefs.$buyButton.click();
  }
});
