var browserify = require('browserify');
var tsify = require('tsify');
var {tempdir, ShellString, rm, cat} = require('shelljs');
const getStdin = require('get-stdin');

getStdin().then(str => {
  var path = `./${Date.now()}.tsx`;
  ShellString(`
  var ReactDOMServer = require('react-dom/server');
  ${str}
  console.log(ReactDOMServer.renderToStaticMarkup(run()));
  `).to(path);

  browserify()
    .add(path)
    .plugin(tsify, {files: []})
    .bundle((err, t) => {
      rm('-rf', path)
      if (err) {
        console.log('err:', err);
        return;
      }
      eval(t.toString())
    });
});
