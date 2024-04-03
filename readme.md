# pass.in

O pass.in é uma aplicação de **gestão de participantes em eventos presenciais**. 

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

## Requisitos

### Requisitos funcionais

- [x] O organizador deve poder cadastrar um novo evento;
- [x] O organizador deve poder visualizar dados de um evento;
- [ ] O organizador deve poser visualizar a lista de participantes; 
- [ ] O participante deve poder se inscrever em um evento;
- [ ] O participante deve poder visualizar seu crachá de inscrição;
- [ ] O participante deve poder realizar check-in no evento;

### Regras de negócio

- [x] O participante só pode se inscrever em um evento uma única vez;
- [x] O participante só pode se inscrever em eventos com vagas disponíveis;
- [ ] O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [ ] O check-in no evento será realizado através de um QRCode;

## Anotações

REST -> API que vai retornar dados via JSON

Método HTTP -> GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ... ==> Indica o que cada rota vai fazer dentro da aplicação

Corpo da requisição (Request Body) -> Enviar dados para crição ou atualização de um registro
Parâmetros de busca (Search Params / Query Params) -> Filtros, paginação, ordenação 'http://localhost:3333/users?search=Diego&sort=name&order=asc'
Parâmetros de rota (Route Params) -> Identificar um recurso para atualização ou remoção 'http://localhost:3333/users/1'
Cabeçalhos (Headers) -> Contexto de uma requisição, autenticação, idioma, ...

Semânticas = Significado

Driver nativo / Query Builders / ORMs

Object Relational Mapping (Hibernate / Doctrine / ActiveRecord)

- Status code

20x -> Sucesso
30x -> Redirecionamento
40x -> Erro do cliente (Erro em alguma informação enviada por quem está fazendo a chamada para a API)
50x -> Erro do servidor (Erro que está acontecendo INDEPENDENTE do que está sendo enviado para o servidor)

## Prisma Client
O Prisma Client é uma biblioteca de acesso a banco de dados auto-hospedada que permite que você acesse seu banco de dados de uma maneira segura e fácil. As operações do Prisma Client retornam Promises.

Operações do prisma client retornam promises, por isso é necessário utilizar o await, para pausar a execução do código assíncrono