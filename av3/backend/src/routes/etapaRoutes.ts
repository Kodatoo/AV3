
import { Router } from "express"
import {
  getEtapas,
  postEtapa,
  putEtapa,
  deleteEtapa,
} from "../controllers/etapaControllers"

const router = Router()

router.get("/", getEtapas)
router.post("/", postEtapa)
router.put("/:id", putEtapa)
router.delete("/:id", deleteEtapa)

export default router
