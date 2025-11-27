import DoublyNode from "./nodeDoubly.js";

function defaultEquals(a, b) {
  return a === b;
}

/**
 * 1. Classe DoublyLinkedList
 * Implementa uma lista duplamente encadeada completa.
 */
export class DoublyLinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = null; // Referência interna para o início da lista
    this.tail = null; // Referência interna para o final da lista (NOVO)
    this.equalsFn = equalsFn;
  }

  // --- Métodos principais obrigatórios ---

  /**
   * insert(value) - insere um novo nó no final da lista.
   */
  insert(value) {
    const newNode = new DoublyNode(value);

    if (this.head === null) {
      // Lista vazia
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Lista não vazia: anexa ao tail
      this.tail.next = newNode;
      newNode.prev = this.tail; // NOVO: aponta para o antigo tail
      this.tail = newNode; // Atualiza o tail
    }
    this.count++;
  }

  /**
   * remove(node) - remove um nó específico da lista.
   */
  remove(node) {
    if (!node) {
      return undefined;
    }

    if (node === this.head) {
      this.head = node.next;
      if (this.head) {
        this.head.prev = undefined; // Remove a referência 'prev' do novo head
      } else {
        this.tail = null; // A lista ficou vazia
      }
    } else if (node === this.tail) {
      this.tail = node.prev;
      if (this.tail) {
        this.tail.next = undefined; // Remove a referência 'next' do novo tail
      }
    } else {
      // Nó no meio
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    this.count--;
    return node.element;
  }

  /**
   * getNext(node) - retorna o próximo nó.
   */
  getNext(node) {
    return node ? node.next : undefined;
  }

  /**
   * getPrev(node) - retorna o nó anterior.
   */
  getPrev(node) {
    return node ? node.prev : undefined;
  }

  // --- Métodos acessórios obrigatórios ---

  /**
   * isEmpty() - retorna true se o histórico estiver vazio.
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * size() - retorna a quantidade total de ações armazenadas.
   */
  size() {
    return this.count;
  }

  /**
   * clearFrom(node) - remove todos os nós a partir do nó informado até o final.
   * (Usado para limpar o "futuro" após um Undo seguido de nova ação).
   */
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
      const newTail = node.prev;
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

  /**
   * Retorna a representação em string da lista. (Acessório, para testes)
   */
  toString() {
    if (this.head === null) {
      return "[]";
    }
    let objString = `[${this.head.element}`;
    let current = this.head.next;
    while (current != null) {
      objString = `${objString}, ${current.element}`;
      current = current.next;
    }
    objString += "]";
    return objString;
  }
}
