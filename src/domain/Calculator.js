import { LOTTO_PRISE, RANK } from "../constant/definition.js";
export default class Calculator {
  // [{matchCount : 1, isMatchBonusNumber : true}]
  static getStatistics(matchCounts) {
    return matchCounts.reduce(
      (acc, { matchCount, isMatchBonusNumber }) => {
        switch (matchCount) {
          case 3: {
            acc[RANK.FIFTH]++;
            break;
          }
          case 4: {
            acc[RANK.FOURTH]++;
            break;
          }
          case 5: {
            if (isMatchBonusNumber) acc[RANK.SECOND]++;
            else acc[RANK.THIRD]++;
            break;
          }
          case 6: {
            acc[RANK.FIRST]++;
            break;
          }
        }
        return acc;
      },
      {
        [RANK.FIFTH]: 0,
        [RANK.FOURTH]: 0,
        [RANK.THIRD]: 0,
        [RANK.SECOND]: 0,
        [RANK.FIRST]: 0,
      }
    );
  }

  static #judgeRank({ matchCount, isMatchBonusNumber }, rank) {
    switch (matchCount) {
      case 3: {
        rank[RANK.FIFTH]++;
        break;
      }
      case 4: {
        rank[RANK.FOURTH]++;
        break;
      }
      case 5: {
        if (isMatchBonusNumber) rank[RANK.SECOND]++;
        else rank[RANK.THIRD]++;
        break;
      }
      case 6: {
        rank[RANK.FIRST]++;
        break;
      }
    }
  }

  static getWinningRate(countStatistics, purchasePrice) {
    const sum = Object.entries(countStatistics).reduce((acc, [key, count]) => {
      return acc + LOTTO_PRISE[key] * count;
    }, 0);
    return (sum / purchasePrice) * 100;
  }
}
