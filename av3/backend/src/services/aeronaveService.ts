import { prisma } from "../prisma"

interface CriarAeronaveInput {
  modelo: string
  fabricante: string
  capacidade: number
  tipo: "COMERCIAL" | "MILITAR"
}

export const criarAeronave = async (data: CriarAeronaveInput) => {
  const aeronave = await prisma.aeronave.create({
    data,
  })
  return aeronave
}

export const listarAeronaves = async () => {
  return prisma.aeronave.findMany()
}
