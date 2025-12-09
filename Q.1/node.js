//Para representar a cabeça (head) e outros elementos da lista ligada
//criamos DoublyNoded
export default class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
  }
}
