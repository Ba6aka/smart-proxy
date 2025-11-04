// src/services/fetchWeather.js

export async function fetchWeather(latitude = 50.45, longitude = 30.52) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      return {
        ok: false,
        source: "weather",
        error: `HTTP ${response.status}`,
      };
    }

    const data = await response.json();

    // Витягуємо тільки те, що потрібно
    const weather = {
      temperature: data.current_weather?.temperature,
      windspeed: data.current_weather?.windspeed,
      winddirection: data.current_weather?.winddirection,
      time: data.current_weather?.time,
      unit: "°C",
    };

    return {
      ok: true,
      source: "weather",
      data: weather,
      fetchedAt: Date.now(),
    };
  } catch (err) {
    clearTimeout(timeout);

    return {
      ok: false,
      source: "weather",
      error: err.name === "AbortError" ? "Timeout" : err.message,
    };
  }
}
