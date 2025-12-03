/**
 * 1. Classe CircularLinkedList
 * Implementa uma lista circular simples.
 */
const no = require('./node.js')
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
        this.count === 0 //verifica se é igual em tipo e valor
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
}