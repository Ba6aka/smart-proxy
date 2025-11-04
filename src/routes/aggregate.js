import { Router } from "express"

const router = Router()

router.get('/', (request, response) => {
  response.json({ msg: "aggregate route works" })
})

export default router