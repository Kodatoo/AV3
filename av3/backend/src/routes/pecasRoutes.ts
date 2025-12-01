import { Router } from "express"
import {
  getPecas,
  getPecaById,
  postPeca,
  putPeca,
  deletePeca,
} from "../controllers/pecaController"

const router = Router()

router.get("/", getPecas)
router.get("/:id", getPecaById)
router.post("/", postPeca)
router.put("/:id", putPeca)
router.delete("/:id", deletePeca)

export default router