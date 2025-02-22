import PurchasePriceValidator from "../src/domain/\bvalidator/PurcahsePriceValidator";

test("구입 금액이 올바른 경우 예외가 발생하지 않는다.", () => {
  const validMoney = 5000;
  expect(() => {
    PurchasePriceValidator.purchasePrice(validMoney);
  }).not.toThrow();
});

test("구입 금액이 1000의 배수가 아니면 예외가 발생한다.", () => {
  const nonMultipleMoney = 1500;
  expect(() => {
    PurchasePriceValidator.purchasePrice(nonMultipleMoney);
  }).toThrow();
});

test("구입 금액이 범위보다 작으면 예외가 발생한다.", () => {
  const tooSmallMoney = 0;
  expect(() => {
    PurchasePriceValidator.purchasePrice(tooSmallMoney);
  }).toThrow();
});

test("구입 금액이 범위보다 크면 예외가 발생한다.", () => {
  const tooBigMoney = 10_000_000_000 + 1000;
  expect(() => {
    PurchasePriceValidator.purchasePrice(tooBigMoney);
  }).toThrow();
});
