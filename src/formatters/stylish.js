import _ from 'lodash';

const PLUS = '+';
const MINUS = '-';
const SPACE = ' ';
const SHIFT = 2;
const SPACE_FOR_LEVEL = 4;

const getSpaces = (depth, isShift = false) => {
  const countShift = isShift ? SHIFT : 0;
  return SPACE.repeat(SPACE_FOR_LEVEL * depth - countShift);
};

const getStringValue = (value, depth) => {
  if (!_.isObject(value)) return value;
  const iter = (obj, level) => {
    const keys = Object.keys(obj);
    const result = keys.map((key) => {
      if (_.isObject(obj[key])) {
        const children = getStringValue(obj[key], level + 1);
        return `${getSpaces(level + 1)}${key}: ${children}`;
      }
      return `${getSpaces(level + 1)}${key}: ${obj[key]}`;
    });
    return result.join('\n');
  };
  return `{\n${iter(value, depth)}\n${getSpaces(depth)}}`;
};

const convertToStylish = (array) => {
  const iter = (arr, depth) => {
    const result = arr.map((node) => {
      const spaces = getSpaces(depth);
      const shiftSpaces = getSpaces(depth, true);

      const { key, type } = node;

      if (type === 'changed') {
        const strOld = getStringValue(node.valueOld, depth);
        const strNew = getStringValue(node.valueNew, depth);
        const strDeleted = `${shiftSpaces}${MINUS} ${node.key}: ${strOld}`;
        const strAdded = `${shiftSpaces}${PLUS} ${node.key}: ${strNew}`;
        return `${strDeleted}\n${strAdded}`;
      }

      if (type === 'nested') {
        const children = iter(node.children, depth + 1);
        return `${shiftSpaces}${SPACE} ${key}: {\n${children}\n${spaces}}`;
      }

      const value = getStringValue(node.value, depth);
      if (type === 'unchanged') {
        return `${shiftSpaces}${SPACE} ${key}: ${value}`;
      }

      const sign = type === 'added' ? PLUS : MINUS;
      return `${shiftSpaces}${sign} ${key}: ${value}`;
    });
    return result.join('\n');
  };
  return `{\n${iter(array, 1)}\n}`;
};

export default convertToStylish;
