const plain = (array) => {
  const formatter = (arr, depth, parentKey) => {
    const arrayWithFormat = arr.map((node) => {
      const { type, value } = node;
      if (Array.isArray(value)) {
        const children = formatter(value, depth + 1, node.key);
        return children;
      }
      return `Property '${parentKey}.${node.key}' was ${type} with value: ${value}`;
    });
    return arrayWithFormat.join('\n');
  };
  const result = formatter(array, 1, 'changed');
  // console.log(result);
  return `${result}`;
};

export default plain;
