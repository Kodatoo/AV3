import { prisma } from "../prisma"

const mapTipoTeste = (t: string) =>
  t === "ELETRICO" ? "Elétrico" :
  t === "HIDRAULICO" ? "Hidráulico" :
  "Aerodinâmico"

export const listarRelatoriosCompletos = async () => {
  const relatorios = await prisma.relatorio.findMany({
    include: { aeronave: true },
  })

  const resultado = []

  for (const rel of relatorios) {
    const [etapas, pecas, testes] = await Promise.all([
      prisma.etapa.findMany({ where: { aeronaveId: rel.aeronaveId } }),
      prisma.peca.findMany({ where: { aeronaveId: rel.aeronaveId } }),
      prisma.teste.findMany({ where: { aeronaveId: rel.aeronaveId } }),
    ])

    resultado.push({
      id: rel.id,
      aeronave: rel.aeronave?.modelo,
      cliente: rel.aeronave?.fabricante ?? "Cliente não informado",
      dataEntrega: rel.criadoEm, // será formatado no front
      etapas: etapas.map((e) => e.nome),
      pecas: pecas.map((p) => p.nome),
      resultadosTestes: testes.map((t) => ({
        tipo: mapTipoTeste(t.tipo),
        resultado: t.resultado,
      })),
    })
  }

  return resultado
}

export const criarRelatorio = (aeronaveId: number) => {
  return prisma.relatorio.create({
    data: { aeronaveId },
  })
}
