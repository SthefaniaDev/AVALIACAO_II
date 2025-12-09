import Node from "./node.js";

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  // Inserção padrão: sempre no final.
  insert(element) {
    return this.insertDoubly(element, this.count);
  }

  // Inserção otimizada
  insertDoubly(element, index) {
    if (index < 0 || index > this.count) return false;

    const newNode = new Node(element);

    // Inserção na lista vazia
    if (this.count === 0) {
      this.head = newNode;
      this.tail = newNode;
    }

    // Inserção no início
    else if (index === 0) {
      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;
    }

    // Inserção no final (otimizado, sem getElementAt)
    else if (index === this.count) {
      newNode.previous = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    // Inserção no meio
    else {
      const previousNode = this.getElementAt(index - 1);
      const nextNode = previousNode.next;

      newNode.previous = previousNode;
      newNode.next = nextNode;
      previousNode.next = newNode;
      nextNode.previous = newNode;
    }

    this.count++;
    return true;
  }

  // remove(node) – remove um nó específico
  remove(node) {
    if (!node) return undefined;

    const prev = node.previous;
    const next = node.next;

    // Removendo head
    if (node === this.head) {
      this.head = next;
      if (next) next.previous = null;
      else this.tail = null; // lista ficou vazia
    }

    // Removendo tail
    else if (node === this.tail) {
      this.tail = prev;
      if (prev) prev.next = null;
    }

    // Removendo nó do meio
    else {
      prev.next = next;
      next.previous = prev;
    }

    this.count--;
    return node.element;
  }

  // Retorna próximo nó
  getNext(node) {
    return node ? node.next : null;
  }

  // Retorna nó anterior
  getPrev(node) {
    return node ? node.previous : null;
  }

  // Remove todos os nós a partir de "node"
  clearFrom(node) {
    if (!node) return;

    // Caso seja para limpar tudo
    if (node === this.head) {
      this.head = null;
      this.tail = null;
      this.count = 0;
      return;
    }

    // Cortar a lista
    const newTail = node.previous;
    newTail.next = null;
    this.tail = newTail;

    // Recalcular quantidade removida
    let removed = 0;
    let current = node;
    while (current) {
      removed++;
      current = current.next;
    }

    this.count -= removed;
    if (this.count < 0) this.count = 0; // segurança extra
  }

  // getElementAt otimizado usando head e tail
  getElementAt(index) {
    if (index < 0 || index >= this.count) return null;

    let current;
    let i;

    //escolhe o lado mais rápido
    if (index < this.count / 2) {
      current = this.head;
      for (i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;
      for (i = this.count - 1; i > index; i--) {
        current = current.previous;
      }
    }

    return current;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }
}