import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (array, format) => {
  switch (format) {
    case 'stylish':
      return stylish(array);
    case 'plain':
      return plain(array);
    default:
      throw new Error('unknown type of format');
  }
};

export default formatter;
