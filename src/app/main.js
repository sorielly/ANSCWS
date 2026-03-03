import { createUiStore } from './stores/uiStore.js';
import { createContentStore } from './stores/contentStore.js';
import { createWeatherStore } from './stores/weatherStore.js';
import { createRouter } from './router.js';
import { createAppRenderer } from './renderApp.js';

const root = document.getElementById('app');
const uiStore = createUiStore();
const contentStore = createContentStore();
const weatherStore = createWeatherStore();

let renderer;
const router = createRouter((route) => renderer.render(route));
renderer = createAppRenderer({ root, uiStore, contentStore, weatherStore, router });

uiStore.subscribe(() => renderer.render());
contentStore.subscribe(() => renderer.render());
weatherStore.subscribe(() => renderer.render());

renderer.render();
weatherStore.refresh();
