import { Router } from "express"
import { fetchWeather } from "../services/fetch-weather.js"
import { fetchQuote } from "../services/fetch-quote.js"

const router = Router()

let cash = {
  timestamp: 0,
  data: null
}

router.get('/', async (request, response) => {

  const now = Date.now()

  if (now - cash.timestamp < 60_000 && cash.data != null) {
    return response.json(cash.data)
  }
  else {
    const results = await Promise.allSettled([
      fetchWeather(50.45, 30.52),
      fetchQuote()
    ])

    const [weatherResult, quoteResult] = results
    const data = {
      weather: weatherResult.status === "fulfilled" ? weatherResult.value : null,
      quoute: quoteResult.status === "fulfilled" ? quoteResult.value : null
    }

    cash.data = data
    cash.timestamp = Date.now()

    response.json({
      data,
      errors: results
        .filter(r => r.status === "rejected")
        .map(r => r.reason)
    })

  }

})

export default router



