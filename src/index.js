import _ from 'lodash';
import fileParse from './parse.js'

const PLUS = '+';
const MINUS = '-';
const SPACE = ' ';

const CompareValues = (key, value1, value2) => {
  const arr = [];
  if (value1 === value2) {
    buildProperty(arr, SPACE, key, value1);
  } else {
    buildProperty(arr, MINUS, key, value1);
    buildProperty(arr, PLUS, key, value2);  
  }
  return arr; 
};

const buildProperty = (arr, sign, key, value) => {
  if (value !== undefined) {
    arr.push(`  ${sign} ${key}: ${value}`);
  }
};

export default (filepath1, filepath2) => {
  const obj1 = fileParse(filepath1);
  const obj2 = fileParse(filepath2);
  const mergeObj =_.merge({}, obj1, obj2);
  const keys = _.sortBy(Object.keys(mergeObj));  
  const result = keys
  .reduce((acc, key) => {
    const property = CompareValues(key, obj1[key], obj2[key]);
    return [...acc, ...property];
  }, []).join('\n');
  return `{\n${result}\n}`
};
