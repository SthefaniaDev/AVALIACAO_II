//Para representar a cabeça (head) e outros elementos da lista ligada
//criamos DoublyNode
module.exports = class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
    this.previous = undefined;
  }
};
