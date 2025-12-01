import { Request, Response } from "express"
import {
  listarRelatoriosCompletos,
  criarRelatorio,
} from "../services/relatorioService"

export const getRelatorios = async (_req: Request, res: Response) => {
  try {
    const lista = await listarRelatoriosCompletos()
    res.status(200).json(lista)
  } catch (error) {
    console.error("ERRO AO LISTAR RELATORIOS >>>", error)
    res.status(500).json({ message: "Erro ao listar relatórios" })
  }
}

export const postRelatorio = async (req: Request, res: Response) => {
  try {
    const { aeronaveId } = req.body

    if (!aeronaveId) {
      return res
        .status(400)
        .json({ message: "aeronaveId é obrigatório" })
    }

    const novo = await criarRelatorio(Number(aeronaveId))
    res.status(201).json(novo)
  } catch (error) {
    console.error("ERRO AO CRIAR RELATORIO >>>", error)
    res.status(500).json({ message: "Erro ao criar relatório" })
  }
}
