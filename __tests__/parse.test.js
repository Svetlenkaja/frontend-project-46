import fileParse from "../src/parse";
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

test("Incorrect file format", () => {
  const path = '__fixtures__/file.txt';
  const file = readFileSync(path, 'utf-8');

  expect(() => fileParse(file, extname(path))).toThrow();
});