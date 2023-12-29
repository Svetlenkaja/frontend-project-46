#!/usr/bin/env node

import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { cwd } from 'node:process';
import fileParse from './parse.js';

const PLUS = '+';
const MINUS = '-';
const SPACE = ' ';

const buildProperty = (arr, sign, key, value) => {
  if (value !== undefined) {
    arr.push(`  ${sign} ${key}: ${value}`);
  }
};

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

const getFile = (path) => {
  const workDir = cwd();
  const absolutePatn = resolve(workDir, path);
  return readFileSync(absolutePatn, 'utf8');
};

export default (filepath1, filepath2) => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);

  const obj1 = fileParse(file1, extname(filepath1));
  const obj2 = fileParse(file2, extname(filepath2));

  const mergeObj = _.merge({}, obj1, obj2);
  const keys = _.sortBy(Object.keys(mergeObj));
  const result = keys
    .reduce((acc, key) => {
      const property = CompareValues(key, obj1[key], obj2[key]);
      return [...acc, ...property];
    }, []).join('\n');
  return `{\n${result}\n}`;
};
