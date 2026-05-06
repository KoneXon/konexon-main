const { t } = require('../models/content');

function sanitize(str = '') {
  return String(str).trim().slice(0, 1000).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.index = (req, res) => {
  const lang = res.locals.lang;
  res.render('contacto', {
    page: 'contacto',
    lang,
    meta: t[lang].contacto.meta,
    c: t[lang].contacto,
    flash: req.query.enviado ? 'success' : req.query.erro ? 'error' : null,
    fieldErrors: [],
    values: {},
  });
};

exports.submit = (req, res) => {
  const lang = res.locals.lang;

  // Defensive: on Vercel the body may come pre-parsed or unparsed
  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const { nome = '', email = '', tipo = '', mensagem = '' } = body;

  const fieldErrors = [];
  if (!nome || nome.trim().length < 2)   fieldErrors.push('nome');
  if (!email || !isValidEmail(email.trim())) fieldErrors.push('email');
  if (!mensagem || mensagem.trim().length < 5) fieldErrors.push('mensagem');

  if (fieldErrors.length) {
    return res.render('contacto', {
      page: 'contacto',
      lang,
      meta: t[lang].contacto.meta,
      c: t[lang].contacto,
      flash: 'error',
      fieldErrors,
      values: { nome, email, tipo, mensagem },
    });
  }

  console.log('[CONTACT]', {
    nome: sanitize(nome),
    email: sanitize(email),
    tipo: sanitize(tipo),
    mensagem: sanitize(mensagem),
    ts: new Date().toISOString(),
  });

  res.redirect('/contacto?enviado=true');
};
