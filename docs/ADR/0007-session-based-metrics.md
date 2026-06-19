# ADR 0007 — Métricas por sessão

## Status
Aceito

## Contexto
Visitantes não possuem conta no MVP, mas o sistema precisa registrar visualizações e cliques externos.

## Decisão
Registrar métricas por sessão usando `sessionId`.

Não associar métricas a:
- Login
- Usuário
- Conta

Empresas mais visualizadas no dashboard devem considerar o histórico completo, sem filtros por período no MVP.

## Consequências
- Mantém o visitante anônimo.
- Evita criar autenticação pública fora do escopo.
- Simplifica o dashboard inicial.

