import { Request, Response } from "express"
import { listarTestes, criarTeste } from "../services/testeService"
import { ResultadoTeste, TipoTeste } from "@prisma/client"

const mapTipoFromFront = (t: string): TipoTeste => {
  if (t === "Elétrico") return "ELETRICO"
  if (t === "Hidráulico") return "HIDRAULICO"
  return "AERODINAMICO"
}

const mapResultadoFromFront = (r: string): ResultadoTeste => {
  return r === "APROVADO" ? "APROVADO" : "REPROVADO"
}

export const getTestes = async (_req: Request, res: Response) => {
  try {
    const testes = await listarTestes()
    res.status(200).json(testes)
  } catch (error) {
    console.error("ERRO AO LISTAR TESTES >>>", error)
    res.status(500).json({ message: "Erro ao listar testes" })
  }
}

export const postTeste = async (req: Request, res: Response) => {
  try {
    const { tipo, resultado, data, aeronaveId } = req.body

    const novo = await criarTeste({
      tipo: mapTipoFromFront(tipo),
      resultado: mapResultadoFromFront(resultado),
      data: data ? new Date(data) : undefined,
      aeronaveId: Number(aeronaveId),
    })

    res.status(201).json(novo)
  } catch (error) {
    console.error("ERRO AO CRIAR TESTE >>>", error)
    res.status(500).json({ message: "Erro ao criar teste" })
  }
}
