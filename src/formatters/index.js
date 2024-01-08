import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (array, format) => {
  console.log(format);
  switch (format) {
    case 'stylish':
      return stylish(array);
    case 'plain':
      return plain(array);
    default:
      return null;
  }
};

export default formatter;
