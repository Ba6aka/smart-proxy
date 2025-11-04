export async function fetchWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`

  const response = await fetch(url)
  const data = await response.json()

  const weather = {
    temperature: data.current_weather?.temperature,
    windspeed: data.current_weather?.windspeed,
    winddirection: data.current_weather?.winddirection,
    time: data.current_weather?.time,
    unit: "°C",
  }

  return weather
}