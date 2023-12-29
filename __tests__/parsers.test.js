import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import fileParse from '../src/parsers.js';

const expected = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('Incorrect file format', () => {
  const path = '__fixtures__/file.txt';
  const file = readFileSync(path, 'utf-8');

  expect(() => fileParse(file, extname(path))).toThrow();
});

test('Correct parse yml', () => {
  const path = '__fixtures__/file1.yml';
  const file = readFileSync(path, 'utf-8');

  expect(fileParse(file, extname(path))).toStrictEqual(expected);
});
