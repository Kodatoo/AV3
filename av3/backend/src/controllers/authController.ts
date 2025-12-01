import { Request, Response } from "express"
import { autenticar } from "../services/authService"

export const postLogin = async (req: Request, res: Response) => {
  try {
    const { usuario, senha } = req.body

    const resultado = await autenticar(usuario, senha)

    if (!resultado) {
      return res.status(401).json({ message: "Credenciais inválidas" })
    }

    return res.status(200).json(resultado)
  } catch (error) {
    return res.status(500).json({ message: "Erro ao autenticar" })
  }
}
