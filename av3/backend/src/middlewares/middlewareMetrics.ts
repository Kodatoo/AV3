import { Request, Response, NextFunction } from "express"
import fs from "fs"
import path from "path"

// salva o CSV na raiz do backend (onde você roda `npm run dev`)
const metricsFilePath = path.join(process.cwd(), "metrics-log.csv")

// cria o cabeçalho se o arquivo ainda não existir
if (!fs.existsSync(metricsFilePath)) {
  fs.writeFileSync(
    metricsFilePath,
    "timestamp,metodo,rota,tempo_processamento_ms\n",
    { encoding: "utf-8" }
  )
}

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const inicio = process.hrtime.bigint() // alta precisão em ns [web:587]

  res.on("finish", () => {
    const fim = process.hrtime.bigint()
    const diffNs = fim - inicio
    const processamentoMs = Number(diffNs) / 1_000_000 // ms

    const linha =
      [
        new Date().toISOString(),
        req.method,
        req.originalUrl.split("?")[0],
        processamentoMs.toFixed(3),
      ].join(",") + "\n"

    fs.appendFile(metricsFilePath, linha, (err) => {
      if (err) console.error("Erro ao gravar métricas:", err)
    })
  })

  next()
}
