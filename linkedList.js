import no from "./node";

function defaultEquals(a, b) {
  return a === b;
}
class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = null;
    this.equalsFn = equalsFn;
  }
  adicionarFinal(valor) {
    const newNo = new no(valor);
    if (this.head === null) {
      this.head = newNo;
    } else {
      let atual = this.head;
      while (atual.next != null) {
        atual = atual.next;
      }
      atual.next = newNo;
    }
    this.count++;
  }
  peek() {
    return this.head;
  }
  adicionarMeio(valor, indice) {
    if (indice >= 0 && indice <= this.count) {
      const newNo = new no(valor);
      if (indice == 0) {
        const atual = this.head;
        newNo.next = atual;
        this.head = newNo;
      } else {
        const anterior = this.getElementAt(indice - 1);
        newNo.next = anterior.next;
        anterior.next = newNo;
      }
      this.count++;
      return true;
    } else {
      console.log("Indice maior que o contador, não pode ser criado");
    }
  }
  getElementAt(indice) {
    if (indice >= 0 && indice < this.count) {
      let node = this.head;
      for (let i = 0; i < indice && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }
  removerIndice(indice) {
    if (indice >= 0 && indice <= this.count) {
      let atual = this.head;
      if (indice == 0) {
        this.head = atual.next;
      } else {
        const anterior = this.getElementAt(indice - 1);
        atual = anterior.next;
        anterior.next = atual.next;
      }
      this.count--;
      return atual.element;
    }
  }
  removerElemento(element) {
    const indice = this.indexOf(element);
    this.removerIndice(indice);
  }
  indexOf(element) {
    let atual = this.head;
    for (let i = 0; i < this.size() && atual != null; i++) {
      if (this.equalsFn(element, atual.data)) {
        return i;
      }
      atual = atual.next;
    }
    return -1;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count;
  }
  getHead() {
    return this.head;
  }
  toString() {
    if (this.head === null) {
      return null;
    } else {
      let objString = `${this.head.data}`;
      let atual = this.head.next;
      while (atual != null) {
        objString = `${objString},${atual.data}`;
        atual = atual.next;
      }
      return objString;
    }
  }
}

/*const linkedList = new LinkedList()
linkedList.adicionarFinal(2)
linkedList.adicionarFinal(5)
linkedList.adicionarMeio(3,0)
linkedList.adicionarMeio(4,2)
console.log(JSON.stringify(linkedList))
console.log(linkedList.toString())
linkedList.removerIndice(2)
linkedList.removerElemento(12)
console.log(JSON.stringify(linkedList))
console.log(linkedList.toString())
console.log(linkedList.removerElemento(5))
console.log(JSON.stringify(linkedList))
console.log(linkedList.toString())
linkedList.getHead()*/
