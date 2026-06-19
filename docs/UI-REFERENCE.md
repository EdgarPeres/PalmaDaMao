# UI-REFERENCE.md

# Objetivo

Este documento serve como referência visual para o desenvolvimento do Palma da Mão.

Os wireframes NÃO substituem:
- PRD
- Backlog
- Regras de Negócio

Ordem de prioridade:

1. PRD
2. Backlog
3. UI Reference
4. Wireframes

---

# Diretrizes Gerais

## Mobile First

Todas as telas devem ser projetadas primeiro para dispositivos móveis.

Após validação da experiência mobile:

- Tablet
- Desktop

---

## Estilo Visual

O sistema deve transmitir:

- Simplicidade
- Rapidez
- Organização
- Facilidade de uso

Evitar:

- Excesso de animações
- Layout poluído
- Muitas informações simultâneas

---

## Cor Principal

#0069FC

---

# HOME

Arquivo de Referência:

/docs/WIREFRAMES/home-mobile-wireframe-v2-palma-da-mao.png

## Estrutura

1. Cidade Atual
2. Banner Principal
3. Campo de Pesquisa
4. Categorias
5. Empresas em Destaque
6. Empresas Recentemente Adicionadas
7. Rodapé

## Categorias

### Mobile

Carrossel horizontal com swipe.

### Desktop

Grid responsivo.

---

## Empresas em Destaque

### Mobile

Carrossel horizontal com swipe.

Card:

- Banner
- Nome
- Categorias
- Bairro

### Desktop

Grid responsivo.

---

## Empresas Recentemente Adicionadas

### Mobile

Carrossel horizontal com swipe.

### Desktop

Grid responsivo.

---

# PÁGINA DA EMPRESA

Arquivo de Referência:

/docs/WIREFRAMES/empresa-mobile-wireframe-palma-da-mao.png

## Estrutura

1. Voltar
2. Banner
3. Logo
4. Nome
5. Categorias
6. Bairro e Cidade
7. Contatos
8. Sobre a Empresa
9. Horários
10. Galeria
11. Link Principal

---

## Banner

Opcional.

Caso não exista:

Ocultar seção.

Resolução recomendada:

1200x400

---

## Logo

Opcional.

Caso não exista:

Utilizar imagem padrão do sistema.

---

## Contatos

Prioridade:

1. WhatsApp
2. Link Principal
3. Instagram
4. Site

Botões grandes para dispositivos móveis.

---

## Sobre a Empresa

Descrição:

- Mínimo: 50 caracteres
- Máximo: 1000 caracteres

---

## Horários

Apenas informativos.

Não implementar:

- Aberto Agora
- Fechado Agora

---

## Galeria

### Mobile

Carrossel horizontal com swipe.

### Desktop

Grid responsivo.

Limites:

- Mínimo: 0 imagens
- Máximo: 20 imagens

Formatos:

- JPG
- PNG

Tamanho máximo:

5 MB

---

# Regras para IA (Codex)

1. Wireframes são apenas referência visual.
2. O PRD possui prioridade sobre os wireframes.
3. O Backlog possui prioridade sobre os wireframes.
4. Não implementar funcionalidades fora do MVP.
5. Seguir abordagem Mobile First.
6. Priorizar simplicidade e usabilidade.
7. Carrosséis devem suportar swipe.
8. Utilizar componentes reutilizáveis.
9. Manter consistência visual.
10. Respeitar arquitetura e documentação do projeto.
