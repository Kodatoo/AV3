
import { Router } from "express"
import { getRelatorios, postRelatorio } from "../controllers/relatorioController"

const router = Router()

router.get("/", getRelatorios)
router.post("/", postRelatorio)

export default router
