import { prisma } from "../prisma"
import { ResultadoTeste, TipoTeste } from "@prisma/client"

export const listarTestes = () => {
  return prisma.teste.findMany({
    include: {
      aeronave: true, // se quiser exibir modelo da aeronave no front
    },
  })
}

export const criarTeste = (data: {
  tipo: TipoTeste
  resultado: ResultadoTeste
  data?: Date
  aeronaveId: number
}) => {
  return prisma.teste.create({ data })
}
