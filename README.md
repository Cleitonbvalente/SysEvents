# 🎫 SysEvents API

Sistema de gestão de eventos culturais (congressos, workshops, shows) com API RESTful.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **Drizzle ORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação
- **Bcrypt** - Hashing de senhas

## 📋 Funcionalidades

- ✅ Cadastro e autenticação de usuários (JWT)
- ✅ CRUD de eventos
- ✅ Programação de atividades por dia/horário
- ✅ Cadastro de palestrantes
- ✅ Venda de ingressos com controle de estoque
- ✅ Checklist de tarefas organizacionais
- ✅ Upload de mídias (pôsteres, fotos, vídeos)
- ✅ Controle de membros organizadores

## 🛠️ Setup do projeto

### Pré-requisitos

- Node.js 18+
- PostgreSQL 15+ (ou Docker)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Cleitonbvalente/SysEvents.git
cd SysEvents

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do PostgreSQL

# Execute as migrations
npm run db:generate
npm run db:migrate

# Inicie o servidor
npm run dev
