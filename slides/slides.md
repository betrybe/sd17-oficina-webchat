---
theme: 'night'
transition: 'slide'
title:  '26.1 Introdução ao desenvolvimento Web com NodeJS'
enableMenu: false
enableSearch: false
enableChalkboard: false
highlightTheme: 'monokai'
progressBar: true
---

![alt logo socket.io](/socket.io-logo.png)
- [Empresas](https://stackshare.io/socket-io)

--

## Para que serve?

socket.io é uma biblioteca para possibilitar a comunicação em tempo real entre diversas pessoas usuárias em uma mesma aplicação.
Com ela, podemos implementar mecanismos complexos de maneira mais simples para, por exemplo, controlar salas, limitar o número de pessoas que acessam ao servidor, jogos multiplayer e etc.

--

## Como funciona?

O socket.io funciona através de eventos do Node.js. Ao escutar um evento, nós temos a possibilidade de definir uma ação para o mesmo. Por exemplo: chamar uma função que emite um alerta de uma pessoa que acabou de se conectar ao servidor.

---

## Objetivo do dia

- Construir um chat que possibilite a conexão de multiplas pessoas usuárias.

- Gravar as informações das mensagens em um banco de dados em um banco de dados.

---

## Divisão da aula

- Backend - Pedro
- Frontend - Gabriel