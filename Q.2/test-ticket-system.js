const TicketSystem = require('./ticket-system');

const system = new TicketSystem();

// Inserindo senhas na lista.
system.issue(1001);
system.issue(1002);
system.issue(1003);
system.issue(1004);
console.log("As senhas foram emitidas\n");

// Verificando senha atual.
console.log("Senha atual (inicial) = " + system.currentTicket() + "\n");

// Testando método de pulo.
console.log("Iniciando os testes de pulo:");
for (let i = 0; i < system.ticketList.size() - 1; i++) {
    system.skip();
    console.log("Senha atual = " + system.currentTicket());
}
console.log();

// Testando ciclo circular.
system.skip();
console.log("Voltando ao início (ciclo circular):");
console.log("Senha atual = " + system.currentTicket() + '\n');

// Removendo a senha atual.
console.log("Removendo a senha atual = " + system.currentTicket());
system.removeTicket(system.currentTicket());
console.log("Nova senha atual = " + system.currentTicket() + '\n');

// Removendo a primeira senha.
console.log("Removendo a primeira senha");
system.removeTicket(system.ticketList.head.data);
// Alternativa:
// system.removeTicket(1002);

// Pula uma senha só para testar resetCycle de forma clara.
system.skip();
console.log("Senha atual após remover a primeira e pular = " + system.currentTicket());

// Resetando ponteiro para o início.
system.resetCycle();
console.log("Após resetCycle, senha atual = " + system.currentTicket() + '\n');

// Removendo a última senha.
console.log("Removendo a última senha");
system.removeTicket(system.ticketList.tail.data);
// Alternativa:
// system.removeTicket(1004);

console.log("Senha atual = " + system.currentTicket() + '\n');

// Teste de ciclo com apenas um elemento.
console.log("Chamadas repetidas (ciclo circular):");
console.log(system.callNext());
console.log(system.callNext());
console.log(system.callNext() + '\n');

// Removendo quando houver apenas uma senha.
console.log("Removendo a última senha restante");
system.removeTicket(1003);
console.log("Senha atual após remover tudo = " + system.currentTicket());
