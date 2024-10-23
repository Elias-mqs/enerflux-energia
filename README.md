# Enerflux Energia

Este projeto, **Enerflux Energia**, foi desenvolvido como parte de um desafio técnico para Clarke Energia. Ele permite que os usuários informem seu consumo mensal de energia e, com base em critérios de consumo mínimo e outras informações, o sistema retorna uma lista de fornecedores capazes de atender à demanda.

## Funcionalidades

- O usuário deve inserir o consumo mensal de energia (exemplo: **30.000 kWh**).
- O sistema exibe uma lista de fornecedores que podem atender ao consumo informado.
- Cada fornecedor contém as seguintes informações:
  - **Nome**
  - **Logo**
  - **Estado de origem**
  - **Custo por kWh**
  - **Limite mínimo de kWh**
  - **Número total de clientes**
  - **Avaliação média dos clientes**
  
Um fornecedor só será listado se o consumo informado pelo usuário for maior que o limite mínimo de kWh do fornecedor.

## Tecnologias Utilizadas

- **Next.js**: Framework de React para construção de aplicações web.
- **React**: Biblioteca JavaScript para a criação de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Prisma**: ORM (Object-Relational Mapper) para interagir com o banco de dados PostgreSQL.
- **AWS S3**: Armazenamento na nuvem para as logos dos fornecedores.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar as informações dos fornecedores.

## Pré-requisitos

Antes de iniciar, certifique-se de que você tenha o **Node.js** e o **npm** instalados em sua máquina.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Elias-mqs/enerflux-energia.git

2. Entre no diretório do projeto:

   ```bash
   cd enerflux-energia
   
3. Instale as dependências necessárias:

   ```bash
   npm install

## Rodando o projeto

Após instalar as dependências, inicie o servidor de desenvolvimento:

    npm run dev
    
O projeto será iniciado na URL: http://localhost:3000


## Banco de Dados

Este projeto utiliza PostgreSQL como banco de dados. Certifique-se de configurar seu banco de dados
PostgreSQL corretamente e ajustar o arquivo .env com as seguintes variáveis:

    DATABASE_URL=postgresql://[usuário]:[senha]@[host]:[porta]/[nome-do-banco]

## Armazenamento de Logos

As logos dos fornecedores são armazenadas no AWS S3. Certifique-se de configurar as credenciais do
AWS S3 no arquivo .env:

    AWS_ACCESS_KEY_ID=[sua-access-key]
    AWS_SECRET_ACCESS_KEY=[seu-secret-key]
    S3_BUCKET_NAME=[nome-do-bucket]
    S3_REGION=[região-do-bucket]

## Estrutura de diretórios

- /**app**: Contém as rotas da aplicação.

- /**components**: Componentes de seções principais.

- /**components/ui**: Componentes reutilizáveis da interface de usuário.

- /**prisma**: Definição do esquema do banco de dados.

- /**public**: Armazena arquivos públicos como logos de fornecedores (se aplicável).

- /**lib**: Funções utilitárias e de apoio.

## Contato

Se você tiver alguma dúvida ou quiser discutir sobre o projeto, sinta-se à vontade para me contatar:

- **E-mail**: eliasmqs397@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/elias-marques-b747181b3/
