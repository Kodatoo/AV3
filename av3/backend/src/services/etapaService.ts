import { prisma } from "../prisma"
import { StatusEtapa } from "@prisma/client"

interface CriarEtapaInput {
  nome: string
  responsavel: string
  status: StatusEtapa
  dataInicial: Date
  dataFinal: Date
}

interface AtualizarEtapaInput {
  nome?: string
  responsavel?: string
  status?: StatusEtapa
  dataInicial?: Date
  dataFinal?: Date
}

export const listarEtapas = () => {
  return prisma.etapa.findMany()
}

export const criarEtapa = (data: CriarEtapaInput) => {
  return prisma.etapa.create({ data })
}

export const atualizarEtapa = (id: number, data: AtualizarEtapaInput) => {
  return prisma.etapa.update({ where: { id }, data })
}

export const deletarEtapa = (id: number) => {
  return prisma.etapa.delete({ where: { id } })
}
