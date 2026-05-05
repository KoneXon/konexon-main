const { t } = require('../models/content');

exports.index = (req, res) => {
  const lang = res.locals.lang;
  res.render('servicos', {
    page: 'servicos',
    lang,
    meta: t[lang].servicos.meta,
    c: t[lang].servicos,
  });
};
