import { prisma } from "../prisma"
import { NivelPermissao } from "@prisma/client"

export const listarFuncionarios = () => prisma.funcionario.findMany()

export const buscarFuncionarioPorId = (id: number) =>
  prisma.funcionario.findUnique({ where: { id } })

export const criarFuncionario = (data: {
  nome: string
  telefone: string
  endereco: string
  usuario: string
  senha: string
  nivelPermissao: NivelPermissao
}) => prisma.funcionario.create({ data })
