import { Request, Response } from "express"
import {
  listarPecas,
  buscarPecaPorId,
  criarPeca,
  atualizarPeca,
  deletarPeca,
} from "../services/pecaService"
import { TipoPeca, StatusPeca } from "@prisma/client"

export const getPecas = async (_req: Request, res: Response) => {
  try {
    const pecas = await listarPecas()
    res.status(200).json(pecas)
  } catch {
    res.status(500).json({ message: "Erro ao listar peças" })
  }
}

export const getPecaById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const peca = await buscarPecaPorId(id)
    if (!peca) return res.status(404).json({ message: "Peça não encontrada" })
    res.status(200).json(peca)
  } catch {
    res.status(500).json({ message: "Erro ao buscar peça" })
  }
}

export const postPeca = async (req: Request, res: Response) => {
  try {
    const { nome, tipo, fornecedor } = req.body

    const tipoEnum: TipoPeca =
      tipo === "Importada" ? "IMPORTADA" : "NACIONAL"

    const nova = await criarPeca({
      nome,
      fornecedor,
      tipo: tipoEnum,
    })

    res.status(201).json(nova)
  } catch {
    res.status(500).json({ message: "Erro ao criar peça" })
  }
}

export const putPeca = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { nome, tipo, fornecedor, status } = req.body

    const tipoEnum =
      tipo === "Importada"
        ? "IMPORTADA"
        : tipo === "Nacional"
        ? "NACIONAL"
        : undefined

    const statusEnum =
      status === "PRONTA"
        ? "PRONTA"
        : status === "EM_TRANSPORTE"
        ? "EM_TRANSPORTE"
        : status === "EM_PRODUCAO"
        ? "EM_PRODUCAO"
        : undefined

    const atualizada = await atualizarPeca(id, {
      nome,
      fornecedor,
      tipo: tipoEnum as TipoPeca | undefined,
      status: statusEnum as StatusPeca | undefined,
    })

    res.status(200).json(atualizada)
  } catch {
    res.status(500).json({ message: "Erro ao atualizar peça" })
  }
}

export const deletePeca = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    await deletarPeca(id)
    res.status(204).send()
  } catch {
    res.status(500).json({ message: "Erro ao excluir peça" })
  }
}
