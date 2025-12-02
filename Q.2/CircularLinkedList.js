/**
 * 1. Classe CircularLinkedList
 * Implementa uma lista circular simples.
 */
module.exports = class CircularLinkedList {
    constructor() {
        //ponteiros principais
        this.head = null
        this.tail = null
        this.count = 0
        this.noAtual = null
        
    }
//MÉTODOS ACESSÓRIOS//
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
}