import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import config from '../site.config.mjs';
for(const page of ['index','download','privacy','terms','license']) {
 const html=await fs.readFile(`dist/${page}.html`,'utf8');
 assert.match(html,/<html lang="en">/);assert.match(html,/<title>.+<\/title>/);assert.match(html,/<main id="main">/);
 for(const match of html.matchAll(/(?:src|href)="(\.\/[^"#]+)(?:#[^"]*)?"/g))await fs.access(path.join('dist',match[1]));
 assert.ok(!/github_pat_|ghp_|sb_secret_|BEGIN PRIVATE KEY/.test(html),'Unexpected secret-shaped content');
}
assert.equal((await fs.readFile('dist/CNAME','utf8')).trim(),new URL(config.origin).hostname);
for(const url of Object.values(config.downloads))assert.ok(url.includes(`/download/v${config.version}/`));
console.log('All pages, local assets, metadata, CNAME and download versions checked.');
