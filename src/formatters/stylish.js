import _ from 'lodash';

const PLUS = '+';
const MINUS = '-';
const SPACE = ' ';
const SHIFT = 2;
const SPACE_FOR_LEVEL = 4;

const getSign = (type) => {
  if (type === 'added') {
    return PLUS;
  }
  if (type === 'deleted') {
    return MINUS;
  }
  return SPACE;
};

const getSpaces = (depth, isShift = false) => {
  const countShift = isShift ? SHIFT : 0;
  return SPACE.repeat(SPACE_FOR_LEVEL * depth - countShift);
};

const stringify = (obj, level) => {
  const spaces = getSpaces(level, false);
  const keys = Object.keys(obj);
  const result = keys.map((key) => {
    if (_.isObject(obj[key])) {
      const children = stringify(obj[key], level + 1);
      return `${spaces}${key}: {\n${children}\n${spaces}}`;
    }
    return `${spaces}${key}: ${obj[key]}`;
  });
  return result.join('\n');
};

const getStringValue = (value, level) => {
  if (_.isObject(value)) {
    return `{\n${stringify(value, level + 1)}\n${getSpaces(level)}}`;
  }
  return value;
};

const stylish = (array) => {
  const formatter = (arr, depth) => {
    const result = arr.map((node) => {
      const spaces = getSpaces(depth);
      const shiftSpaces = getSpaces(depth, true);

      const { type } = node;

      if (type === 'changed') {
        const valueOld = getStringValue(node.valueOld, depth);
        const valueNew = getStringValue(node.valueNew, depth);
        return `${shiftSpaces}${MINUS} ${node.key}: ${valueOld}\n${shiftSpaces}${PLUS} ${node.key}: ${valueNew}`;
      }

      const key = `${shiftSpaces}${getSign(type)} ${node.key}`;

      if (type === 'nested') {
        const children = formatter(node.value, depth + 1);
        return `${key}: {\n${children}\n${spaces}}`;
      }

      if (_.isObject(node.value)) {
        const children = stringify(node.value, depth + 1);
        return `${key}: {\n${children}\n${spaces}}`;
      }
      return `${key}: ${node.value}`;
    });
    return result.join('\n');
  };
  return `{\n${formatter(array, 1)}\n}`;
};

export default stylish;
