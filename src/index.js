#!/usr/bin/env node

import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { cwd } from 'node:process';
import fileParse from './parsers.js';
import formatter from './formatters/index.js';

const getFile = (path) => {
  const workDir = cwd();
  const absolutePatn = resolve(workDir, path);
  return readFileSync(absolutePatn, 'utf8');
};

const compare = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const result = keys
    .reduce((acc, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (_.isEqual(value1, value2)) {
        acc.push({ key, type: 'unchanged', value: value1 });
        return acc;
      }
      if (!_.has(obj1, key) && _.has(obj2, key)) {
        acc.push({ key, type: 'added', value: value2 });
        return acc;
      }
      if (_.has(obj1, key) && !_.has(obj2, key)) {
        acc.push({ key, type: 'deleted', value: value1 });
        return acc;
      }
      if (_.isObject(value1) && _.isObject(value2)) {
        const children = compare(value1, value2);
        acc.push({ key, type: 'nested', value: children });
        return acc;
      }
      acc.push({
        key, type: 'changed', valueOld: value1, valueNew: value2,
      });
      return acc;
    }, []);
  return result.flat();
};

export default (filepath1, filepath2, format = 'stylish') => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);

  const obj1 = fileParse(file1, extname(filepath1));
  const obj2 = fileParse(file2, extname(filepath2));

  const result = compare(obj1, obj2);
  return formatter(result, format);
};
