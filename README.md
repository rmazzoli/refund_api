# Refund API
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

API para gerenciamento de solicitações de reembolso, desenvolvida com **TypeScript**, **Express.js** e **Prisma ORM**.

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Autenticação](#autenticação)
- [Tecnologias](#tecnologias)
- [Tratamento de Erros](#tratamento-de-erros)

## 🎯 Visão Geral

A **Refund API** é uma aplicação backend que permite gerenciar solicitações de reembolso com autenticação JWT, upload de documentos e controle de acesso baseado em papéis (Role-Based Access Control).

A API suporta dois tipos de usuários:
- **Employee**: Pode criar e visualizar suas próprias solicitações de reembolso
- **Manager**: Pode visualizar e gerenciar todas as solicitações de reembolso

## ✨ Funcionalidades

- ✅ **Autenticação segura** com JWT e hash de senhas com bcrypt
- ✅ **Gerenciamento de usuários** com diferentes papéis
- ✅ **Solicitações de reembolso** com categorias
- ✅ **Upload de documentos** com armazenamento em disco
- ✅ **Controle de acesso** baseado em papéis
- ✅ **Validação de dados** com Zod
- ✅ **Tratamento robusto de erros**
- ✅ **CORS habilitado** para integração com frontend
- ✅ **Banco de dados** SQLite com Prisma ORM

## 📦 Requisitos

- **Node.js** versão 18.x ou superior
- **npm** versão 9.x ou superior
- **SQLite** (incluído nativamente)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/refund_api.git
cd refund_api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_super_segura_aqui"
PORT=3333
```

### 4. Configure o banco de dados

Execute as migrações:

```bash
npx prisma migrate dev
```

(Opcional) Visualize os dados com Prisma Studio:

```bash
npx prisma studio
```

## ⚙️ Configuração

### Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | String de conexão com o banco de dados | `file:./dev.db` |
| `JWT_SECRET` | Chave secreta para geração de JWT | Uma string aleatória segura |
| `PORT` | Porta da aplicação | `3333` |

### Upload de Arquivo

Os arquivos enviados são armazenados em:
```
./uploads/
```

Certifique-se de que esta pasta existe e tem permissões de escrita.

## 📡 Como Usar

### Inicie o servidor em modo desenvolvimento

```bash
npm run dev
```

O servidor iniciará na porta **3333** por padrão.

### Teste os endpoints

Use uma ferramenta como **Postman**, **Insomnia** ou **cURL** para testar os endpoints.

## 🏗️ Estrutura do Projeto

```
refund_api/
├── src/
│   ├── app.ts                 # Configuração da aplicação Express
│   ├── server.ts              # Inicialização do servidor
│   ├── configs/               # Configurações de módulos
│   │   ├── auth.ts           # Configuração de autenticação JWT
│   │   └── upload.ts         # Configuração de upload
│   ├── controllers/           # Lógica das rotas
│   │   ├── refunds-controller.ts
│   │   ├── sessions-controller.ts
│   │   ├── uploads-controller.ts
│   │   └── users-controller.ts
│   ├── database/              # Configuração de banco de dados
│   │   └── prisma.ts
│   ├── middlewares/           # Middlewares customizados
│   │   ├── ensure-authenticated.ts
│   │   ├── error-handlings.ts
│   │   └── verify-user-authorization.ts
│   ├── providers/             # Provedores de serviços
│   │   └── disk-storage.ts
│   ├── routes/                # Definição de rotas
│   │   ├── index.ts
│   │   ├── refunds-routes.ts
│   │   ├── sessions-routes.ts
│   │   ├── uploads-routes.ts
│   │   └── users-routes.ts
│   ├── types/                 # Tipos TypeScript customizados
│   │   └── express.d.ts
│   └── utils/                 # Utilitários
│       └── AppError.ts
├── prisma/
│   ├── schema.prisma          # Definição do schema do banco
│   └── migrations/            # Histórico de migrações
├── uploads/                   # LocalStorage para uploads
├── tmp/                       # Arquivos temporários
├── .env                       # Variáveis de ambiente
├── tsconfig.json              # Configuração do TypeScript
└── package.json               # Dependências do projeto
```

## 🔌 API Endpoints

### Autenticação (Sessions)

| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|------------|
| `POST` | `/sessions` | Login do usuário | ❌ |

### Usuários

| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|------------|
| `POST` | `/users` | Criar novo usuário | ❌ |
| `GET` | `/users` | Listar usuários | ✅ Manager |

### Solicitações de Reembolso

| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|------------|
| `POST` | `/refunds` | Criar solic. de reembolso | ✅ Employee |
| `GET` | `/refunds` | Listar reembolsos | ✅ |
| `GET` | `/refunds/:id` | Detalhes do reembolso | ✅ |

### Upload de Documentos

| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|------------|
| `POST` | `/uploads` | Upload de arquivo | ✅ |

## 🔐 Autenticação

A API utiliza **JSON Web Tokens (JWT)** para autenticação. 

### Fluxo de Autenticação

1. **Cadastro**: Crie uma conta com `/users` (POST)
2. **Login**: Faça login em `/sessions` (POST) para receber o token JWT
3. **Requisições**: Inclua o token no header `Authorization: Bearer {token}`

### Exemplo de Requisição Autenticada

```bash
curl -H "Authorization: Bearer seu_token_jwt" \
     http://localhost:3333/refunds
```

## 🛠️ Tecnologias

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| `Express.js` | ^4.19.2 | Framework web |
| `TypeScript` | ^5.7.3 | Tipagem estática |
| `Prisma` | ^6.2.1 | ORM para banco de dados |
| `SQLite` | - | Banco de dados |
| `bcrypt` | ^6.0.0 | Hash de senhas |
| `jsonwebtoken` | ^9.0.3 | Geração de JWT |
| `multer` | ^1.4.5-lts.1 | Upload de arquivos |
| `zod` | ^3.24.1 | Validação de schemas |
| `CORS` | ^2.8.5 | Controle de recursos entre origens |

## ⚠️ Tratamento de Erros

A API utiliza uma classe customizada `AppError` para tratamento consistente de erros.

### Formato de Resposta de Erro

```json
{
  "message": "Mensagem de erro descritiva",
  "statusCode": 400
}
```

### Códigos de Status Comuns

| Código | Descrição |
|--------|-----------|
| `400` | Requisição inválida |
| `401` | Não autenticado |
| `403` | Acesso proibido (permissão insuficiente) |
| `404` | Recurso não encontrado |
| `500` | Erro interno do servidor |

## 📝 Variáveis de Banco de Dados

### Modelo de Usuário

- `id`: UUID único
- `name`: Nome do usuário
- `email`: Email único
- `password`: Senha hasheada
- `role`: Papel (employee/manager)
- `createdAt`: Data de criação
- `updatedAt`: Data de última atualização

### Modelo de Reembolso

- `id`: UUID único
- `name`: Nome da solicitação
- `amount`: Valor do reembolso
- `category`: Categoria (food, travel, services, transport, accommodation, others)
- `filename`: Nome do arquivo anexado
- `userId`: Referência ao usuário
- `createdAt`: Data de criação
- `updatedAt`: Data de última atualização

