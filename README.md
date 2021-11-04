# rockbuzz-social-network

## sobre o projeto :computer:

#Este projeto tem como foco a replicação da interface básica de uma rede social.

## lista de comandos

```bash
# instalar as depêndencias do projeto:
$ yarn install

# rodar a aplicação em modo de desenvolvimento, com hot reload no endereço 'localhost:3000':
$ yarn dev

# gerar uma dist do projeto:
$ yarn build

# rodar o projeto em modo de produção através da dist gerada:
$ yarn start

# gerar um projeto estatico
$ yarn generate

# rodar os testes do cypress
yarn e2e
```

## Diretórios do projeto

Aqui estão alguns diretórios importantes para uma boa familiarização do projeto


### `components`

Este diretório contém componentes que abstraem uma lógica própria e que podem ser reaproveitados pelas paginas da aplicação

### `layouts`

Este diretório contém involocrus que envelopam as paginas que os encorporam. Em outras palavras são componentes que possuem uma parte renderizada dinamicamente pela pagina que faz uso da mesma.

### `pages`

Este diretório abriga as rotas da aplicação, cada uma representada pelo nome dos arquivos presentes na mesma

### `plugins`

Este diretório contém escripts que serão executados antes da renderização de todas as paginas

### `static`

Este diretório contem arquivos estaticos como imagens, css, fontes etc.

### `store`

Este diretório contem arquivos relacionados a vuex contendo as regras do gerenciamento de estado da aplicação.
