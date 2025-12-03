/**
 Classe responsável por representar um único nó da lista circular
 */
module.exports = class nodeList{
    constructor(data){
        // Valor que será armazenado dentro do nó
        this.data = data

         // Referência para o próximo nó da lista
        this.next = undefined
    }
}