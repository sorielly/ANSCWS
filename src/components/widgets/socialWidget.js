import { formatRelativeTime } from '../../shared/date.js';

export const renderSocialWidget = (posts) => `<section class="card"><p class="eyebrow text-subtle">Updates</p><h3>Social Feed</h3>
  ${posts.map((post) => `<article><p class="content-measure">${post.content}</p><p class="text-muted">${formatRelativeTime(post.createdAt)}</p></article>`).join('')}
  <a href="#" class="inline-link">Follow club updates</a>
</section>`;
