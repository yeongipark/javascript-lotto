export const RANK = {
  FIRST: "1등",
  SECOND: "2등",
  THIRD: "3등",
  FOURTH: "4등",
  FIFTH: "5등",
};

export const LOTTO_PRISE = {
  [RANK.FIFTH]: 5_000,
  [RANK.FOURTH]: 50_000,
  [RANK.THIRD]: 1_500_000,
  [RANK.SECOND]: 30_000_000,
  [RANK.FIRST]: 2_000_000_000,
};

export const LOTTO_RULE = {
  [RANK.FIFTH]: 3,
  [RANK.FOURTH]: 4,
  [RANK.THIRD]: 5,
  [RANK.SECOND]: 5,
  [RANK.FIRST]: 6,
};

export const LOTTO_LENGTH = 6;

export const LOTTO_NUMBER_RANGE = {
  MIN: 1,
  MAX: 45,
};

export const SPLIT = ",";
export const EMPTY = "";
