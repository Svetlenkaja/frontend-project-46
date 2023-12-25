#!/usr/bin/env node

import { Command } from 'commander';
import fileParse from './src/parse.js'

const program = new Command();

program
.version('1.0.0')
.description('Compares two configuration files and shows a difference.')
.argument('<filepath1>')
.argument('<filepath2>')
.option('-f, --format <type>', 'output format')
.action((filepath1, filepath2) => {
  console.log(fileParse(filepath1));
  console.log(fileParse(filepath2));
});

program.parse();