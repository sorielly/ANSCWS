const lat = 51.37;
const lon = -55.59;
export const fetchWeather = async (signal) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FSt_Johns&forecast_days=3`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('Weather service unavailable');
  return res.json();
};
