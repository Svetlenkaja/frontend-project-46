import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (array, format) => {
  switch (format) {
    case 'stylish':
      return stylish(array);
    case 'plain':
      return plain(array);
    case 'json':
      return json(array);
    default:
      throw new Error('unknown type of format');
  }
};

export default formatter;
