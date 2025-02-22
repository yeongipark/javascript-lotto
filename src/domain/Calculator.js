import DEFINITION from "../constant/Definition.js";

export default class Calculator {
  // [{matchCount : 1, isMatchBonusNumber : true}]
  static getStatistics(matchCounts) {
    const rank = {
      "5등": 0,
      "4등": 0,
      "3등": 0,
      "2등": 0,
      "1등": 0,
    };

    matchCounts.forEach((matchData) => {
      this.#judgeRank(matchData, rank);
    });

    return rank;
  }

  static #judgeRank({ matchCount, isMatchBonusNumber }, rank) {
    switch (matchCount) {
      case 3: {
        rank["5등"]++;
        break;
      }
      case 4: {
        rank["4등"]++;
        break;
      }
      case 5: {
        if (isMatchBonusNumber) rank["2등"]++;
        else rank["3등"]++;
        break;
      }
      case 6: {
        rank["1등"]++;
        break;
      }
    }
  }

  static getWinningRate(countStatistics, purchasePrice) {
    const sum = Object.entries(countStatistics).reduce((acc, [key, count]) => {
      return acc + DEFINITION.LOTTO_PRISE[key] * count;
    }, 0);
    return (sum / purchasePrice) * 100;
  }
}
