# PRD — PALMA DA MÃO

## 1. Nome
Palma da Mão

## 2. Slogan
As melhores empresas da sua cidade em um só lugar.

## 3. Cor principal
#0069FC

## 4. Objetivo
Criar um guia comercial local em formato PWA para facilitar a descoberta de empresas da cidade e direcionar usuários para canais oficiais dos negócios.

## 5. Público-alvo
- Moradores da cidade
- Visitantes
- Empresas locais
- Administradores do portal

## 6. Princípios do produto
- Mobile first
- Simples
- Rápido
- Fácil de manter
- Escalável
- Sem marketplace no MVP
- Sem fluxo de vendas interno
- Foco em descoberta e divulgação

## 7. Perfil Visitante
Pode:
- Pesquisar empresas
- Navegar por grupos e categorias
- Ver detalhes da empresa
- Abrir WhatsApp
- Abrir Instagram
- Abrir Link Principal
- Sugerir empresa
- Instalar PWA

Não pode:
- Criar conta
- Comprar
- Avaliar
- Favoritar
- Comentar

## 8. Perfil Administrador
Pode:
- Gerenciar empresas
- Gerenciar grupos
- Gerenciar categorias
- Gerenciar banners
- Gerenciar destaques
- Gerenciar sugestões
- Gerenciar administradores
- Visualizar dashboard
- Visualizar logs
- Alterar configurações do portal

Todos os administradores possuem os mesmos poderes no MVP. Não implementar roles, permissions, ACL ou perfis diferenciados.

## 9. Requisitos funcionais

### RF001 — Listar empresas
O sistema deve listar empresas ativas da cidade atual.

### RF002 — Pesquisar empresas
O sistema deve permitir busca instantânea por nome da empresa e categoria.

### RF003 — Exibir detalhes da empresa
A página da empresa deve exibir contatos, descrição, categorias, galeria e links externos.

### RF004 — Gerenciar empresas
O admin deve criar, editar, inativar e excluir logicamente empresas.

### RF005 — Gerenciar grupos e categorias
O admin deve criar, editar e inativar grupos e categorias.

### RF006 — Gerenciar banners
O admin deve cadastrar até 5 banners ativos para a home.

### RF007 — Gerenciar destaques
O admin deve marcar empresas como destaque e definir ordem manual.

### RF008 — Gerenciar sugestões
O admin deve visualizar sugestões recebidas e alterar status.

### RF009 — Registrar métricas
O sistema deve registrar visualizações e cliques externos.

### RF010 — Registrar logs
O sistema deve registrar login, logout, criação, edição e exclusão.

### RF011 — PWA
O sistema deve ser instalável em dispositivos móveis.

## 10. Requisitos não funcionais
- Interface mobile first
- Performance otimizada
- Código TypeScript legível
- Componentes reutilizáveis
- Arquitetura por domínio
- Uso de Docker
- Versionamento no GitHub
- SEO por cidade e categoria
- Upload local no MVP
- Logs para auditoria
- Soft delete para empresas

## 11. Regras de negócio
- Empresa inativa não aparece no portal público.
- Empresa excluída logicamente não aparece em listagens.
- Empresa pode ter múltiplas categorias.
- Todas as categorias da empresa podem aparecer no card.
- Logo é opcional; se não houver, usar imagem padrão.
- Banner da empresa é opcional.
- Galeria deve aceitar no máximo 20 imagens.
- Horários são apenas informativos.
- Não calcular aberto/fechado.
- O sistema deve começar com Montividiu como cidade padrão.
- Busca deve sempre respeitar a cidade atual.
- O sistema deve ser preparado para múltiplas cidades, mas Montividiu será a única cidade utilizada publicamente no MVP.
- Não implementar seletor avançado de cidades no MVP.
- Bairro é apenas um campo texto da empresa.
- Uma empresa deve possuir pelo menos um canal de contato preenchido: WhatsApp, Instagram, Site ou Link Principal.
- Se a empresa não possuir logo, utilizar automaticamente `/uploads/system/default-company.png`.
- Sugestões convertidas ou ignoradas devem manter histórico permanente.
- Métricas devem ser registradas por sessão usando `sessionId`, sem login ou conta de visitante.

## 12. Dashboard
Exibir:
- Total de empresas
- Total de categorias
- Total de visualizações
- Total de cliques no WhatsApp
- Empresas mais visualizadas

Empresas mais visualizadas devem considerar o histórico completo. Não implementar filtros por período no MVP.

## 13. Configurações
Devem ser editáveis sem alterar código:
- Nome do portal
- Slogan
- Logo
- Favicon
- Cor principal
- Cidade padrão
- WhatsApp de suporte
- Instagram oficial
- Texto da home
- Texto do rodapé
- Modo manutenção

## 14. Modo manutenção
Quando ativado, visitantes têm as páginas públicas bloqueadas e veem uma tela simples informando que o sistema está em manutenção. Administradores continuam acessando o painel em `/admin/*`, e APIs administrativas continuam funcionando.

## 15. Roadmap futuro
- Destaque patrocinado
- Perfil Premium
- Mini Sites
- Banner patrocinado
- Notificações push
- Multi-cidade completo
