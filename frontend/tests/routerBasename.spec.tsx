import { withRouterBasename } from '@/lib/router';
import { afterEach, describe, expect, it } from 'vitest';

const setRootPath = (rootPath?: string) => {
  document.head
    .querySelectorAll('meta[property="og:root_path"]')
    .forEach((meta) => meta.remove());
  if (rootPath === undefined) return;
  const meta = document.createElement('meta');
  meta.setAttribute('property', 'og:root_path');
  meta.setAttribute('content', rootPath);
  document.head.appendChild(meta);
};

describe('withRouterBasename', () => {
  afterEach(() => setRootPath(undefined));

  it('prefixes a root-relative asset with the root path the UI is served under', () => {
    setRootPath('/spec_bot');

    expect(withRouterBasename('/assets/pdf.worker.min-abc.mjs')).toBe(
      '/spec_bot/assets/pdf.worker.min-abc.mjs'
    );
  });

  it('leaves the asset alone when the UI is served at the root', () => {
    setRootPath('');

    expect(withRouterBasename('/assets/pdf.worker.min-abc.mjs')).toBe(
      '/assets/pdf.worker.min-abc.mjs'
    );
  });

  it('leaves the asset alone when the page carries no root path', () => {
    expect(withRouterBasename('/assets/x.mjs')).toBe('/assets/x.mjs');
  });

  it('leaves an absolute or protocol-relative URL alone', () => {
    setRootPath('/spec_bot');

    expect(withRouterBasename('https://cdn.example.com/x.mjs')).toBe(
      'https://cdn.example.com/x.mjs'
    );
    expect(withRouterBasename('//cdn.example.com/x.mjs')).toBe(
      '//cdn.example.com/x.mjs'
    );
  });
});
