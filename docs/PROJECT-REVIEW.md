# PROJECT REVIEW - PALMA DA MAO

## Resumo do sistema

O Palma da Mao e um guia comercial local em formato PWA, com abordagem mobile first, criado para ajudar moradores e visitantes a descobrir empresas de uma cidade e acessar seus canais oficiais, como WhatsApp, Instagram, site e link principal.

O MVP inclui portal publico, painel administrativo, empresas, grupos de categorias, categorias, cidades, bairros, banners, destaques, galeria, busca, sugestoes de empresas, dashboard administrativo, logs, metricas simples, SEO, PWA e Docker.

O sistema nao deve implementar fluxo de venda interna. Estao fora do MVP: pedidos, carrinho, pagamentos, marketplace, avaliacoes, favoritos, chat, produtos, precos, estoque, financeiro e videos.

Montividiu deve ser a cidade padrao inicial, e todas as buscas/listagens publicas devem respeitar a cidade atual.

## Pontos fortes da arquitetura

- O PRD e o Backlog estao alinhados no objetivo principal: guia comercial local, sem marketplace e sem fluxo de compra.
- A arquitetura por dominio em `src/modules` favorece separacao de responsabilidades e manutencao a longo prazo.
- A divisao sugerida por camadas, com `components`, `actions`, `services`, `repositories`, `schemas`, `types` e `utils`, cria um bom limite entre interface, regras de negocio, validacao e persistencia.
- A stack proposta e coerente com o produto: Next.js, TypeScript, Tailwind CSS, Shadcn/UI, Prisma, PostgreSQL, NextAuth, JWT e Docker.
- O uso de Zod para validacao e TypeScript estrito reduz riscos em formularios administrativos, uploads e Server Actions.
- O modelo de dados contempla as principais entidades do MVP: empresas, categorias, grupos, cidade, banners, sugestoes, fotos, horarios, metricas, logs e configuracoes.
- As regras de negocio centrais estao bem definidas: soft delete para empresas, limite de 20 imagens na galeria, limite de 5 banners ativos, horarios apenas informativos e filtros publicos por empresa ativa.
- A decisao de upload local no MVP simplifica a primeira entrega e esta registrada em ADR.
- A priorizacao documentada e clara: PRD, Backlog, UI Reference e depois Wireframes.
- A exigencia de Docker desde o inicio ajuda a evitar divergencia de ambiente entre desenvolvimento e deploy.

## Possiveis problemas futuros

- A pasta oficial de wireframes foi padronizada como `/docs/WIREFRAMES`.
- O PRD permite "gerenciar administradores", mas o `DATABASE.md` define apenas `UserAdmin` sem campos de permissao, papel, ultimo login ou trilha de criacao. Se houver apenas um tipo de admin, isso deve ficar explicito.
- O projeto cita NextAuth com Credentials Provider e JWT, mas ainda nao define politica de senha, seed do primeiro admin, bloqueio de usuario inativo ou comportamento de sessao expirada.
- O Backlog inclui bairros, mas o banco trata bairro como campo texto em `Company.neighborhood`; nao ha entidade `Neighborhood`. Isso e valido para MVP, mas precisa ser assumido como decisao para evitar criar modulo desnecessario.
- O PRD fala em SEO por cidade e categoria, mas nao detalha padrao de metadata, canonical URL, sitemap, robots.txt ou conteudo minimo por pagina.
- O `API.md` cita `deleteBanner`, enquanto outras entidades usam inativacao ou soft delete. Falta decidir se banner sera deletado fisicamente, inativado ou removido logicamente.
- O `API.md` nao lista actions para cidades, configuracoes, usuarios/admins, logs e dashboard, embora esses itens estejam no PRD e na arquitetura.
- O dashboard exige total de empresas, categorias, visualizacoes, cliques no WhatsApp e empresas mais visualizadas, mas a modelagem de metricas ainda nao define agregacao, periodo ou deduplicacao.
- O modelo `ClickEvent` usa `companyId`, mas eventos de clique ou view podem precisar aceitar empresa inexistente apenas se houver erro de dados. Deve-se decidir se `companyId` e obrigatorio e se cascatas serao restritas.
- A sugestao publica possui honeypot no Backlog/API, mas o `DATABASE.md` nao indica campo para armazenar origem, IP, user agent ou metadados de spam. Talvez nao seja necessario no MVP, mas e uma decisao.
- O upload local exige volume persistente em Docker e backup no deploy; isso esta citado, mas ainda faltam regras de path publico, nomes de arquivos, limpeza de imagens substituidas e estrategia de seguranca.
- A manutencao esta no PRD e em `SiteSettings`, mas nao ha detalhe de middleware ou regra de excecao para assets, login admin e API publica.
- O modo multi-cidade completo e futuro, mas o MVP ja possui `City` e rotas por cidade. E preciso evitar implementar seletor avancado ou gestao multi-cidade alem do necessario.
- A documentacao aparece com caracteres acentuados corrompidos em algumas leituras de terminal. O conteudo e compreensivel, mas recomenda-se garantir UTF-8 sem BOM para evitar problemas em editores, commits e renderizacao.

