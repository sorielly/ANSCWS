const LAT = 51.37;
const LON = -55.59;

export const fetchStAnthonyWeather = async (signal) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FSt_Johns&forecast_days=4`;
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error('Unable to fetch weather.');
  return response.json();
};
