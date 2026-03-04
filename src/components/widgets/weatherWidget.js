import { formatDate } from '../../shared/date.js';
import { getWeatherLabel } from '../../features/weather/weatherCodes.js';

const weatherBadgeTone = (code) => {
  if (code <= 3) return 'badge--weather-clear';
  if (code < 60) return 'badge--weather-cloud';
  if (code < 80) return 'badge--weather-rain';
  return 'badge--weather-snow';
};

export const renderWeatherWidget = (weatherState) => {
  if (weatherState.loading && !weatherState.payload) {
    return `<section class="card card--metric" aria-live="polite">
      <div class="card__header-row">
        <h3 class="card__title"><span class="icon-dot">☁</span>Weather</h3>
      </div>
      <p class="muted">Loading current conditions…</p>
    </section>`;
  }

  if (weatherState.error && !weatherState.payload) {
    return `<section class="card card--metric" aria-live="polite">
      <div class="card__header-row">
        <h3 class="card__title"><span class="icon-dot">☁</span>Weather</h3>
      </div>
      <p class="error">${weatherState.error}</p>
    </section>`;
  }

  const current = weatherState.payload.current;
  const daily = weatherState.payload.daily;
  const condition = getWeatherLabel(current.weather_code);

  return `<section class="card card--metric" aria-label="Current weather in St. Anthony">
    <div class="card__header-row">
      <h3 class="card__title"><span class="icon-dot">☁</span>Weather · St. Anthony</h3>
      <span class="badge ${weatherBadgeTone(current.weather_code)}">${condition}</span>
    </div>
    <div class="card__meta-row muted">
      <span>${new Date(weatherState.updatedAt).toLocaleTimeString()}</span>
      <span class="separator-dot" aria-hidden="true">•</span>
      <span>Wind ${current.wind_speed_10m} km/h</span>
    </div>
    <div class="card__body">
      <p class="metric-value">${current.temperature_2m}°C</p>
      <ul class="item-list item-list--divided forecast-list">
        ${daily.time
          .slice(0, 3)
          .map(
            (date, index) => `<li class="item-list__row"><span>${formatDate(date)}</span><strong>${daily.temperature_2m_min[index]}° / ${daily.temperature_2m_max[index]}°</strong></li>`,
          )
          .join('')}
      </ul>
    </div>
    <footer class="card__footer">
      <a href="#" class="inline-link">View full trail forecast</a>
      ${weatherState.error ? `<span class="badge badge--status-warning">${weatherState.error}</span>` : ''}
    </footer>
  </section>`;
};
