## TESTE TÉCNICO: Shopper - Backend Node.js com Typescript

Seja muito bem-vindo ao meu teste técnico: **Atualização de Preço de Produtos com CSV**.

Eu sou o João e estarei contigo para apresentar o projeto **Backend** com **Node.js** e **Typescript**.

## Rodando a Aplicação no seu PC

### 1 - Clone o Projeto

Faça um clone deste repositório e instale no seu ambiente de desenvolvimento usando o seguinte comando no seu terminal (escolha um diretório apropriado):

```shell
git clone https://github.com/aluiziodeveloper/nodejs-basico-frontend.git
```

### 2 - Instale o Docker em sua Máquina

Para instalar o docker entre em [https://www.docker.com/](https://www.docker.com/) faça o download conforme seu sistema operacional

### 3 - Ajustar Configuração

Faça seu .env conforme o .env exemplo, troque as variáveis conforme a sua configuração no docker

```shell
# API
PORT=3333 #Porta da sua aplicação - 3333 é a padrão que está no docker-compose.yaml

# Data Source
DB_HOST= #Host do seu banco de dados - db é o padrão que está no docker-compose.yaml
DB_PORT= #Porta do banco - 3306 é a padrão que está no docker-compose.yaml
DB_USERNAME= #Usuário do banco - root é o padrão do mysql
DB_PASSWORD= #Senha - shopper é a padrão que está no docker-compose.yaml
DB_DATABASE= #Banco de banco - shopper é o padrão que está no docker-compose.yaml
```

### 4 - Executando o Projeto

Na pasta gerada pelo 'git clone' entre e execute o docker-compose, após isso o projeto estará rodando em contêineres

```shell
docker-compose up
```

## Rotas da Aplicação

```shell
URL_BASE/products/validateCSV ##Validar o arquivo CSV
URL_BASE/products/updatePriceCSV ##Atualizar o preço dos produtos
```
