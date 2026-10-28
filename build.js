// index.html içindeki statik konu dizinini Biyoloji verisinden üretir (JS'siz ve 3B'siz kullanım, SEO).
// Statik dizin Türkçedir; öbür dil ve öbür dersler app.js tarafından aynı şablondan (D.listHTML) üretilir.
const fs = require('fs');
global.window = {};
require('./eba-core.js'); global.EBA = window.EBA;
require('./subjects/biyoloji.js');
const D = EBA.make(['biyoloji']);
const miss = D.missing();
if (miss.length) { console.error('Eksik ya da hatalı veri:\n  ' + miss.join('\n  ')); process.exit(1); }
D.setLang('tr');
let src = fs.readFileSync('index.html', 'utf8');
src = src.replace(/<!--LIST:START-->[\s\S]*<!--LIST:END-->/, () => '<!--LIST:START-->\n' + D.listHTML() + '<!--LIST:END-->');
fs.writeFileSync('index.html', src);
console.log('topics', D.topics.length, 'links', D.links.length, 'themes', D.themes.length);
