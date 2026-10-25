// index.html içindeki statik konu dizinini eba-data.js'ten üretir (JS'siz ve 3B'siz kullanım, SEO).
// Statik dizin Türkçedir; İngilizce dizini app.js dil değişiminde aynı şablondan (D.listHTML) üretir.
const fs = require('fs');
global.window = {};
require('./eba-data.js');
const D = window.EBA_DATA;
const miss = D.missing();
if (miss.length) { console.error('Eksik ya da fazla İngilizce metin:\n  ' + miss.join('\n  ')); process.exit(1); }
D.setLang('tr');
let src = fs.readFileSync('index.html', 'utf8');
src = src.replace(/<!--LIST:START-->[\s\S]*<!--LIST:END-->/, () => '<!--LIST:START-->\n' + D.listHTML() + '<!--LIST:END-->');
fs.writeFileSync('index.html', src);
console.log('topics', D.topics.length, 'links', D.links.length, 'themes', D.themes.length);
