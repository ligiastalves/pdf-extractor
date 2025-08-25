# Extrator de Dados de Nota Fiscal

Este projeto é uma aplicação fullstack simples, construída com Node.js e Express, que extrai dados essenciais de um arquivo PDF de nota fiscal eletrônica (NF-e).

A aplicação foi projetada para automatizar o processo de coleta de informações críticas, como **CNPJ do emitente**, **valor total**, **data de emissão**, **chave de acesso** e **natureza da operação**, que são fundamentais para lançamentos contábeis.

---

### Tecnologias Utilizadas

-   **Frontend:**
    -   **HTML5:** Estrutura da página web.
    -   **CSS3:** Estilização da interface.
    -   **JavaScript:** Lógica para interagir com o backend.
-   **Backend:**
    -   **Node.js:** Ambiente de execução do JavaScript no servidor.
    -   **Express.js:** Framework para criação do servidor e rotas da API.
    -   **`express-fileupload`:** Middleware para lidar com o upload de arquivos.
    -   **`pdf-parse`:** Biblioteca para extrair texto de arquivos PDF.

---

### Funcionalidades

-   **Upload de PDF:** Permite ao usuário enviar um arquivo PDF diretamente pela interface.
-   **Extração de Dados:** Processa o PDF no servidor para extrair as seguintes informações:
    -   CNPJ do Emitente
    -   Valor Total da Nota
    -   Data de Emissão
    -   Chave de Acesso
    -   Natureza da Operação
-   **Interface Amigável:** Exibe os dados de forma clara e organizada, com um design simples e intuitivo.

---

### Como Rodar o Projeto

Siga os passos abaixo para clonar o repositório e executar a aplicação na sua máquina local.

**Pré-requisitos:**

-   [Node.js](https://nodejs.org/) (versão 14.x ou superior)
-   [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node)

**Instruções:**

1.  **Clone o repositório:**
    ```bash
    git clone (https://github.com/ligiastalves/pdf-extractor.git)
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd pdf-extractor
    ```
3.  **Instale as dependências:**
    ```bash
    npm install express express-fileupload pdf-parse
    ```
4.  **Inicie o servidor:**
    ```bash
    node server.js
    ```
5.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:3000`.

---

### Contribuição

Sinta-se à vontade para contribuir com melhorias, sugerir novas funcionalidades ou relatar bugs.

1.  Faça um `fork` do projeto.
2.  Crie uma nova `branch` para sua feature (`git checkout -b feature/nome-da-feature`).
3.  Faça suas mudanças e salve os arquivos.
4.  Faça um `commit` com uma mensagem clara e descritiva (`git commit -m "feat: Adiciona nova funcionalidade"`).
5.  Envie sua `branch` (`git push origin feature/nome-da-feature`).
6.  Abra um `Pull Request`.

---
