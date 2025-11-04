import express from 'express'
import aggregateRouter from './src/routes/aggregate.js'
import { fetchWeather } from './src/services/fetch-weather.js'
import { fetchQuoute } from './src/services/fetch-quote.js'

console.log(typeof (aggregateRouter))

const app = express()
const port = process.env.PORT || 1338

app.use(express.json())

app.use('/aggregate', aggregateRouter)

app.get('/', (request, response) => {
  response.json({ message: "API Aggregator running" })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

fetchWeather(50.45, 30.52).
  then(response => console.log(response))
  .catch(err => console.error(err))

fetchQuoute().
  then(response => console.log(response))
  .catch(err => console.error(err))