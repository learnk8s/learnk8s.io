const shell = require('shelljs');
const cheerio = require('cheerio');

shell.ls('*.svg').forEach(svg => {
  const fileName = svg.slice(0, -4);
  const $ = cheerio.load(shell.cat(svg).toString(), {decodeEntities: false});
  const skipIds = []
  $('[fill]').each((index, element) => {
    const fill = $(element).attr('fill');
    if (fill.startsWith('url(#')) {
      skipIds.push(fill.substring(5, fill.length - 1))
    }
  });
  $('[id]').each((i, element) => {
    const id = $(element).attr('id');
    if (skipIds.includes(id)) {
      return;
    }
    if (new RegExp(`^${fileName}-animejs`, 'i').test(id)) {
      return;
    }
    if (!/^animejs/i.test(id)) {
      $(element).attr('id', null);
    } else {
      $(element).attr('id', `${fileName}-${id}`);
    }
  });
  $('svg').attr('width', null);
  $('svg').attr('height', null);
  $('svg').attr('id', fileName);
  $('[font-family]').each((index, element) => {
    $(element).attr('font-family', null)
    $(element).addClass('sans-serif')
  });
  shell.ShellString($('body').html()).to(svg);
});