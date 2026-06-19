# DOCKER — PALMA DA MÃO

## Objetivo
Usar Docker para padronizar o ambiente de desenvolvimento e evitar problemas de configuração.

## Serviços esperados
- app
- postgres

## docker-compose esperado
- Aplicação Next.js
- Banco PostgreSQL
- Volume persistente para banco
- Volume para uploads locais

## Variáveis de ambiente
```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
UPLOAD_DIR=/uploads
```

## Comandos esperados
```bash
docker compose up -d
docker compose down
docker compose logs -f
docker compose exec app npm run prisma:migrate
docker compose exec app npm run prisma:seed
```

## Regra
O projeto deve poder ser iniciado por um novo desenvolvedor apenas com Docker e arquivo .env configurado.

## Seed inicial

O seed deve criar:
- Cidade padrão Montividiu
- Grupos iniciais de categorias
- Configurações iniciais do portal
- Primeiro administrador

Administrador inicial sugerido:
- Email: `admin@palmadamao.com`
- Senha: temporária, definida no seed e alterável depois pelo administrador
