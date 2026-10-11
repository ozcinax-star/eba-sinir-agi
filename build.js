// index.html içindeki statik konu dizinini eba-data.js'ten üretir (JS'siz ve 3B'siz kullanım, SEO).
const fs = require('fs');
global.window = {};
require('./eba-data.js');
const D = window.EBA_DATA;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let h = '        <p class="lead">Harita ile aynı konular, aynı sırayla. Bir konuya dokunursan ön koşulları, sonraki konuları ve resmî kaynakları görürsün.</p>\n';
D.themes.forEach(t => {
  const label = t.grade === 'O' ? 'Ortaokul' : t.grade + '. sınıf';
  h += `        <h3>${esc(t.name)} <small>${esc(label.toLocaleUpperCase('tr'))}</small>${t.url ? ` <a class="off" href="${t.url}" target="_blank" rel="noopener">Resmî tema sayfası<span class="sr"> (yeni sekmede açılır)</span></a>` : ''}</h3>\n        <ul>\n`;
  D.topics.filter(x => x.theme === t.id).forEach(x => {
    h += `          <li><a class="t" href="#konu=${x.id}"><b>${esc(x.name)}</b><span>${esc(x.code)}</span><p>${esc(x.summary)}</p></a></li>\n`;
  });
  h += '        </ul>\n';
});
h += `        <p class="foot">Kaynak: ${esc(D.curriculum)}. <a href="${D.programPdf}" target="_blank" rel="noopener">Öğretim programı (PDF)<span class="sr"> (yeni sekmede açılır)</span></a></p>\n`;
let src = fs.readFileSync('index.html', 'utf8');
src = src.replace(/<!--LIST:START-->[\s\S]*<!--LIST:END-->/, '<!--LIST:START-->\n' + h + '<!--LIST:END-->');
fs.writeFileSync('index.html', src);
console.log('topics', D.topics.length, 'links', D.links.length, 'themes', D.themes.length);
