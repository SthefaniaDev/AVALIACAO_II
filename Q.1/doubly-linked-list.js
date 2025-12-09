import Node from "./node.js";

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
  insert(element) {
    // adiciona um elemento no final de um objeto LinkedList
    // Reutiliza a lógica de inserção no final do insertDoubly
    return this.insertDoubly(element, this.count);
  }

  remove(node) {
    // remove(node) - remove um nó específico da lista.
    if (!node) return undefined;

    const { previous, next } = node;

    // Removendo head
    if (node === this.head) {
      this.head = next;
      if (this.head) {
        this.head.previous = undefined;
      } else {
        this.tail = null;
      }
    }
    // Removendo tail
    else if (node === this.tail) {
      this.tail = previous;
      if (this.tail) {
        this.tail.next = undefined;
      }
    }
    // Removendo no meio
    else {
      previous.next = next;
      next.previous = previous;
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
    return node ? node.previous : undefined;
  }

  // --- Métodos acessórios obrigatórios ---
  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count;
  }

  // clearFrom(node) - remove todos os nós a partir do nó informado até o final.
  // (Usado para limpar o "futuro" após um Undo seguido de nova ação).
  clearFrom(node) {
    if (!node) return;

    // limpar tudo
    if (node === this.head) {
      this.head = null;
      this.tail = null;
      this.count = 0;
      return;
    }

    // limpar a partir de um ponto no meio
    const newTail = node.previous;
    newTail.next = undefined;
    this.tail = newTail;

    // Recontar removidos
    let removed = 0;
    let current = node;
    while (current) {
      removed++;
      current = current.next;
    }

    this.count -= removed;
  }
  // --- Métodos principais obrigatórios da liked list ---
  insertDoubly(element, index) {
    if (index < 0 || index > this.count) return false;

    const newNode = new Node(element);

    // Inserção no início
    if (index === 0) {
      if (this.head == null) {
        // lista vazia
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.previous = newNode;
        this.head = newNode;
      }
    }
    // Inserção no final
    else if (index === this.count) {
      const currentTail = this.tail;
      currentTail.next = newNode;
      newNode.previous = currentTail;
      this.tail = newNode;
    }
    // Inserção no meio
    else {
      const previousNode = this.getElementAt(index - 1);
      const currentNode = previousNode.next;

      newNode.next = currentNode;
      newNode.previous = previousNode;
      previousNode.next = newNode;
      currentNode.previous = newNode;
    }

    this.count++;
    return true;
  }

  removeAt(index) {
    if (index < 0 || index >= this.count) return undefined;

    let current = this.head;

    // Remover início
    if (index === 0) {
      this.head = current.next;

      if (this.count === 1) {
        this.tail = undefined;
      } else {
        this.head.previous = undefined;
      }
    }
    // Remover final
    else if (index === this.count - 1) {
      current = this.tail;
      this.tail = current.previous;
      this.tail.next = undefined;
    }
    // Remover meio
    else {
      current = this.getElementAt(index);
      const previousNode = current.previous;

      previousNode.next = current.next;
      current.next.previous = previousNode;
    }

    this.count--;
    return current.element;
  }

  getElementAt(index) {
    if (index < 0 || index >= this.count) return undefined;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }
}
