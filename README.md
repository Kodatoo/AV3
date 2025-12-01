# AeroCode - README

## 🚀 Como rodar o projeto

> **⚠️ Importante:** Para rodar o Frontend e o Backend ao mesmo tempo, é recomendado abrir **dois terminais separados**, um para cada parte do projeto.

---

# 📌 FRONTEND

### **1. Acessar a pasta principal**

```bash
cd av3
```

### **2. Acessar a pasta do front**

```bash
cd frontend
```

### **3. Instalar dependências**

```bash
npm i
```

### **4. Rodar o projeto**

```bash
npm run dev
```

````

---

# 📌 BACKEND

### **1. Acessar a pasta principal**
```bash
cd av3
````

### **2. Acessar a pasta do back**

```bash
cd backend
```

```
```

### **2. Instalar dependências**

```bash
npm i
```

### **3. Criar o arquivo `.env` na raiz do backend**

Configure suas variáveis de ambiente conforme necessário.

### **4. Rodar migrações do Prisma**

```bash
npx prisma migrate dev --name init
```

### **5. Executar seed do banco**

```bash
npx prisma db seed
```

### **6. Rodar o servidor**

```bash
npm run dev
```

---

# 🔐 Logins gerados pelo Seed

| Usuário | Cargo         | Senha     |
| ------- | ------------- | --------- |
| Marcos  | Operador      | **12345** |
| Pedro   | Engenheiro    | **1345**  |
| João    | Administrador | **1234**  |

---

# 🧪 Teste de Latência

Para testar as latências e gerar o CSV corretamente:

### **1. Limpar o arquivo CSV antes de testar**

Execute na raiz do backend:

```powershell
del metrics-log.csv -ErrorAction SilentlyContinue
```

### **2. Faça os testes usando Postman ou Insomnia**

Realize requisições normalmente.

### **3. Exibir o conteúdo do CSV após os testes**

```powershell
type metrics-log.csv
```

Isso mostrará todas as métricas registradas das requisições.

---

# ✔ Projeto configurado com sucesso!

Se precisar adicionar imagens, instruções extras ou documentação da API, posso complementar o README para você.
