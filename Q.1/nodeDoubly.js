//Para representar a cabeça (head) e outros elementos da lista ligada
//criamos DoublyNode
module.exports = class DoublyNode {
  constructor(element) {
    // valor que queremos adicionar na lista
    this.element = element;
    // Ponteiro para o próximo nó (o 'next' da lista simples)
    this.next = undefined;
    // NOVO: Ponteiro para o nó anterior
    this.previous = undefined;
  }
};
