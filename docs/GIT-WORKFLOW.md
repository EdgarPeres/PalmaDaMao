# GIT WORKFLOW — PALMA DA MÃO

## Branches
- main: produção
- develop: desenvolvimento integrado
- feature/nome-da-feature
- fix/nome-do-ajuste
- docs/nome-do-documento

## Fluxo
1. Criar branch a partir de develop.
2. Fazer commits pequenos.
3. Abrir Pull Request.
4. Revisar alterações.
5. Fazer merge em develop.
6. Quando estável, merge em main.

## Commits
Formato:
```txt
feat(company): add company creation form
fix(auth): fix admin route middleware
docs(prd): update product rules
```

## Regras para Codex
- Não commitar mudanças não relacionadas.
- Não alterar escopo sem atualizar documentação.
- Criar PRs pequenos por módulo.
- Evitar misturar refactor com feature.
