import test from 'node:test';
import assert from 'node:assert/strict';
import { createRouter } from '../src/app/router.js';

const createWindowMock = (pathname = '/') => {
  const listeners = new Map();
  return {
    location: { pathname },
    history: {
      pushed: [],
      pushState: (_state, _title, path) => {
        window.location.pathname = path;
        window.history.pushed.push(path);
      }
    },
    addEventListener: (name, callback) => listeners.set(name, callback),
    emit: (name) => listeners.get(name)?.()
  };
};

test('[router] normalizes routes from pathname and unknown routes resolve to 404', () => {
  const originalWindow = globalThis.window;
  globalThis.window = createWindowMock('/');

  try {
    const router = createRouter(() => {});
    assert.equal(router.getRoute(), 'home');

    window.location.pathname = '/events';
    assert.equal(router.getRoute(), 'events');

    window.location.pathname = '/does-not-exist';
    assert.equal(router.getRoute(), '404');
  } finally {
    globalThis.window = originalWindow;
  }
});

test('[router] navigate() pushes expected paths and invokes callback with normalized route', () => {
  const originalWindow = globalThis.window;
  const seenRoutes = [];
  globalThis.window = createWindowMock('/');

  try {
    const router = createRouter((route) => seenRoutes.push(route));

    router.navigate('home');
    assert.equal(window.history.pushed[0], '/');
    assert.equal(seenRoutes[0], 'home');

    router.navigate('trails');
    assert.equal(window.history.pushed[1], '/trails');
    assert.equal(seenRoutes[1], 'trails');

    window.location.pathname = '/mystery';
    window.emit('popstate');
    assert.equal(seenRoutes[2], '404');
  } finally {
    globalThis.window = originalWindow;
  }
});
