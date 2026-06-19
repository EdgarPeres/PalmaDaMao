# ADR 0009 — Evitar complexidade arquitetural prematura

## Status
Aceito

## Contexto
O projeto deve ser escalável, mas também fácil de manter, ler e evoluir. Abstrações antecipadas podem aumentar custo sem gerar valor no MVP.

## Decisão
Priorizar simplicidade, legibilidade, organização, escalabilidade gradual e facilidade de manutenção.

Evitar no MVP:
- Microserviços
- CQRS
- Event Bus
- Repository genérico universal
- Clean Architecture excessivamente complexa
- Patterns sem necessidade real

## Consequências
- O código inicial tende a ser mais direto.
- A arquitetura por domínio continua valendo, mas sem camadas ou padrões extras desnecessários.
- Novas abstrações devem surgir apenas quando removerem complexidade real.

