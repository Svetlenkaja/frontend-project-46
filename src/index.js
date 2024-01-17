import { readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { cwd } from 'node:process';
import getDiffTree from './getDiffTree.js';
import fileParse from './parsers.js';
import formatter from './formatters/index.js';

const getFile = (path) => {
  const workDir = cwd();
  const absolutePatn = resolve(workDir, path);
  return readFileSync(absolutePatn, 'utf8');
};

export default (filepath1, filepath2, format = 'stylish') => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);

  const obj1 = fileParse(file1, extname(filepath1).slice(1));
  const obj2 = fileParse(file2, extname(filepath2).slice(1));

  const result = getDiffTree(obj1, obj2);
  return formatter(result, format);
};
