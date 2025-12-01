import { PrismaClient, NivelPermissao } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Se já existir pelo menos um funcionário, não recria
  const jaTem = await prisma.funcionario.findFirst();
  if (jaTem) {
    console.log("Funcionários já existem, pulando seed.");
    return;
  }

  await prisma.funcionario.createMany({
    data: [
      {
        nome: "João vitor",
        telefone: "12989885662",
        endereco: "Rua matias peres",
        usuario: "Joao",
        senha: "1234",
        nivelPermissao: NivelPermissao.ADMINISTRADOR,
      },
      {
        nome: "Pedro alves",
        telefone: "12997894423",
        endereco: "Rua das palmeiras",
        usuario: "Pedro",
        senha: "1345",
        nivelPermissao: NivelPermissao.ENGENHEIRO,
      },
      {
        nome: "Marcos cabral",
        telefone: "12976473737",
        endereco: "Rua das Macaxeiras",
        usuario: "marcos",
        senha: "12345",
        nivelPermissao: NivelPermissao.OPERADOR,
      },
    ],
  });

  console.log("Seed de funcionários concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
