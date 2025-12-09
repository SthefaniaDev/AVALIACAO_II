import DoublyNode from "./nodeDoubly.js";

function defaultEquals(a, b) {
  return a === b; //comparação de igualdade entre os elementos da lista ligada
}

// Implementa uma lista duplamente encadeada completa.
export class DoublyLinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = undefined; // Referência interna para o início da lista
    this.tail = undefined; // Referência interna para o final da lista (NOVO)
    this.equalsFn = equalsFn;
  }
  
  // --- Métodos principais obrigatórios da Doubly liked list ---

  // Reutiliza o método insertDoubly, passando o índice final
  insert(element) {
    // adiciona um elemento no final de um objeto LinkedList
    // Reutiliza a lógica de inserção no final do insertDoubly
    return this.insertDoubly(element, this.count);
  }

  remove(node) {
    // remove(node) - remove um nó específico da lista.
    if (!node) {
      return undefined;
    }
    if (node === this.head) {
      this.head = node.next;
      if (this.head) {
        this.head.previous = undefined; // Remove a referência 'previous' do novo head
      } else {
        this.tail = null; // A lista ficou vazia
      }
    } else if (node === this.tail) {
      this.tail = node.previous; // Atualiza tail usando previous
      if (this.tail) {
        this.tail.next = undefined; // Remove a referência 'next' do novo tail
      }
    } else {
      // Nó no meio: faz o bypass (liga os vizinhos entre si)
      node.previous.next = node.next; // Liga o anterior ao próximo
      node.next.previous = node.previous; // Liga o próximo ao anterior
    }

    this.count--;
    return node.element;
  }
  // getNext(node) - retorna o próximo nó.
  getNext(node) {
    return node ? node.next : undefined;
  }

  // getPrev(node) - retorna o nó anterior.
  getPrev(node) {
    return node ? node.previous : undefined; // Retorna o nó anterior (previous)
  }

  // --- Métodos principais obrigatórios da liked list ---
  
  // Inserindo um novo elemento em qualquer posição
  insertDoubly(element, index) {
    // Verifica se o index (a posição) é válido.
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let atual; // Variável auxiliar

      // Inserir no Índice 0 (No Início)
      if (index === 0) {
        // Se a lista estiver vazia (head é null ou undefined)
        if (this.head == null) {
          // {1} NOVO. Checagem correta para lista vazia
          this.head = node;
          this.tail = node;
        } else {
          // Lista não Vazia
          atual = this.head;
          node.next = atual; // {2} O novo nó aponta para o antigo head
          atual.previous = node; // {3} NOVO: O antigo head aponta para o novo nó
          this.head = node; // {4} O novo nó se torna o head
        }
      }
      // Inserir no final (Último Item)
      else if (index === this.count) {
        // último item – NOVO
        atual = this.tail; // Pega a cauda atual
        atual.next = node; // ligação para frente
        node.previous = atual; // ligação para trás (PREVIOUS)
        this.tail = node; // atualiza o tail
      }
      // insere no meio
      //
      else {
        const previous = this.getElementAt(index - 1); // 0 = 2 previous = anterior (index - 1)
        atual = previous.next; // 1 = 5 O código identifica o vizinho próximo

        node.next = atual; // 1 = 12 novo = qnd vc avançar terá numero (ligação para frente)
        previous.next = node; //  O nó anterior aponta pro novo nó
        atual.previous = node; //  NOVO: O nó próximo reconhece o novo nó (PREVIOUS)
        node.previous = previous; // NOVO: O novo nó diz quem é o anterior (PREVIOUS)
      }

      this.count++;
      return true; // Sucesso na inserção
    }

    // Se a validação inicial (index) falhar, retorna false
    return false;
  }

  // Removendo elementos de qualquer posição
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let atual = this.head; // O nó a ser removido

      if (index === 0) {
        // O head avança para o próximo
        this.head = atual.next; // {1}

        // se houver apenas um item, atualizamos tail também – NOVO
        if (this.count === 1) {
          // {2}
          this.tail = undefined;
        } else {
          this.head.previous = undefined; // {3} O novo head não tem previous
        }
      } else if (index === this.count - 1) {
        // último item – NOVO
        atual = this.tail; // {4}
        this.tail = atual.previous; // {5} O penúltimo se torna o novo tail (PREVIOUS)
        this.tail.next = undefined; // {6} O novo tail não aponta para nada
      } else {
        atual = this.getElementAt(index); // {7}
        const previous = atual.previous; // {8}

        // faz a ligação de previous com o next de current – pula esse elemento para
        // removê-lo;   1 3
        previous.next = atual.next; // {9} Ligação de avanço
        atual.next.previous = previous; // {10} NOVO: Ligação de retorno (PREVIOUS)
      }

      this.count--;
      return atual.element;
    }
    return undefined;
  }

  // esse método devolve o elemento que está em
  // uma posição específica da lista. Se o elemento não estiver na lista,
  // undefined será devolvido.
  getElementAt(index) {
    // Corrigindo: A busca deve ser até index < this.count
    if (index >= 0 && index < this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  // --- Métodos acessórios obrigatórios ---

  // isEmpty() - retorna true se o histórico estiver vazio.
  isEmpty() {
    return this.size() === 0;
  }

  // size() - retorna a quantidade total de ações armazenadas.
  size() {
    return this.count;
  }

  // clearFrom(node) - remove todos os nós a partir do nó informado até o final.
  // (Usado para limpar o "futuro" após um Undo seguido de nova ação).
  clearFrom(node) {
    if (!node) {
      return;
    }
    if (node === this.head) {
      // Se for para limpar tudo a partir do head, limpa tudo.
      this.head = null;
      this.tail = null;
      this.count = 0;
    } else {
      // O nó anterior ao 'node' será o novo tail
      const newTail = node.previous; // Pega o nó anterior
      newTail.next = undefined;
      this.tail = newTail;

      // Recalcula o count (simplesmente subtrai os removidos)
      let current = node;
      let removedCount = 0;
      while (current !== undefined) {
        removedCount++;
        current = current.next;
      }
      this.count -= removedCount;
    }
  }
}
