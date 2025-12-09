const TicketSystem = require('./ticket-system');

const system = new TicketSystem();

console.log("INÍCIO DOS TESTES \n");

// Teste de emissão de múltiplas senhas
system.issue(1001);
system.issue(1002);
system.issue(1003);
system.issue(1004);
console.log("As senhas foram emitidas");
console.log("Quantidade de senhas: " + system.ticketList.size());
console.log("Senha atual: " + system.currentTicket() + "\n");

// Teste de ciclo circular (volta ao início)
console.log("Teste de ciclo circular (6 chamadas consecutivas):");
for (let i = 0; i < 6; i++) {
    console.log("Chamada " + (i+1) + ": " + system.callNext());
}
console.log();

// Teste de skip com apenas uma senha
console.log("Teste de skip com apenas uma senha na lista:");
const sistemaUnico = new TicketSystem();
sistemaUnico.issue(5001);
console.log("Senha atual: " + sistemaUnico.currentTicket());
sistemaUnico.skip();
console.log("Após skip: " + sistemaUnico.currentTicket());
sistemaUnico.skip();
console.log("Após outro skip: " + sistemaUnico.currentTicket() + "\n");

// Teste com lista vazia
console.log("Teste com lista vazia:");
const sistemaVazio = new TicketSystem();
console.log("currentTicket em vazio: " + sistemaVazio.currentTicket());
console.log("callNext em vazio: " + sistemaVazio.callNext());
console.log("skip em vazio: " + sistemaVazio.skip());
console.log("resetCycle em vazio: " + sistemaVazio.resetCycle());
console.log("isEmpty em vazio: " + sistemaVazio.ticketList.isEmpty() + "\n");

// Voltar ao sistema original e testar remoções
system.resetCycle();
console.log("Sistema resetado. Senha atual: " + system.currentTicket());

// Teste de remoção de senha inexistente
console.log("Tentando remover senha inexistente (9999):");
const removidoInexistente = system.removeTicket(9999);
console.log("Remoção retornou: " + removidoInexistente + " (false = não encontrada)\n");

// Teste de circularidade após remoção do meio
console.log("Teste de circularidade após remover senha do meio:");
const sistemaLimpo = new TicketSystem();
sistemaLimpo.issue(2001);
sistemaLimpo.issue(2002);
sistemaLimpo.issue(2003);
console.log("Novo sistema com senhas 2001, 2002, 2003");

sistemaLimpo.removeTicket(2002);
console.log("Senha 2002 removida (era a do meio)");

console.log("Chamadas após remoção (5 chamadas):");
for (let i = 0; i < 5; i++) {
    console.log("Chamada: " + sistemaLimpo.callNext());
}
console.log();

// Teste final de integridade
console.log("Estado final do sistema principal:");
console.log("Tamanho da lista: " + system.ticketList.size());
console.log("Lista vazia? " + system.ticketList.isEmpty());
console.log("Senha atual: " + system.currentTicket());
if (system.ticketList.head) {
    console.log("Primeira senha: " + system.ticketList.head.data);
}
if (system.ticketList.tail) {
    console.log("Última senha: " + system.ticketList.tail.data);
}

console.log("\nTESTES CONCLUÍDOS");