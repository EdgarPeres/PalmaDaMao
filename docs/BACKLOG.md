# BACKLOG — PALMA DA MÃO

## Visão
O Palma da Mão é um Guia Comercial Local em formato PWA, mobile first, criado para centralizar empresas da cidade e facilitar a descoberta de negócios locais.

## Escopo do MVP
Inclui:
- Empresas
- Grupos de categorias
- Categorias
- Cidades
- Bairros
- Banners
- Destaques
- Galeria
- Busca
- Sugestões de empresas
- Dashboard administrativo
- Logs
- SEO
- PWA
- Docker
- GitHub

O sistema deve ser preparado para múltiplas cidades, mas no MVP Montividiu será a única cidade utilizada publicamente. Outras cidades poderão ser cadastradas futuramente sem seletor avançado público no MVP.

Não inclui:
- Pedidos
- Carrinho
- Pagamentos
- Marketplace
- Avaliações
- Favoritos
- Chat
- Produtos
- Preços
- Estoque
- Financeiro
- Vídeos

## Home
Ordem:
1. Banner principal
2. Pesquisa
3. Categorias
4. Empresas em destaque
5. Empresas recentemente adicionadas
6. Rodapé

## Empresas em destaque
- Exibir 8 na home
- Botão "Ver Todas"
- Controle manual por ordem numérica
- Sem data de início ou fim

## Empresas recentes
- Exibir 8 na home
- Botão "Ver Todas"

## Empresa
Campos:
- Nome
- Cidade
- Bairro
- Categorias
- Descrição
- Logo
- Banner
- WhatsApp
- Telefone
- Instagram
- Site
- Link Principal
- Ativo
- Destaque
- Ordem Destaque
- deletedAt

Regras:
- Bairro é campo texto em `Company.neighborhood`.
- Não criar entidade, tabela ou módulo de bairros.
- Pelo menos um canal de contato deve estar preenchido: WhatsApp, Instagram, Site ou Link Principal.
- Se não houver logo, usar `/uploads/system/default-company.png`.

## Categorias
Estrutura:
- Grupo
- Categoria

Grupos iniciais:
- Alimentação
- Saúde
- Compras
- Serviços
- Lazer
- Veículos

## Galeria
- 0 a 20 imagens
- JPG/PNG
- Máximo 5 MB por arquivo

## Banner
- Máximo 5 banners ativos na home
- Carrossel automático
- Intervalo de 5 segundos
- Se não houver banner, ocultar a seção
- Exclusão de banner é delete físico, removendo registro do banco e arquivo associado.

## Busca
- Instantânea
- Debounce de 300ms
- Pesquisa por nome da empresa e categoria
- Respeita a cidade atual

## Métricas
Registrar:
- Visualizações da empresa
- Cliques no WhatsApp
- Cliques no Instagram
- Cliques no Link Principal

Regras:
- Registrar por sessão usando `sessionId`.
- Não associar métricas a login, usuário ou conta.
- Empresas mais visualizadas usam histórico completo, sem filtro por período no MVP.

## Sugestões
Campos:
- Nome
- Categoria
- Telefone
- Status: Pendente, Convertido, Ignorado
- Honeypot anti-spam

Sugestões devem manter histórico permanente. Não excluir sugestões convertidas ou ignoradas.

## Fase 2
Não implementar no MVP:
- Perfil Premium
- Destaque Patrocinado
- Mini Site
- Banner Patrocinado
- Multi-cidade completo
