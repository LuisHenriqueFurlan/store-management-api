# 🛍️ Store Management System

> Sistema Full Stack para gerenciamento comercial de lojas desenvolvido como projeto de portfólio.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Backend](https://img.shields.io/badge/backend-Node.js-339933)
![Frontend](https://img.shields.io/badge/frontend-React-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6)
![Fastify](https://img.shields.io/badge/Fastify-000000)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1)
![Prisma](https://img.shields.io/badge/Prisma-2D3748)

---

# 📖 Sobre o projeto

O Store Management System é um sistema completo para gerenciamento comercial de lojas de roupas.

O projeto foi desenvolvido com foco em boas práticas de desenvolvimento, arquitetura limpa, princípios SOLID e organização em módulos, simulando uma aplicação utilizada em ambiente real.

Além do CRUD de produtos, o sistema possui fluxo completo de vendas, pagamentos, controle automático de estoque e dashboard administrativo.

---

# ✨ Funcionalidades

## Usuários

- Login com JWT
- Perfil do usuário
- Rotas protegidas

---

## Categorias

- Criar categoria
- Editar categoria
- Excluir categoria
- Listar categorias

---

## Marcas

- Criar marca
- Editar marca
- Excluir marca
- Listar marcas

---

## Produtos

- Cadastro de produtos
- Associação com categorias
- Associação com marcas
- CRUD completo

---

## Variações de Produto

Cada produto pode possuir diversas variações.

Exemplo:

- Camiseta P
- Camiseta M
- Camiseta G

Cada variação possui:

- SKU
- Estoque
- Estoque mínimo

---

## Controle de Estoque

- Entrada manual
- Saída automática
- Histórico de movimentações
- Controle de estoque mínimo

---

## Vendas

Fluxo completo de venda.

- Criar venda
- Adicionar itens
- Atualizar itens
- Remover itens
- Finalizar venda
- Cancelar venda

---

## Pagamentos

- Dinheiro
- PIX
- Cartão
- Parcelamento
- Pagamentos parciais

---

## Dashboard

- Receita total
- Quantidade de vendas
- Produtos cadastrados
- Estoque crítico
- Últimas vendas
- Distribuição de pagamentos

---

# 📋 Regras de Negócio

O sistema implementa diversas regras para garantir consistência dos dados.

### Estoque

- Não permite vender acima do estoque disponível.
- Cancelar uma venda devolve automaticamente os produtos ao estoque.
- Toda movimentação gera histórico.

### Vendas

- Não é possível finalizar uma venda sem itens.
- Não é possível editar venda finalizada.
- Não é possível cancelar uma venda finalizada.
- Totais da venda são recalculados automaticamente.

### Pagamentos

- O total pago nunca pode ultrapassar o valor da venda.
- É permitido pagamento parcial.
- Não é possível registrar pagamento em venda cancelada.

---

# 🏗️ Arquitetura

O backend foi organizado seguindo uma arquitetura em camadas.

```
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL
```

Cada módulo possui sua própria estrutura.

```
modules
 ├── users
 ├── categories
 ├── brands
 ├── products
 ├── productVariations
 ├── stockMovements
 ├── sales
 ├── saleItems
 └── payments
```

---

# 🗂️ Estrutura do Projeto

```
store-management
│
├── store-management-api
│
│   ├── prisma
│   ├── src
│   │
│   ├── modules
│   │     ├── users
│   │     ├── products
│   │     ├── categories
│   │     ├── brands
│   │     ├── productVariations
│   │     ├── stockMovements
│   │     ├── sales
│   │     ├── saleItems
│   │     └── payments
│   │
│   └── shared
│
└── store-management-web
    ├── src
    │
    ├── components
    ├── pages
    ├── routes
    ├── services
    ├── contexts
    └── hooks
```

---

# 🛠️ Tecnologias

## Backend

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- JWT
- Zod

## Frontend

- React
- TypeScript
- Vite
- React Router
- Axios

---

# 🚀 Como executar

## Backend

```bash
cd store-management-api

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

---

## Frontend

```bash
cd store-management-web

npm install

npm run dev
```

---

# 📈 Roadmap

## Backend

- ✅ Autenticação
- ✅ Produtos
- ✅ Categorias
- ✅ Marcas
- ✅ Variações
- ✅ Estoque
- ✅ Vendas
- ✅ Itens da Venda
- ✅ Pagamentos

## Frontend

- ✅ Estrutura inicial
- ✅ Dashboard
- 🔄 Integração completa com API
- 🔄 Melhorias de UI/UX

## Próximas etapas

- Swagger
- Docker
- Deploy
- Testes automatizados
- Dashboard analítico
- Relatórios

---

# 📷 Screenshots

Em desenvolvimento.

Serão adicionadas imagens do sistema após a conclusão da interface.

---

# 👨‍💻 Autor

**Luís Henrique Furlan**

Projeto desenvolvido para fins de estudo, evolução profissional e composição de portfólio.
