# API — PALMA DA MÃO

## Convenções
- Usar Server Actions quando fizer sentido.
- Usar API Routes para webhooks, uploads e eventos de métricas.
- Todas as respostas devem ser tipadas.
- Validações devem usar Zod.

## Endpoints / Actions previstos

### Auth
- login
- logout
- seedInitialAdmin

### Empresas
- createCompany
- updateCompany
- softDeleteCompany
- listCompanies
- getCompanyBySlug
- toggleCompanyActive
- toggleCompanyFeatured

Regra de validação:
- Pelo menos um canal de contato deve estar preenchido: WhatsApp, Instagram, Site ou Link Principal.

### Grupos
- createCategoryGroup
- updateCategoryGroup
- listCategoryGroups
- toggleCategoryGroupActive

### Categorias
- createCategory
- updateCategory
- listCategories
- toggleCategoryActive

### Banners
- createBanner
- updateBanner
- listBanners
- deleteBanner

Regra:
- `deleteBanner` executa delete físico: remove registro do banco e arquivo associado.

### Cidades
- createCity
- updateCity
- listCities
- toggleCityActive

No MVP, Montividiu é a única cidade utilizada publicamente. Não implementar seletor avançado de cidades.

### Sugestões
- createSuggestion
- listSuggestions
- updateSuggestionStatus

Regra:
- Sugestões mantêm histórico permanente e não devem ser excluídas quando convertidas ou ignoradas.

### Métricas
- registerCompanyView
- registerExternalClick

Regra:
- Registrar eventos por `sessionId`, sem login, usuário ou conta de visitante.
- Empresas mais visualizadas usam histórico completo.

### Dashboard
- getDashboardSummary
- listMostViewedCompanies

### Configurações
- getSiteSettings
- updateSiteSettings

### Administradores
- createAdmin
- updateAdmin
- listAdmins
- toggleAdminActive

Todos os administradores possuem os mesmos poderes. Não implementar roles, permissions, ACL ou perfis diferenciados.

### Logs
- listAuditLogs

### Uploads
- uploadImage
- deleteImage

## Segurança
- Admin routes protegidas por middleware.
- Upload validado por extensão e tamanho.
- Formulário público de sugestão com honeypot.
- Modo manutenção bloqueia páginas públicas, mantém `/admin/*` e APIs administrativas acessíveis.
