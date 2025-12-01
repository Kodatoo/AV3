import { Request, Response } from "express"
import { criarAeronave, listarAeronaves } from "../services/aeronaveService"

export const postAeronave = async (req: Request, res: Response) => {
  try {
    const { modelo, fabricante, capacidade, tipo } = req.body

    const nova = await criarAeronave({
      modelo,
      fabricante,
      capacidade: Number(capacidade),
      // converte texto do front para enum do Prisma
      tipo: tipo === "Militar" ? "MILITAR" : "COMERCIAL",
    })

    res.status(201).json(nova)
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar aeronave" })
  }
}

export const getAeronaves = async (_req: Request, res: Response) => {
  try {
    const lista = await listarAeronaves()
    res.status(200).json(lista)
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar aeronaves" })
  }
}
