import { Router } from "express"
import { getAeronaves, postAeronave } from "../controllers/aeronaveController"

const router = Router()

router.get("/", getAeronaves)
router.post("/", postAeronave)

export default router
