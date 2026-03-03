import { formatRelativeTime } from '../../shared/date.js';

export const renderSocialWidget = (posts) => `<section class="card"><h3>Social Feed</h3>
  ${posts.map((post) => `<article><p>${post.content}</p><p class="muted">${formatRelativeTime(post.createdAt)}</p></article>`).join('')}
  <a href="#" class="inline-link">Follow club updates</a>
</section>`;
