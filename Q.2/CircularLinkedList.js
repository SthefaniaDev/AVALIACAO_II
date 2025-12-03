/**
 * 1. Classe CircularLinkedList
 * Implementa uma lista circular simples.
 */
const No = require('./node.js')
module.exports = class CircularLinkedList {
    constructor() {
        //ponteiros principais
        this.head = null
        this.tail = null
        this.count = 0
        this.noAtual = null
        
    }
//** MÉTODOS ACESSÓRIOS **//
    isEmpty(){
        return this.count === 0 //verifica se é igual em tipo e valor
    }

    size(){
        return this.count //retorna a quantidade de elementos presentes na lista
    }
    
    clear(){
        this.head = null
        this.tail = null
        this.count = 0
        this.noAtual = null  //limpa os atributos. retornando ao seu estágio inicial
    }
/**
//** MÉTODOS PRINCIPAIS */
insert(element){
const newNo = new No(element)
   if (this.isEmpty()) {
        // Primeiro nó aponta para si mesmo
        this.head = newNo
        this.tail = newNo
        this.noAtual = newNo
        this.tail.next = this.head
    }
    else{
        // Último nó passa a apontar para o novo
        this.tail.next = newNo
        newNo.next = this.head
        this.tail = newNo
    }
    this.count++ 
}

current() {
    // Caso não exista um nó atual (lista vazia)
    if(this.noAtual === null){
        return undefined
    }
    // Retorna o valor armazenado no nó atual da lista circular
    else{
        return this.noAtual.data  
    }
}
rotate(steps){
    // Se a lista estiver vazia, não há como girar  
    if (this.isEmpty()) return;

    /** Avança 'steps' posições na lista circular
    // Como a lista é circular, o ponteiro 'noAtual' sempre continuará girando
    */ 
    for (let i = 0; i < steps; i++){
        this.noAtual = this.noAtual.next
    }
    // Retorna o novo nó atual após a rotação
    return this.noAtual
}
next(){
    return this.rotate(1) //serve para avançar  
}
}