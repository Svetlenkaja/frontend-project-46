import _ from 'lodash';

const getStringValue = (str) => (_.isString(str) ? `'${str}'` : str);

const getValue = (value) => (_.isObject(value) ? '[complex value]' : getStringValue(value));

const plain = (array) => {
  const formatter = (arr, parentKey) => {
    const result = arr.flatMap((node) => {
      const { type } = node;
      const key = parentKey === undefined ? node.key : `${parentKey}.${node.key}`;

      if (type === 'nested') {
        const children = formatter(node.value, key);
        return children;
      }

      if (type === 'changed') {
        return `Property '${key}' was updated. From ${getValue(node.valueOld)} to ${getValue(node.valueNew)}`;
      }

      if (type === 'added') {
        return `Property '${key}' was added with value: ${getValue(node.value)}`;
      }

      if (type === 'deleted') {
        return `Property '${key}' was removed`;
      }

      return [];
    });
    return result.join('\n');
  };
  return `${formatter(array)}`;
};

export default plain;
