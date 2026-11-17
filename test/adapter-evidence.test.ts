// @vitest-environment jsdom
// Hard rule 7: every selector in the adapter must be shown by an outline
// captured from the live site. This test rebuilds a DOM from the trimmed
// outlines in test/fixtures/outlines/ and checks each selector against it.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseAdapter } from '../src/layer/adapter/adapter';

const DIR = join(__dirname, 'fixtures/outlines');
const adapter = parseAdapter(JSON.parse(readFileSync(join(__dirname, '../adapters/disneyplus.json'), 'utf8')));

/** Rebuilds elements from outline lines: `tag#id.class[attr="v"][attr:len]{text:len}`. */
function fromOutline(name: string): HTMLElement {
  const root = document.createElement('div');
  const stack: Array<{ depth: number; el: Element }> = [{ depth: -1, el: root }];
  for (const line of readFileSync(join(DIR, name), 'utf8').split('\n')) {
    if (!line.trim() || line.startsWith('#')) continue;
    const depth = (line.length - line.trimStart().length) / 2;
    const text = line.trim();
    const headEnd = text.search(/[[{]/);
    const head = headEnd < 0 ? text : text.slice(0, headEnd);
    const [tagAndId = '', ...classes] = head.split('.');
    const [tag = 'div', id] = tagAndId.split('#');
    const el = document.createElement(tag);
    if (id) el.id = id;
    if (classes.length) el.setAttribute('class', classes.join(' '));
    for (const m of text.matchAll(/\[([a-z-]+)(?:="([^"]*)"|:(\d+))\]/g)) {
      el.setAttribute(m[1]!, m[2] ?? 'x'.repeat(Number(m[3])));
    }
    const t = /\{text:(\d+)\}/.exec(text);
    if (t) el.textContent = 'x'.repeat(Number(t[1]));
    while (stack[stack.length - 1]!.depth >= depth) stack.pop();
    stack[stack.length - 1]!.el.append(el);
    stack.push({ depth, el });
  }
  return root;
}

const outlines = existsSync(DIR) ? readdirSync(DIR).filter((n) => n.endsWith('.txt')) : [];

describe('the adapter is backed by outlines', () => {
  it('fixtures carry structure only', () => {
    for (const name of outlines) {
      const body = readFileSync(join(DIR, name), 'utf8')
        .split('\n')
        .filter((l) => !l.startsWith('#'))
        .join('\n');
      // No free text can survive: outline lines have no spaces except indentation.
      expect(body.split('\n').every((l) => !l.trim().includes(' '))).toBe(true);
      expect(body).not.toMatch(/https?:|profile-[A-Za-z]/);
    }
  });

  it('every selector matches something in at least one outline', () => {
    const doms = outlines.map(fromOutline);
    for (const [key, list] of Object.entries(adapter.selectors)) {
      for (const sel of list) {
        const shown = doms.some((dom) => dom.querySelector(sel) !== null);
        expect(shown, `${key}: "${sel}" is not shown by any outline in test/fixtures/outlines/`).toBe(true);
      }
    }
  });

  it('an adapter with selectors says it is verified', () => {
    const count = Object.values(adapter.selectors).reduce((n, list) => n + list.length, 0);
    if (count > 0) {
      expect(adapter.verified).toBe(true);
      expect(adapter.revision).toBeGreaterThan(0);
    }
  });

  it('row arrows: the banner and a card row each have one previous and one next button beside their strip', () => {
    const dom = fromOutline('home-rows.txt');
    const prev = adapter.selectors.rowPrev[0]!;
    const next = adapter.selectors.rowNext[0]!;
    const sections = dom.querySelectorAll('[data-testid="set-section"]');
    expect(sections).toHaveLength(2);
    for (const section of sections) {
      expect(section.querySelectorAll(prev)).toHaveLength(1);
      expect(section.querySelectorAll(next)).toHaveLength(1);
      // The arrows are siblings of the strip, not inside it, and are not cards.
      const strip = section.querySelector('[data-testid="set-shelf"], [data-testid="hero-immersive-shelf"]')!;
      expect(strip.querySelector(`${prev}, ${next}`)).toBeNull();
      expect(section.querySelector(next)!.parentElement).toBe(strip.parentElement);
    }
  });
});
