async function fetchWithTimeout(url, timeoutMs = 3000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    return await response.json();
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("⏱️ Запит перевищив час очікування");
    } else {
      console.log("❌ Помилка:", err.message);
    }
  }
}