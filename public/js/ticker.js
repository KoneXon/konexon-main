// Ticker — depends on TICKER injected by home.ejs
function buildRow(items) {
  return [...items, ...items]
    .map(s => `<div class="sc"><div class="si ${s.c}">${s.i}</div><div><div class="sn">${s.n}</div><div class="sd">${s.d}</div></div></div>`)
    .join('');
}
document.getElementById('r1').innerHTML = buildRow(TICKER.r1);
document.getElementById('r2').innerHTML = buildRow(TICKER.r2);
document.getElementById('r3').innerHTML = buildRow(TICKER.r3);
