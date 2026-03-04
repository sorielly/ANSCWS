import { formatRelativeTime } from '../../shared/date.js';

export const renderSocialWidget = (posts) => `<section class="card card--action" aria-label="Club social feed">
  <div class="card__header-row">
    <h3 class="card__title"><span class="icon-dot">💬</span>Social Feed</h3>
    <span class="badge badge--status-event">Live</span>
  </div>
  <div class="card__meta-row muted">
    <span>Volunteer and member updates</span>
  </div>
  <div class="card__body">
    <ul class="item-list item-list--divided">
      ${posts
        .map(
          (post) => `<li class="item-list__stack">
            <p>${post.content}</p>
            <div class="item-list__row muted">
              <span class="badge badge--status-neutral">Post</span>
              <time>${formatRelativeTime(post.createdAt)}</time>
            </div>
          </li>`,
        )
        .join('')}
    </ul>
  </div>
  <footer class="card__footer">
    <a href="#" class="inline-link">Follow club updates</a>
  </footer>
</section>`;
