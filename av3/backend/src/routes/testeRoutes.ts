
import { Router } from "express"
import { getTestes, postTeste } from "../controllers/testeController"

const router = Router()

router.get("/", getTestes)
router.post("/", postTeste)

export default router
