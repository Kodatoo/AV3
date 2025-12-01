import { Router } from "express"
import {
  getFuncionariosPorEtapa,
  postAssociacao,
  deleteAssociacao,
} from "../controllers/etapafuncionarioController"

const router = Router()

router.get("/:etapaId", getFuncionariosPorEtapa)
router.post("/", postAssociacao)
router.delete("/:etapaId/:funcionarioId", deleteAssociacao)

export default router
