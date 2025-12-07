const CircularLinkedList = require('./circular-linked-list');

module.exports = class TicketSystem{
    constructor(){
        // Cria a lista circular que irá armazenar as senhas.
        this.ticketList = new CircularLinkedList();
    }

    //Gera uma nova senha e insere na lista.
    issue(number){
        //Inserindo na lista criada no construtor (lista das senhas) com o método insert(element) o número da senha passado como parâmetro.
        this.ticketList.insert(number);
    }

    //Avança a lista circular e retorna a próxima senha a ser atendida.
    callNext(){
        //Avança um passo na lista (step).
        this.ticketList.next();

        //Retorna a senha atual depois de avançar.
        return this.ticketList.current();
    }

    //Pula a senha atual e vai para a seguinte, mantendo o fluxo circular.
    skip(){
        this.ticketList.next();
        //Retorna true só para indicar sucesso na execução do método.
        return true;
    }

    //Remove uma senha específica (ex.: senha cancelada).
    removeTicket(number){
        return this.ticketList.remove(number);
    }

    //Retorna qual senha está sendo atendida no momento.
    currentTicket(){
        return this.ticketList.current();
    }

    //Volta o ponteiro para a primeira senha (caso exista).
    resetCycle(){
        //Se a lista estiver vazia, só retorna null.
        if (this.ticketList.isEmpty()){
            return null;
        }
        
        // Ponteiro volta para o início (head).
        this.ticketList.noAtual = this.ticketList.head;

        // Retorna a primeira senha.
        return this.ticketList.current();
    }
}