import { readFileSync } from 'node:fs';
import gendiff from '../src/index.js';

let expected;

beforeAll(() => {
  expected = readFileSync('__fixtures__/result', 'utf8');
});

test('Correct diff', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';

  expect(gendiff(path1, path2)).toBe(expected);
});

test('Incorrect file path', () => {
  const path1 = 'file1.json';
  const path2 = 'file2.json';

  expect(() => gendiff(path1, path2)).toThrow();
});
