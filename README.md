# SPA Pessoas Desaparecidas

**Autor:** Leonardo de Oliveira Ramos

**E-mail:** leolivramos@gmail.com

**Telefone:** (65)99212-1341

# Sobre o Projeto

Aplicação SPA desenvolvida em Vue 3 + Vite para gerenciamento e visualização de pessoas desaparecidas, com filtros avançados, responsividade e experiência moderna.


## Como executar localmente

### 1. Usando Node.js (desenvolvimento)

- Node.js 20+ (https://nodejs.org/)
- npm 9+ (instalado junto com o Node)

```sh
npm install
npm run dev
```
Acesse o endereço exibido no terminal (normalmente http://localhost:5173).

### 2. Usando Docker (produção)

```sh
docker build -t spa-pessoas-desaparecidas .
docker run -p 8080:80 spa-pessoas-desaparecidas
```
Acesse no navegador: http://localhost:8080

O container utiliza Nginx para servir os arquivos otimizados do build, com boas práticas de cache, segurança e compressão. O arquivo `nginx.conf` já está configurado para funcionar com rotas do Vue Router (history mode).
