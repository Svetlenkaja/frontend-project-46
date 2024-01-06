#!/usr/bin/env node

import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { cwd } from 'node:process';
import fileParse from './parsers.js';

const PLUS = '+';
const MINUS = '-';
const SPACE = ' ';
const SHIFT = 2;

const buildSpaces = (count) => SPACE.repeat(count);

const getFile = (path) => {
  const workDir = cwd();
  const absolutePatn = resolve(workDir, path);
  return readFileSync(absolutePatn, 'utf8');
};

const getSign = (type) => {
  if (type === 'added') {
    return PLUS;
  }
  if (type === 'deleted') {
    return MINUS;
  }
  return SPACE;
};

const formatter = (arr, depth, parentSign) => {
  const result1 = arr.map((node) => {
    const { type, value } = node;
    const sign = getSign(type);
    const childSign = parentSign === sign ? SPACE : sign;
    const countSpaces = 4 * depth - SHIFT;
    if (Array.isArray(value)) {
      const children = formatter(value, depth + 1, sign);
      return `${buildSpaces(countSpaces)}${childSign} ${node.key}: {\n${children}\n${SPACE.repeat(4 * depth)}}`;
    }

    return `${buildSpaces(countSpaces)}${childSign} ${node.key}: ${node.value}`;
  });
  // console.log(result1);
  const result = result1.join('\n');
  return `${result}`;
};

export default (filepath1, filepath2) => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);

  const obj1 = fileParse(file1, extname(filepath1));
  const obj2 = fileParse(file2, extname(filepath2));

  const mergeObj = _.merge({}, obj1, obj2);
  const allKeys = _.sortBy(Object.keys(mergeObj));
  const iter = (keys, node1, node2) => {
    const res = keys
      .reduce((acc, key) => {
        const value1 = _.has(node1, key) ? node1[key] : undefined;
        const value2 = _.has(node2, key) ? node2[key] : undefined;

        if ((typeof value1 !== 'object' || value1 === null) && (typeof value2 !== 'object' || value2 === null)) {
          // console.log(`value1 = ${value1}`);
          if (value1 === value2) {
            acc.push({ key, type: 'unchanged', value: value1 });
          } else {
            if (value1 !== undefined) {
              acc.push({ key, type: 'deleted', value: value1 });
            }
            if (value2 !== undefined) {
              acc.push({ key, type: 'added', value: value2 });
            }
          }
          // console.log(JSON.stringify(property));
          return acc;
        }
        if (typeof value1 === 'object' && typeof value2 === 'object') {
          const mergeNode = _.merge({}, value1, value2);
          const sortKeys = _.sortBy(Object.keys(mergeNode));
          const children = iter(sortKeys, value1, value2);
          acc.push({ key, type: value1 === value2 ? 'unchanged' : 'changed', value: children });

          return acc;
        }
        if (typeof value1 === 'object') {
          const children1 = iter(Object.keys(value1), value1, value2);
          acc.push({ key, type: 'deleted', value: children1 });
          if (value2 !== undefined) {
            acc.push({ key, type: value1 === undefined ? 'unchanged' : 'added', value: value2 });
          }
        } else {
          if (typeof value2 === 'object') {
            const children2 = iter(Object.keys(value2), value1, value2);
            acc.push({ key, type: 'added', value: children2 });
          }
          if (value1 !== undefined) {
            acc.push({ key, type: value2 === undefined ? 'unchanged' : 'deleted', value: value1 });
          }
        }
        return acc;
      }, []);
    return res;
  };
  const result = iter(allKeys, obj1, obj2);
  //console.log(result);
  //console.log(JSON.stringify(result));
  return formatter(result, 1, 'changed');
};
