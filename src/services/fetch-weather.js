export async function fetchWeather(latitude, longitude) {
  const controller = new AbortController
  const timeout = setTimeout(() => controller.abort(), 3000)
  const url =
    `https://api.open-meteo.com/v1/forecast?
  latitude=${latitude}&longitude=${longitude}
  &current_weather=true`

  try {
    const response = await fetch(url)
    const data = await response.json()
    clearTimeout(timeout)

    const weather = {
      temperature: data.current_weather?.temperature,
      windspeed: data.current_weather?.windspeed,
      winddirection: data.current_weather?.winddirection,
      time: data.current_weather?.time,
      unit: "°C",
    }

    return weather
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("⏱️Request exceeded waiting time")
    } else {
      console.log("❌ error:", err.message)
    }
  }
}
