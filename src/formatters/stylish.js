#!/usr/bin/env node

const PLUS = '+';
const MINUS = '-';
const SPACE = ' ';
const SHIFT = 2;
const SPACE_FOR_LEVEL = 4;

const getSign = (type) => {
  if (type === 'added') {
    return PLUS;
  }
  if (type === 'removed') {
    return MINUS;
  }
  return SPACE;
};

const stylish = (array) => {
  const formatter = (arr, depth, parentSign) => {
    const arrayWithFormat = arr.map((node) => {
      const { type, value } = node;
      const sign = getSign(type);
      const childSign = parentSign === sign ? SPACE : sign;
      const keyWithFormat = `${SPACE.repeat(SPACE_FOR_LEVEL * depth - SHIFT)}${childSign} ${node.key}`;
      if (Array.isArray(value)) {
        const children = formatter(value, depth + 1, sign);
        const childrenWithFormat = `{\n${children}\n${SPACE.repeat(SPACE_FOR_LEVEL * depth)}}`;
        return `${keyWithFormat}: ${childrenWithFormat}`;
      }
      return `${keyWithFormat}: ${value}`;
    });
    return arrayWithFormat.join('\n');
  };
  const result = formatter(array, 1, 'unchanged');
  console.log(result);
  return `{\n${result}\n}`;
};

export default stylish;
