import { Request, Response } from "express"
import {
  listarFuncionarios,
  criarFuncionario,
} from "../services/funcionarioServices"
import { NivelPermissao } from "@prisma/client"
import { buscarFuncionarioPorId } from "../services/funcionarioServices"

const mapNivel = (s: string): NivelPermissao => {
  if (s === "Administrador") return "ADMINISTRADOR"
  if (s === "Engenheiro") return "ENGENHEIRO"
  return "OPERADOR"
}

export const getFuncionarios = async (_req: Request, res: Response) => {
  try {
    const lista = await listarFuncionarios()
    res.status(200).json(lista)
  } catch {
    res.status(500).json({ message: "Erro ao listar funcionários" })
  }
}
export const getFuncionarioById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const func = await buscarFuncionarioPorId(id)

    if (!func) {
      return res.status(404).json({ message: "Funcionario nao encontrado" })
    }

    res.status(200).json(func)
  } catch {
    res.status(500).json({ message: "Erro ao buscar funcionário" })
  }
}


export const postFuncionario = async (req: Request, res: Response) => {
  try {
    const { nome, telefone, endereco, usuario, senha, nivelPermissao } =
      req.body

    const novo = await criarFuncionario({
      nome,
      telefone,
      endereco,
      usuario,
      senha,
      nivelPermissao: mapNivel(nivelPermissao),
    })

    res.status(201).json(novo)
  } catch {
    res.status(500).json({ message: "Erro ao criar funcionário" })
  }

  
}
