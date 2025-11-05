export async function fetchQuoteS() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 3000)
  const url = `https://zenquotes.io/api/quotes/random`

  try {
    const response = await fetch(url, { signal: controller.signal })
    const quoute = await response.json()

    clearTimeout(timeout)

    return quoute[0]?.q
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("⏱️Request exceeded waiting time")
    } else {
      console.log("❌ error:", err.message)
    }
  }
}
