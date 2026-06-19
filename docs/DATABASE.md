# DATABASE — PALMA DA MÃO

## Banco
PostgreSQL com Prisma ORM.

## Modelos principais

### UserAdmin
- id
- name
- email
- passwordHash
- active
- createdAt
- updatedAt

Regras:
- Todos os administradores possuem os mesmos poderes.
- Não criar roles, permissions, ACL ou perfis diferenciados no MVP.
- O primeiro administrador deve ser criado por seed.

### City
- id
- name
- state
- slug
- description
- order
- active
- createdAt
- updatedAt

Regras:
- O sistema deve ser preparado para múltiplas cidades.
- Montividiu será a cidade padrão e a única cidade utilizada publicamente no MVP.
- Não implementar seletor avançado de cidades no MVP.

### CategoryGroup
- id
- name
- slug
- icon
- color
- order
- active
- createdAt
- updatedAt

### Category
- id
- groupId
- name
- slug
- icon
- color
- order
- active
- createdAt
- updatedAt

### Company
- id
- cityId
- name
- slug
- description
- neighborhood
- logoUrl
- bannerUrl
- whatsapp
- phone
- instagram
- website
- mainLink
- active
- featured
- featuredOrder
- deletedAt
- createdAt
- updatedAt

Regras:
- `neighborhood` é campo texto.
- Não criar tabela `Neighborhood`.
- Não criar módulo `Neighborhood`.
- Pelo menos um canal de contato deve estar preenchido: `whatsapp`, `instagram`, `website` ou `mainLink`.
- Se `logoUrl` estiver vazio, utilizar `/uploads/system/default-company.png` na interface.

### CompanyCategory
- companyId
- categoryId

### CompanyPhoto
- id
- companyId
- imageUrl
- order
- createdAt

### CompanySchedule
- id
- companyId
- dayOfWeek
- openTime
- closeTime
- closed

Observação: horário é apenas informativo.

### Banner
- id
- title
- imageUrl
- order
- active
- createdAt
- updatedAt

Regra:
- Banner não usa soft delete. Exclusão remove fisicamente o registro do banco e o arquivo associado.

### CompanySuggestion
- id
- name
- category
- phone
- status
- createdAt
- updatedAt

Regra:
- Manter histórico permanente. Não excluir sugestões convertidas ou ignoradas.

Status:
- PENDING
- CONVERTED
- IGNORED

### ClickEvent
- id
- companyId
- type
- sessionId
- createdAt

Regra:
- Métricas são registradas por sessão usando `sessionId`.
- Não associar eventos a login, usuário ou conta de visitante.
- Dashboard de empresas mais visualizadas usa histórico completo no MVP.

Tipos:
- VIEW
- WHATSAPP
- INSTAGRAM
- MAIN_LINK

### AuditLog
- id
- adminId
- action
- entity
- entityId
- metadata
- createdAt

Ações:
- LOGIN
- LOGOUT
- CREATE
- UPDATE
- DELETE

### SiteSettings
- id
- siteName
- slogan
- logoUrl
- faviconUrl
- primaryColor
- defaultCityId
- supportWhatsapp
- officialInstagram
- homeText
- footerText
- maintenanceMode
- updatedAt

## Regras
- Company usa soft delete com deletedAt.
- Queries públicas filtram active = true e deletedAt = null.
- Empresas podem ter múltiplas categorias.
- Galeria limitada a 20 fotos por empresa.
- Banner da home limitado a 5 ativos.
