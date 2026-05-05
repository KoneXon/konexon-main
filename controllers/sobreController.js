const { t } = require('../models/content');

exports.index = (req, res) => {
  const lang = res.locals.lang;
  res.render('sobre', {
    page: 'sobre',
    lang,
    meta: t[lang].sobre.meta,
    c: t[lang].sobre,
  });
};