## Melhorias sugeridas

- Manter a pasta de wireframes padronizada como `docs/WIREFRAMES` e atualizar novas referências com esse nome.
- Adicionar uma pequena secao em `ARCHITECTURE.md` definindo que `Neighborhood` sera apenas texto no MVP, sem modulo proprio.
- Complementar `API.md` com actions/endpoints previstos para cidades, configuracoes, usuarios admin, dashboard e logs.
- Decidir e documentar se `deleteBanner` remove fisicamente ou apenas inativa o banner.
- Adicionar uma convencao de slugs para cidade, categoria e empresa, incluindo tratamento de duplicidade.
- Definir a estrategia de seed inicial: cidade Montividiu, grupos iniciais, configuracoes iniciais e primeiro administrador.
- Detalhar regras de autenticacao: senha minima, admin ativo/inativo, expiracao de sessao e protecao de `/admin/*`.
- Definir padrao de upload: diretorio, URL publica, geracao de nome seguro, extensoes permitidas, validacao MIME, tamanho maximo e remocao de arquivos antigos.
- Definir metadados SEO minimos por rota publica, especialmente cidade, categoria e empresa.
- Definir o criterio do dashboard: totais globais ou por cidade, periodo padrao das metricas e ordenacao das empresas mais visualizadas.
- Criar checklist de validacao PWA: manifest, icones, service worker quando aplicavel, installability e teste mobile.
- Registrar em ADR qualquer decisao que altere arquitetura, persistencia ou escopo do MVP.

## Duvidas encontradas

- A pasta oficial dos wireframes deve se chamar `WIREFRAMES`. Decidido e aplicado.
- O MVP tera apenas uma cidade ativa visivel, Montividiu, ou podera cadastrar outras cidades no admin sem exposicao publica avancada?
- Bairros devem continuar como texto livre em `Company.neighborhood` ou precisam de cadastro administrativo?
- "Gerenciar administradores" exige niveis de permissao ou todos os administradores terao os mesmos poderes?
- Como sera criado o primeiro administrador: seed, comando manual, tela protegida inicial ou script?
- `deleteBanner` deve excluir fisicamente o registro, inativar ou aplicar soft delete?
- As metricas devem ser registradas por sessao anonima, por IP, por user agent ou apenas por evento bruto com `sessionId`?
- Empresas mais visualizadas no dashboard devem considerar todo o historico ou um periodo especifico?
- Sugestoes ignoradas ou convertidas devem manter historico permanente?
- A busca instantanea deve consultar o banco a cada debounce ou usar uma rota/action com cache e revalidacao?
- O link principal da empresa deve ser obrigatorio, opcional ou exibido apenas quando preenchido?
- Qual imagem padrao deve ser usada quando a empresa nao tiver logo?
- O modo manutencao deve bloquear tambem rotas publicas de API ou apenas paginas visitadas por usuarios?

## Checklist de preparacao para desenvolvimento

- [x] Aprovar este `PROJECT-REVIEW.md`.
- [x] Corrigir ou confirmar o nome da pasta de wireframes.
- [x] Confirmar que o escopo do MVP esta fechado conforme PRD e Backlog.
- [x] Definir seed inicial: Montividiu, grupos iniciais, configuracoes e admin.
- [x] Completar ou aprovar lacunas do `API.md`.
- [x] Decidir tratamento de banners: delete fisico, inativacao ou soft delete.
- [x] Confirmar que bairros serao texto livre no MVP.
- [x] Definir regras de autenticacao administrativa.
- [ ] Definir convencao de slugs e URLs canonicas.
- [x] Definir regras detalhadas de upload local.
- [x] Definir metricas e agregacoes do dashboard.
- [ ] Garantir que todos os documentos estejam em UTF-8.
- [ ] Iniciar scaffold apenas apos aprovacao deste relatorio.
