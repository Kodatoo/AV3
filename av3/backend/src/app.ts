import express from "express"
import aeronaveRoutes from "./routes/aeronaveRoutes"
import authRoutes from "./routes/authRoutes"
import pecaRoutes from "./routes/pecasRoutes"
import etapaRoutes from "./routes/etapaRoutes"
import funcionarioRoutes from "./routes/funcionarioRoutes"
import etapaFuncionarioRoutes from "./routes/etapaFuncionarioRoutes"
import testeRoutes from "./routes/testeRoutes"
import relatorioRoutes from "./routes/relatorioRoutes"
import { metricsMiddleware } from "./middlewares/middlewareMetrics"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())
app.use(metricsMiddleware)

app.use("/aeronaves", aeronaveRoutes)
app.use("/login", authRoutes)
app.use("/pecas", pecaRoutes)
app.use("/etapas", etapaRoutes)
app.use("/funcionarios", funcionarioRoutes)
app.use("/testes", testeRoutes)
app.use("/associacoes", etapaFuncionarioRoutes)
app.use("/relatorios", relatorioRoutes)
export default app
