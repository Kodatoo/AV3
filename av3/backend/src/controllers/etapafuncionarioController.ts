import { Request, Response } from "express"
import {
  listarFuncionariosDeEtapa,
  associarFuncionarioEtapa,
  desassociarFuncionarioEtapa,
} from "../services/etapaFuncionarioService"

export const getFuncionariosPorEtapa = async (req: Request, res: Response) => {
  try {
    const etapaId = Number(req.params.etapaId)
    const relacoes = await listarFuncionariosDeEtapa(etapaId)

    const funcionarios = relacoes.map((r) => r.funcionario)
    res.status(200).json(funcionarios)
  } catch (error) {
    console.error("ERRO AO LISTAR FUNCIONARIOS DA ETAPA >>>", error)
    res
      .status(500)
      .json({ message: "Erro ao listar funcionários da etapa" })
  }
}

export const postAssociacao = async (req: Request, res: Response) => {
  try {
    const { etapaId, funcionarioId } = req.body

    const nova = await associarFuncionarioEtapa(
      Number(etapaId),
      Number(funcionarioId)
    )

    res.status(201).json(nova)
  } catch (error) {
    console.error("ERRO AO ASSOCIAR FUNCIONARIO >>>", error)
    res
      .status(500)
      .json({ message: "Erro ao associar funcionário à etapa" })
  }
}

export const deleteAssociacao = async (req: Request, res: Response) => {
  try {
    const etapaId = Number(req.params.etapaId)
    const funcionarioId = Number(req.params.funcionarioId)

    await desassociarFuncionarioEtapa(etapaId, funcionarioId)
    res.status(204).send()
  } catch (error) {
    console.error("ERRO AO REMOVER ASSOCIACAO >>>", error)
    res
      .status(500)
      .json({ message: "Erro ao remover associação" })
  }
}
