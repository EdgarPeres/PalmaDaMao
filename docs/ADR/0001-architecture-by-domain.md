# ADR 0001 — Arquitetura por Domínio

## Status
Aceito

## Contexto
O projeto deve ser legível, escalável e fácil de manter. Como o sistema possui módulos claros, a arquitetura por domínio evita acoplamento excessivo.

## Decisão
Usar estrutura baseada em módulos dentro de src/modules.

## Consequências
- Mais organização
- Melhor manutenção
- Facilidade para Codex localizar responsabilidades
- Mais arquivos no início, porém com melhor escalabilidade
