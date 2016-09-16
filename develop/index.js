import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import reporter from 'postcss-reporter';
import each from 'postcss-each';
import plugin from '../src';

const read = name =>
  fs.readFileSync(path.join(__dirname, '..', 'test', 'fixture', name), 'utf8');

var opts = {
  basePath: 'test/fixture',
  maps: [
    {
      config: {
        foo: 'foo value',
        bar: 'bar value',
      },
    },
    'dummy.yml',
    'fonts.yml',
    'breakpoints.yml',
    'assets.yml',
    'loop.yml',
  ],
};

// ['object', 'value', 'block', 'atrule'].forEach(test => {
//   const input = read(`${test}/input.css`);
//
//   postcss()
//     .use(plugin(opts))
//     .use(reporter)
//     .process(input)
//     .then(result => {
//       console.log(result.css);
//     })
//     .catch(console.error);
// });

const input = read('loop/input.css');

postcss()
  .use(plugin(opts))
  // .use(each)
  .use(reporter)
  .process(input)
  .then(result => {
    console.log(result.css);
  })
  .catch(console.error);
