# ADR 0005 — Multi-cidade preparado com Montividiu no MVP

## Status
Aceito

## Contexto
O produto deve ser escalável para múltiplas cidades, mas o MVP precisa manter simplicidade e foco na primeira operação.

## Decisão
O sistema será desenvolvido preparado para múltiplas cidades, mantendo entidade `City` e rotas por cidade. No MVP, Montividiu será a única cidade utilizada publicamente.

O administrador poderá cadastrar outras cidades futuramente, mas não será implementado seletor avançado de cidades no MVP.

## Consequências
- A modelagem já suporta expansão futura.
- O MVP evita complexidade desnecessária de navegação multi-cidade.
- Todas as buscas e listagens públicas devem respeitar a cidade atual.

