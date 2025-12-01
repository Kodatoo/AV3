import { prisma } from "../prisma"

export const autenticar = async (usuario: string, senha: string) => {
  const funcionario = await prisma.funcionario.findFirst({
    where: { usuario, senha },
  })

  if (!funcionario) {
    return null
  }

  return {
    id: funcionario.id,
    nome: funcionario.nome,
    nivelPermissao: funcionario.nivelPermissao,
  }
}
