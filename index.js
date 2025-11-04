import express from 'express'
import aggregateRouter from './src/routes/aggregate.js'

console.log(typeof(aggregateRouter))

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