const { t } = require('../models/content');

function sanitize(str = '') {
  return String(str)
    .trim()
    .slice(0, 1000)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
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
  });
};

exports.submit = (req, res) => {
  const lang = res.locals.lang;
  const { nome, email, tipo, mensagem } = req.body;

  const errors = [];
  if (!nome || nome.trim().length < 2) errors.push('nome');
  if (!email || !isValidEmail(email.trim())) errors.push('email');
  if (!mensagem || mensagem.trim().length < 10) errors.push('mensagem');

  if (errors.length) {
    return res.redirect(`/${lang === 'en' ? 'contacto' : 'contacto'}?erro=true`);
  }

  // Log the contact request (replace with email/webhook in production)
  console.log('[CONTACT]', {
    nome: sanitize(nome),
    email: sanitize(email),
    tipo: sanitize(tipo),
    mensagem: sanitize(mensagem),
    ts: new Date().toISOString(),
  });

  res.redirect('/contacto?enviado=true');
};
