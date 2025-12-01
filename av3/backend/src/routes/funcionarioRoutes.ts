import { Router } from "express"
import {
  getFuncionarios,
  postFuncionario,
  getFuncionarioById
} from "../controllers/funcionarioController"


const router = Router()

router.get("/", getFuncionarios)
router.post("/", postFuncionario)
router.get("/:id", getFuncionarioById)

export default router
