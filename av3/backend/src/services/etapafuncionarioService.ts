import { prisma } from "../prisma"

export const listarFuncionariosDeEtapa = (etapaId: number) => {
  return prisma.etapaFuncionario.findMany({
    where: { etapaId },
    include: { funcionario: true },
  })
}

export const associarFuncionarioEtapa = (
  etapaId: number,
  funcionarioId: number
) => {
  return prisma.etapaFuncionario.create({
    data: { etapaId, funcionarioId },
  })
}

export const desassociarFuncionarioEtapa = (
  etapaId: number,
  funcionarioId: number
) => {
  return prisma.etapaFuncionario.delete({
    where: { etapaId_funcionarioId: { etapaId, funcionarioId } },
  })
}
