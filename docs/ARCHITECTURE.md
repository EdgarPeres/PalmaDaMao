# ARQUITETURA — PALMA DA MÃO

## Objetivo
Definir a estrutura técnica do projeto para garantir organização, escalabilidade, legibilidade e manutenibilidade.

## Princípios
- Mobile first
- PWA desde o início
- Arquitetura por domínio
- Código limpo
- Baixo acoplamento
- Componentes reutilizáveis
- Regras de negócio isoladas
- Documentação sempre atualizada
- Simplicidade antes de abstrações complexas
- Escalabilidade gradual

## Diretriz arquitetural

Não criar abstrações complexas antecipadamente.

Evitar:
- Microserviços
- CQRS
- Event Bus
- Repository genérico universal
- Clean Architecture excessivamente complexa
- Patterns sem necessidade real

Priorizar:
- Simplicidade
- Legibilidade
- Organização
- Escalabilidade gradual
- Facilidade de manutenção

## Stack
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Prisma ORM
- PostgreSQL
- NextAuth
- JWT
- Docker
- GitHub

## Estrutura recomendada

```txt
src/
  app/
    (public)/
    admin/
    api/
  modules/
    auth/
    company/
    category/
    category-group/
    city/
    banner/
    suggestion/
    metrics/
    dashboard/
    settings/
    logs/
    uploads/
    admin/
  components/
    ui/
    layout/
    shared/
  lib/
    prisma/
    auth/
    validations/
    utils/
  styles/
```

Não criar módulo `neighborhood`. Bairro será apenas um campo texto em `Company.neighborhood`.

## Padrão de módulo

```txt
modules/company/
  components/
  actions/
  services/
  repositories/
  schemas/
  types/
  utils/
```

## Camadas
- components: interface
- schemas: validações com Zod
- actions: Server Actions / handlers
- services: regras de negócio
- repositories: acesso ao banco
- types: tipos do domínio
- utils: funções auxiliares

## Rotas públicas
```txt
/
 /montividiu
 /montividiu/categoria/[slug]
 /montividiu/empresa/[slug]
```

## Rotas admin
```txt
/admin/login
/admin/dashboard
/admin/empresas
/admin/categorias
/admin/grupos
/admin/banners
/admin/destaques
/admin/sugestoes
/admin/usuarios
/admin/configuracoes
/admin/logs
```

## Autenticação
- NextAuth
- Credentials Provider
- JWT
- Middleware protegendo /admin/*
- Sem recuperação automática de senha no MVP
- Todos os administradores possuem os mesmos poderes.
- Não implementar roles, permissions, ACL ou perfis diferenciados no MVP.
- O primeiro administrador deve ser criado por seed.

## Cidades
- O sistema deve ser preparado para múltiplas cidades.
- No MVP, Montividiu será a única cidade utilizada publicamente.
- O administrador poderá cadastrar outras cidades futuramente.
- Não implementar seletor avançado de cidades no MVP.

## Manutenção
- Quando o modo manutenção estiver ativo, bloquear páginas públicas e exibir tela de manutenção.
- Rotas `/admin/*` continuam acessíveis para administradores.
- APIs administrativas continuam funcionando.

## Uploads
- Storage local em /uploads
- JPG/PNG
- Máximo 5 MB por arquivo
- Futuramente pode migrar para Cloudflare R2
- Imagem padrão de empresa: `/uploads/system/default-company.png`
- Ao excluir banner, remover o registro do banco e o arquivo associado.

## Mobile First
Toda tela deve ser projetada primeiro para celular, depois adaptada para tablet e desktop.

## Regras para o Codex
- Não implementar funcionalidades fora do MVP.
- Não criar carrinho, pedido ou pagamento.
- Não criar avaliação, favorito ou comentário.
- Manter módulos separados.
- Criar código legível e tipado.
- Atualizar documentação quando alterar arquitetura.
