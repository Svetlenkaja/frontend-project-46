import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import fileParse from '../src/parsers.js';

test('Incorrect file format', () => {
  const path = '__fixtures__/file.txt';
  const file = readFileSync(path, 'utf-8');

  expect(() => fileParse(file, extname(path).slice(1))).toThrow();
});
