import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('main loader uses only the Main measurement ID and excludes Taiwan paths', () => {
  const source = read('analytics-main.js');
  assert.match(source, /G-5J0SV9JB26/);
  assert.doesNotMatch(source, /G-RL3SF5JXKM|G-YKNDKKYR5Y|558468355|16106913327/);
  assert.match(source, /pathname\.indexOf\('\/tw\/'\)/);
});

test('Taiwan loader uses only the Taiwan measurement ID and requires the Taiwan path', () => {
  const source = read('tw/assets/analytics.js');
  assert.match(source, /G-RL3SF5JXKM/);
  assert.doesNotMatch(source, /G-5J0SV9JB26|G-YKNDKKYR5Y|558231101|16106977100/);
  assert.match(source, /pathname\.startsWith\('\/tw\/'\)/);
});

test('both loaders wait for explicit consent and guard duplicate configuration', () => {
  for (const path of ['analytics-main.js', 'tw/assets/analytics.js']) {
    const source = read(path);
    assert.match(source, /consent === 'granted'|consent==='granted'/);
    assert.match(source, /data-ga4-measurement/);
    assert.equal((source.match(/gtag\(['"]config['"]/g) || []).length, 1);
    assert.match(source, /googletagmanager\.com\/gtag\/js/);
  }
});

test('shared site scripts load the correct isolated analytics entry point', () => {
  assert.match(read('site-nav.js'), /src = '\/analytics-main\.js'/);
  assert.match(read('tw/assets/site.js'), /src='\/tw\/assets\/analytics\.js'/);
});

test('privacy notices describe consent-gated analytics', () => {
  assert.match(read('contact.html'), /明确允许匿名分析/);
  const taiwanPrivacy = read('tw/about/privacy/index.html');
  assert.match(taiwanPrivacy, /明確允許匿名分析/);
  assert.doesNotMatch(taiwanPrivacy, /台灣版未啟用外部分析追蹤/);
});