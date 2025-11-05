import { Router } from "express"
import { fetchWeather } from "../services/fetch-weather.js"
import { fetchQuote } from "../services/fetch-quote.js"

const router = Router()

router.get('/', async (request, response) => {

  const results = await Promise.allSettled([
    fetchWeather(50.45, 30.52),
    fetchQuote()
  ])

  const [weatherResult, quoteResult] = results

  response.json({
    data: {
      weather: weatherResult.status === "fulfilled" ? weatherResult.value : null,
      quoute: quoteResult.status === "fulfilled" ? quoteResult.value : null
    },
    errors: results
      .filter(r => r.status === "rejected")
      .map(r => r.reason)
  })

})

export default router



