module.exports = class DoublyNode {
  constructor(element) {
    this.element = element;
    // Ponteiro para o próximo nó (o 'next' da lista simples)
    this.next = undefined;
    // NOVO: Ponteiro para o nó anterior
    this.previous = undefined;
  }
};
