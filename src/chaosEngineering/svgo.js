const shell = require('shelljs');
const cheerio = require('cheerio');

shell.ls('*.svg').forEach(svg => {
  const fileName = svg.slice(0, -4);
  const $ = cheerio.load(shell.cat(svg).toString(), {decodeEntities: false});
  $('[id]').each((i, element) => {
    const id = $(element).attr('id');
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
  $('[font-family="Arial-BoldMT, Arial"]').each(updateFonts);
  $('[font-family="ArialMT, Arial"]').each(updateFonts);
  shell.ShellString($('body').html()).to(svg);

  function updateFonts(index, element) {
    $(element).attr('font-family', `-apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif`)
  }
});