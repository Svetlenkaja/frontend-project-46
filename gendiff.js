#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from './src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, type) => {
    console.log(gendiff(filepath1, filepath2, type));
  });

program.parse();
