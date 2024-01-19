import { readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { cwd } from 'node:process';
import getDiffTree from './getDiffTree.js';
import parseFile from './parsers.js';
import convertToFormat from './formatters/index.js';

const readFile = (path) => {
  const workDir = cwd();
  const absolutePatn = resolve(workDir, path);
  return readFileSync(absolutePatn, 'utf8');
};

export default (filepath1, filepath2, format = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const obj1 = parseFile(file1, extname(filepath1).slice(1));
  const obj2 = parseFile(file2, extname(filepath2).slice(1));

  const result = getDiffTree(obj1, obj2);
  return convertToFormat(result, format);
};
