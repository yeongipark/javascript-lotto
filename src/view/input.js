import readline from "readline";

const INPUT_MESSAGE = {
  PURCHASE_PRISE: "구입금액을 입력해 주세요.",
  WINNING_NUMBERS: "당첨 번호를 입력해 주세요. ",
  BONUS_NUMBER: "보너스 번호를 입력해 주세요. ",
  RESTART: "다시 시작하시겠습니까? (y/n) ",
};

const input = {
  async purchasePrice() {
    const purchasePrice = await this.readLineAsync(
      INPUT_MESSAGE.PURCHASE_PRISE
    );
    return purchasePrice;
  },

  async winningNumbers() {
    const winningNumbers = await this.readLineAsync(
      INPUT_MESSAGE.WINNING_NUMBERS
    );
    return winningNumbers;
  },

  async bonusNumber() {
    const bonusNumber = await this.readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
    return bonusNumber;
  },

  async restart() {
    const restart = await this.readLineAsync(INPUT_MESSAGE.RESTART);
    return restart;
  },

  async readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error("arguments must be 1"));
      }

      if (typeof query !== "string") {
        reject(new Error("query must be string"));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  },
};

export default input;
