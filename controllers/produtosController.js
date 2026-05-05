const { t } = require('../models/content');

exports.index = (req, res) => {
  const lang = res.locals.lang;
  res.render('produtos', {
    page: 'produtos',
    lang,
    meta: t[lang].produtos.meta,
    c: t[lang].produtos,
  });
};
