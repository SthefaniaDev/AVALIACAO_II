# Atividade 1: Sistema de Editor de Texto com Histórico de Ações (Undo/Redo)

Este projeto implementa um sistema simplificado de Undo/Redo para um editor de texto, utilizando uma **Lista Duplamente Encadeada** customizada em JavaScript.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Você precisa ter o **Node.js** instalado em sua máquina.

### Execução dos Testes

Para rodar os casos de teste e verificar o funcionamento da `DoublyLinkedList` e da `ActionHistory`, siga os passos abaixo:

1.  **Navegue até o diretório do projeto** no seu terminal.
2.  **Execute o arquivo de testes** usando o Node:

    ```bash
    node testsProblem1.js
    ```

    O terminal exibirá a saída de cada sequência de teste, confirmando o estado da lista e do ponteiro atual após as operações de `execute`, `undo`, `redo`, e `clearFrom`.

## 📁 Estrutura de Arquivos

| Arquivo | Descrição |
| :--- | :--- |
| `nodeDoubly.js` | Classe `nodeDoubly` que representa um nó com ponteiros `next` e `prev`. |
| `doubly-Linked-List.js` | **Implementação da Lista Duplamente Encadeada** (`DoublyLinkedList`) com todos os métodos essenciais (`insert`, `remove`, `clearFrom`,`insertDoubly` etc.). |
| `Historico.js` | **Solução do Problema 1** (`ActionHistory`). Gerencia o histórico de ações, utilizando a `DoublyLinkedList` para o mecanismo de Undo/Redo. |
| `teste.js` | Conjunto de **testes completos** que demonstram o comportamento do sistema de histórico, cobrindo todos os cenários obrigatórios. |