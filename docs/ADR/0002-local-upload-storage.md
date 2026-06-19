# ADR 0002 — Upload Local no MVP

## Status
Aceito

## Contexto
O projeto deve começar simples e barato, sem dependência externa para armazenamento.

## Decisão
Usar upload local em /uploads no MVP.

## Consequências
- Simples de implementar
- Sem custo inicial
- Necessário backup da pasta de uploads
- Migração futura para Cloudflare R2 é possível
