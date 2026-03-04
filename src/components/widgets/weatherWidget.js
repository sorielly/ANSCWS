import { formatDate } from '../../shared/date.js';
import { getWeatherLabel } from '../../features/weather/weatherCodes.js';

export const renderWeatherWidget = (weatherState) => {
  if (weatherState.loading && !weatherState.payload) {
    return '<section class="card"><p class="eyebrow text-subtle">Forecast</p><h3>Weather</h3><p class="text-muted">Loading current conditions…</p></section>';
  }
  if (weatherState.error && !weatherState.payload) {
    return `<section class="card"><p class="eyebrow text-subtle">Forecast</p><h3>Weather</h3><p class="error">${weatherState.error}</p></section>`;
  }

  const current = weatherState.payload.current;
  const daily = weatherState.payload.daily;

  return `<section class="card"><p class="eyebrow text-subtle">Forecast</p><h3>Weather · St. Anthony</h3>
    <p class="key-number">${current.temperature_2m}°C</p>
    <p class="content-measure">${getWeatherLabel(current.weather_code)} · Wind ${current.wind_speed_10m} km/h</p>
    <p class="text-muted">Updated ${new Date(weatherState.updatedAt).toLocaleTimeString()}</p>
    <ul class="forecast-list">
      ${daily.time.slice(0, 3).map((date, index) => `<li>${formatDate(date)} · ${daily.temperature_2m_min[index]}° / ${daily.temperature_2m_max[index]}°</li>`).join('')}
    </ul>
    ${weatherState.error ? `<p class="text-subtle">${weatherState.error}</p>` : ''}
  </section>`;
};
