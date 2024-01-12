import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('Correct diff json-format with default type', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const expected = readFile('stylish');

  expect(gendiff(path1, path2)).toBe(expected);
});

test('Correct diff json-format with type = stylish', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const expected = readFile('stylish');

  expect(gendiff(path1, path2, 'stylish')).toBe(expected);
});

test('Correct diff yml-format with default type', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yaml');
  const expected = readFile('stylish');

  expect(gendiff(path1, path2)).toBe(expected);
});

test('Correct diff different formats with type = stylish', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.yaml');
  const expected = readFile('stylish');

  expect(gendiff(path1, path2, 'stylish')).toBe(expected);
});

test('Correct diff json-format with type = plain', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const expected = readFile('plain');

  expect(gendiff(path1, path2, 'plain')).toBe(expected);
});

test('Correct diff json-format with type = json', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const expected = readFile('json');

  expect(gendiff(path1, path2, 'json')).toBe(expected);
});

test('Incorrect file path', () => {
  const path1 = 'file1.json';
  const path2 = 'file2.json';

  expect(() => gendiff(path1, path2)).toThrow();
});

test('Incorrect type of format', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');

  expect(() => gendiff(path1, path2, 'docx')).toThrow();
});
