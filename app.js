const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const path = require('path');
const routes = require('./routes/index');

const app = express();

// ── NONCE (must run before helmet so the callback can read res.locals.nonce) ──
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

// ── SECURITY HEADERS ──
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// ── RATE LIMIT (contact form) ──
const contactLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Demasiados pedidos. Tenta de novo em 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.set('trust proxy', 1);

// ── PARSERS ──
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// ── STATIC ──
app.use(express.static(path.join(__dirname, 'public')));

// ── VIEWS ──
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── LANG MIDDLEWARE ──
app.use((req, res, next) => {
  if (req.query.lang && ['pt', 'en'].includes(req.query.lang)) {
    res.cookie('lang', req.query.lang, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.locals.lang = req.query.lang;
  } else {
    res.locals.lang = req.cookies.lang || 'pt';
  }
  next();
});

// ── ROUTES ──
app.use('/', routes(contactLimit));

// ── 404 ──
app.use((req, res) => {
  res.status(404).render('404', { lang: res.locals.lang });
});

// ── ERROR HANDLER ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno. Tenta de novo mais tarde.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Konexon a correr em http://localhost:${PORT}`));

module.exports = app;
