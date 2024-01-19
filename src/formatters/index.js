import convertToStylish from './stylish.js';
import convertToPlain from './plain.js';
import convertToJson from './json.js';

const convertToFormat = (array, format) => {
  switch (format) {
    case 'stylish':
      return convertToStylish(array);
    case 'plain':
      return convertToPlain(array);
    case 'json':
      return convertToJson(array);
    default:
      throw new Error(`${format} unknown type of format`);
  }
};

export default convertToFormat;
