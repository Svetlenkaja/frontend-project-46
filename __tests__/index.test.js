import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const data = [
  {
    path1: getFixturePath('file1.json'), path2: getFixturePath('file2.json'), expected: readFile('stylish'),
  },
  {
    path1: getFixturePath('file1.json'), path2: getFixturePath('file2.json'), format: 'stylish', expected: readFile('stylish'),
  },
  {
    path1: getFixturePath('file1.yml'), path2: getFixturePath('file2.yaml'), format: 'stylish', expected: readFile('stylish'),
  },
  {
    path1: getFixturePath('file1.json'), path2: getFixturePath('file2.yaml'), format: 'stylish', expected: readFile('stylish'),
  },
  {
    path1: getFixturePath('file1.json'), path2: getFixturePath('file2.json'), format: 'plain', expected: readFile('plain'),
  },
  {
    path1: getFixturePath('file1.json'), path2: getFixturePath('file2.json'), format: 'json', expected: readFile('json'),
  },
];

test.each(data)('.gendiff($path1, $path2, $format)', (
  {
    path1, path2, format, expected,
  },
) => {
  expect(gendiff(path1, path2, format)).toBe(expected);
});

const dataError = [
  {
    path1: 'file1.json', path2: 'file2.json',
  },
  {
    path1: getFixturePath('file1.json'), path2: getFixturePath('file2.json'), format: 'docx',
  },
];

test.each(dataError)('.gendiff($path1, $path2, $format)', (
  {
    path1, path2, format,
  },
) => {
  expect(() => gendiff(path1, path2, format)).toThrow();
});
