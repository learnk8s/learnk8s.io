import * as ReactDOM from 'react-dom/server';
import * as React from 'react';
import {Layout} from './layout';
import * as program from 'commander';
import * as fs from 'fs';
import {resolve} from 'path';
import {rm, cp} from 'shelljs';

program
  .option('-o, --output [value]', 'The directory where to write the files to')
  .parse(process.argv);

if (!isString(program.output)) {
  console.log('Please provide an output directory');
  process.exit(0);
}

rm('-rf', program.output);
cp('-r', './src', program.output);

fs.writeFileSync(resolve(program.output, 'index.html'), ReactDOM.renderToStaticMarkup(<Layout Content={() => <h1>Hello</h1>}/>));

function isString(value: any): value is string {
  return ({}).toString.call(value) === '[object String]';
}