# CODING STANDARDS — PALMA DA MÃO

## TypeScript
- Usar TypeScript estrito.
- Evitar any.
- Criar tipos claros por domínio.
- Preferir nomes explícitos.

## Componentes
- Componentes pequenos.
- Componentes reutilizáveis em components/shared.
- Componentes específicos dentro do módulo.

## Nomenclatura
- Arquivos: kebab-case.
- Componentes React: PascalCase.
- Funções: camelCase.
- Tipos: PascalCase.

## Validações
- Usar Zod.
- Schemas por módulo.
- Validar entrada no backend.

## Arquitetura
- Priorizar simplicidade, legibilidade e manutenção.
- Evitar abstrações complexas antecipadas.
- Não criar microserviços, CQRS, Event Bus, repository genérico universal ou patterns sem necessidade real no MVP.

## Commits
Usar Conventional Commits:
- feat:
- fix:
- docs:
- refactor:
- chore:
- test:

## Proibições no MVP
Não implementar:
- pedidos
- pagamentos
- carrinho
- avaliações
- favoritos
- marketplace
- chat
- vídeos
