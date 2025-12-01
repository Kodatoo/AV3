import { Request, Response } from "express"
import {
  listarEtapas,
  criarEtapa,
  atualizarEtapa,
  deletarEtapa,
} from "../services/etapaService"
import { StatusEtapa } from "@prisma/client"

const mapStatusFromFront = (s: string): StatusEtapa => {
  if (s === "Concluída") return "CONCLUIDA"
  if (s === "Em Andamento") return "EM_ANDAMENTO"
  return "PENDENTE"
}

export const getEtapas = async (_req: Request, res: Response) => {
  try {
    const etapas = await listarEtapas()
    res.status(200).json(etapas)
  } catch {
    res.status(500).json({ message: "Erro ao listar etapas" })
  }
}

export const postEtapa = async (req: Request, res: Response) => {
  try {
    const { nome, responsavel, status, dataInicial, dataFinal } = req.body

    const nova = await criarEtapa({
      nome,
      responsavel,
      status: mapStatusFromFront(status),
      dataInicial: new Date(dataInicial),
      dataFinal: new Date(dataFinal),
    })

    res.status(201).json(nova)
  } catch (error) {
    console.error("ERRO AO CRIAR ETAPA >>>", error)
    res.status(500).json({ message: "Erro ao criar etapa" })
  }
}

export const putEtapa = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { nome, responsavel, status, dataInicial, dataFinal } = req.body

    const atualizada = await atualizarEtapa(id, {
      nome,
      responsavel,
      status: status ? mapStatusFromFront(status) : undefined,
      dataInicial: dataInicial ? new Date(dataInicial) : undefined,
      dataFinal: dataFinal ? new Date(dataFinal) : undefined,
    })

    res.status(200).json(atualizada)
  } catch {
    res.status(500).json({ message: "Erro ao atualizar etapa" })
  }
}

export const deleteEtapa = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    await deletarEtapa(id)
    res.status(204).send()
  } catch {
    res.status(500).json({ message: "Erro ao excluir etapa" })
  }
}
