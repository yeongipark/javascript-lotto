const parser = {
  toNumber: (string) => Number(string),
  toSplitNumberArray: (stringNumbers) =>
    stringNumbers.split(",").map((string) => Number(string)),
};

export default parser;
