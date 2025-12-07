/**
 * 1. Classe CircularLinkedList
 * Implementa uma lista circular simples.
 */
const Node = require("./node.js");
module.exports = class CircularLinkedList {
  constructor() {
    //ponteiros principais
    this.head = null;
    this.tail = null;
    this.noAtual = null;
    this.count = 0;
  }

  //** MÉTODOS ACESSÓRIOS **//

  isEmpty() {
    return this.count === 0; //verifica se é igual em tipo e valor
  }

  size() {
    return this.count; //retorna a quantidade de elementos presentes na lista
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.count = 0;
    this.noAtual = null; //limpa os atributos. retornando ao seu estágio inicial
  }

  /**
 //** MÉTODOS PRINCIPAIS 
 */

  insert(element) {
    const newNo = new Node(element);
    if (this.isEmpty()) {
      // Primeiro nó aponta para si mesmo
      this.head = newNo;
      this.tail = newNo;
      this.noAtual = newNo;
      this.tail.next = this.head;
    } else {
      // Último nó passa a apontar para o novo
      this.tail.next = newNo;
      newNo.next = this.head;
      this.tail = newNo;
    }
    this.count++;
  }

  current() {
    // Caso não exista um nó atual (lista vazia)
    if (this.noAtual === null) {
      return undefined;
    }
    // Retorna o valor armazenado no nó atual da lista circular
    else {
      return this.noAtual.data;
    }
  }

  rotate(steps) {
    // Se a lista estiver vazia, não há como girar
    if (this.isEmpty()) return;

    /** Avança 'steps' posições na lista circular
    // Como a lista é circular, o ponteiro 'noAtual' sempre continuará girando
    */
    for (let i = 0; i < steps; i++) {
      this.noAtual = this.noAtual.next;
    }
    // Retorna o novo nó atual após a rotação
    return this.noAtual;
  }

  next() {
    return this.rotate(1); //serve para avançar
  }

  remove(element) {
    // Se a lista estiver vazia, não há o que remover
    if (this.isEmpty()) {
      return false;
    }

    // Começa a busca sempre pelo head
    let current = this.head;
    let previous = this.tail; // Na lista circular, o "anterior" precisa ser rastreado manualmente

    // Flag para controlar se o elemento foi encontrado
    let found = false;

    // Percorre a lista circular procurando o valor
    do {
      // Verifica se o dado armazenado no nó atual é o valor que queremos remover
      if (current.data === element) {
        found = true; // Marca que encontramos o valor
        break;
      }
      previous = current; // Atualiza o nó anterior
      current = current.next; // Avança para o próximo nó na lista circular

    /** Continua percorrendo até retornar ao início (head),
    // o que indica que demos a volta completa na lista
    */
    } while (current !== this.head);


    /** Se percorremos a lista inteira e o elemento não foi encontrado,
    // não há nada para remover — retorna false
    */
    if (!found) {
      return false;
    }

    /** CASO 1 — Lista com apenas UM nó
    // Se o elemento encontrado é o único da lista,
    // basta zerar todos os ponteiros e voltar ao estado inicial
    */
    if(this.count === 1){
        this.head = null   // Não existe mais primeiro nó
        this.tail = null   // Nem último nó
        this.noAtual = null   // E não há nó atual
    }


    // CASO 2 — Removendo o primeiro nó (head)
    else if(current === this.head){

        // O segundo nó se torna o novo head
        this.head = this.head.next

    /** O tail deve continuar apontando para o novo head,
    //  garantindo que a lista continue circular
    */
        this.tail.next = this.head


    /** Se o nó atual era justamente o que foi removido,
    // movemos o nó atual para o novo head
    */
        if(this.noAtual === current){
            this.noAtual = this.head
        }
    }
    
    // CASO 3 — Removendo o último nó (tail)
    else if(current === this.tail){
        // O nó anterior ao removido passa a ser o novo tail
        this.tail = previous

        // Para manter a circularidade, o novo tail deve apontar para o head
        this.tail.next = this.head
        

    /** Se o nó atual estava apontando para o tail removido,
    // movemos o "cursor" para o início da lista
    */
        if(this.noAtual === current){
            this.noAtual = this.head
        }
    }

    // CASO 4 — Removendo um nó do meio da lista
    else{
    /** Faz o nó anterior "pular" o nó removido,
    // conectando diretamente com o próximo nó
    */
        previous.next = current.next


    /** Se o nó atual era justamente o que foi removido,
    // apontamos o nó atual para o próximo da sequência
    */
        if(this.noAtual === current){
            this.noAtual = current.next
        }
    }
    this.count--   // Depois de remover o nó, reduz o contador total da lista
    return true   //indica que a remoção foi feita com sucesso
  }
};
