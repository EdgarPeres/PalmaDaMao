# ADR 0008 — Exclusão física de banners

## Status
Aceito

## Contexto
Banners são peças administrativas substituíveis e não exigem histórico permanente no MVP.

## Decisão
Banner não usará soft delete.

Ao excluir um banner:
- Remover o registro do banco.
- Remover o arquivo associado.

## Consequências
- O banco permanece mais simples.
- A gestão de arquivos precisa garantir remoção segura do arquivo associado.
- Não haverá histórico de banners removidos no MVP.

