# ADR 0006 — Administrador único sem roles no MVP

## Status
Aceito

## Contexto
O painel administrativo precisa permitir gestão do portal sem criar complexidade prematura de permissões.

## Decisão
Todos os administradores possuem os mesmos poderes no MVP.

Não implementar:
- Roles
- Permissions
- ACL
- Perfis diferenciados

O primeiro administrador será criado por seed.

## Consequências
- Implementação mais simples e direta.
- Menos risco de bugs em autorização granular.
- Permissões diferenciadas podem ser avaliadas em fase futura se houver necessidade real.

