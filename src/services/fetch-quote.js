export async function fetchQuoute() {
  const url = `https://zenquotes.io/api/quotes/random`

  const response = await fetch(url)
  const quoute = await response.json()

  return quoute[0]?.q
}
