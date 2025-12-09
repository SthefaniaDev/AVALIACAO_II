import { ActionHistory } from "./action-history.js";

const history = new ActionHistory();

console.log("INÍCIO DOS TESTES DO EDITOR DE TEXTO COM UNDO/REDO\n");

// Teste de registrar múltiplas ações
console.log("Teste de registrar múltiplas ações:");
history.execute("Inseriu texto 'Olá'");
history.execute("Formatou em negrito");
history.execute("Apagou última palavra");
console.log("Ações: A → B → C registradas");
console.log("Quantidade de ações: " + history.size());
console.log("Ação atual: " + history.current() + "\n");

// Teste de executar múltiplos undos
console.log("Teste de executar múltiplos undos:");
console.log("Iniciando com ações A → B → C");
console.log("Estado inicial - Ação atual: " + history.current());

console.log("Primeiro undo (volta para B):");
history.undo();
console.log("Ação atual após undo: " + history.current());

console.log("Segundo undo (volta para A):");
history.undo();
console.log("Ação atual após undo: " + history.current());

console.log("Terceiro undo (já na primeira, não faz nada):");
const undoResult = history.undo();
console.log("Resultado do undo (false = não fez nada): " + undoResult);
console.log("Ação atual permanece: " + history.current() + "\n");

// Teste de executar múltiplos redos
console.log("Teste de executar múltiplos redos:");
console.log("Primeiro redo (avança para B):");
history.redo();
console.log("Ação atual após redo: " + history.current());

console.log("Segundo redo (avança para C):");
history.redo();
console.log("Ação atual após redo: " + history.current());

console.log("Terceiro redo (já na última, não faz nada):");
const redoResult = history.redo();
console.log("Resultado do redo (false = não fez nada): " + redoResult);
console.log("Ação atual permanece: " + history.current() + "\n");

// Teste de executar nova ação após undo
console.log("Teste de executar nova ação após undo (cenário fundamental):");

const history2 = new ActionHistory();
history2.execute("Ação A");
history2.execute("Ação B");
history2.execute("Ação C");
console.log("Executadas ações: A → B → C");
console.log("Quantidade inicial: " + history2.size());
console.log("Ação atual inicial: " + history2.current());

console.log("Undo até B:");
history2.undo();
console.log("Ação atual após undo: " + history2.current());

console.log("Executando nova ação D:");
history2.execute("Ação D");
console.log("C deve ser removida do futuro");
console.log("Redo não deve ser mais possível após nova ação");

console.log("Quantidade após nova ação (deve ser 3): " + history2.size());
console.log("Ação atual após nova ação (deve ser D): " + history2.current());

console.log("Tentando redo (deve falhar):");
const redoAfterNew = history2.redo();
console.log("Resultado do redo (false = não funcionou): " + redoAfterNew);
console.log("Ação atual permanece D: " + history2.current() + "\n");

// Teste de limpar todo o histórico
console.log("Teste de limpar todo o histórico:");
const history3 = new ActionHistory();
history3.execute("Teste 1");
history3.execute("Teste 2");
console.log("Histórico com 2 ações, ação atual: " + history3.current());

history3.clearAll();
console.log("Após clearAll():");
console.log("current() deve retornar null: " + history3.current());
console.log("size() deve retornar 0: " + history3.size());

console.log("Undo após limpeza (não deve gerar erro):");
history3.undo();
console.log("Redo após limpeza (não deve gerar erro):");
history3.redo();
console.log();

// Testes de métodos acessórios
console.log("Testes de métodos acessórios:");
const history4 = new ActionHistory();

console.log("isEmpty() em lista vazia (deve ser true): " + history4.isEmpty());

history4.execute("Primeira ação");
console.log("isEmpty() após uma ação (deve ser false): " + history4.isEmpty());
console.log("size() após uma ação (deve ser 1): " + history4.size());

history4.execute("Segunda ação");
history4.execute("Terceira ação");
console.log("size() após três ações (deve ser 3): " + history4.size());

console.log("Testando clearFrom internamente:");
history4.undo(); // Vai para segunda ação
history4.execute("Nova ação após undo");
console.log("size() após clearFrom implícito (deve ser 3): " + history4.size());
console.log("Ação atual: " + history4.current() + "\n");

// Cenário complexo com múltiplas operações
console.log("Cenário complexo com múltiplas operações:");
const historyFinal = new ActionHistory();

historyFinal.execute("Digitar 'Hello'");
historyFinal.execute("Formatar título");
historyFinal.execute("Inserir imagem");
historyFinal.execute("Ajustar margens");
console.log("Sequência inicial de 4 ações");
console.log("Ação atual: " + historyFinal.current());

console.log("Navegando pelo histórico:");
historyFinal.undo();
console.log("Após undo 1: " + historyFinal.current());

historyFinal.undo();
console.log("Após undo 2: " + historyFinal.current());

historyFinal.redo();
console.log("Após redo 1: " + historyFinal.current());

historyFinal.execute("Mudar fonte");
console.log("Nova ação 'Mudar fonte' executada");
console.log("Ação atual: " + historyFinal.current());
console.log("Tamanho do histórico (deve ser 4): " + historyFinal.size());

console.log("Tentando acessar futuro limpo:");
const canRedo = historyFinal.redo();
console.log("Redo possível? (false = não): " + canRedo);
console.log("Ação atual permanece: " + historyFinal.current());
console.log();

// Estado final do sistema
console.log("Estado final do sistema:");
console.log("Quantidade total de ações no histórico: " + historyFinal.size());
console.log("Ação atual: " + historyFinal.current());
console.log("Histórico vazio? " + historyFinal.isEmpty());

console.log("\nTESTES CONCLUÍDOS");