import { prisma } from "../prisma"
import { TipoPeca, StatusPeca } from "@prisma/client"

interface CriarPecaInput {
  nome: string
  tipo: TipoPeca
  fornecedor: string
}

interface AtualizarPecaInput {
  nome?: string
  tipo?: TipoPeca
  fornecedor?: string
  status?: StatusPeca
}

export const listarPecas = () => {
  return prisma.peca.findMany()
}

export const buscarPecaPorId = (id: number) => {
  return prisma.peca.findUnique({ where: { id } })
}

export const criarPeca = (data: CriarPecaInput) => {
  return prisma.peca.create({ data })
}

export const atualizarPeca = (id: number, data: AtualizarPecaInput) => {
  return prisma.peca.update({ where: { id }, data })
}

export const deletarPeca = (id: number) => {
  return prisma.peca.delete({ where: { id } })
}
