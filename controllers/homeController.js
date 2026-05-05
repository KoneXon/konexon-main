const { t, shared } = require('../models/content');

exports.index = (req, res) => {
  const lang = res.locals.lang;
  res.render('home', {
    page: 'home',
    lang,
    meta: t[lang].home.meta,
    c: t[lang].home,
    nodes: shared.nodes,
    ticker: shared.ticker,
  });
};
