import _ from 'lodash';

const getStringValue = (str) => (_.isString(str) ? `'${str}'` : str);

const getValue = (value) => (_.isObject(value) ? '[complex value]' : getStringValue(value));

const convertToPlain = (array) => {
  const iter = (arr, parentKey) => {
    const result = arr.flatMap((node) => {
      const { type } = node;
      const key = parentKey === undefined ? node.key : `${parentKey}.${node.key}`;

      switch (type) {
        case 'nested': {
          // const children =
          return iter(node.children, key);
        }
        case 'changed':
          return `Property '${key}' was updated. From ${getValue(node.valueOld)} to ${getValue(node.valueNew)}`;
        case 'added':
          return `Property '${key}' was added with value: ${getValue(node.value)}`;
        case 'deleted':
          return `Property '${key}' was removed`;
        default:
          return [];
      }
    });
    return result.join('\n');
  };
  return `${iter(array)}`;
};

export default convertToPlain;
