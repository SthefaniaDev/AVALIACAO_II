import { ActionHistory } from './historico.js';

// Cria um novo histórico de ações
const editor = new ActionHistory();

console.log("=== TESTANDO O SISTEMA UNDO/REDO ===\n");

// Adiciona algumas ações no editor
editor.execute("Abri o documento");
editor.execute("Digitei o título");
editor.execute("Formatei em negrito");
editor.execute("Salvei o arquivo");

console.log("Ações adicionadas!");
console.log("Ação atual: " + editor.current());
console.log("Quantidade de ações: " + editor.size());
console.log("");

// Testa o undo algumas vezes
console.log("--- Testando UNDO ---");
console.log("Estado inicial: " + editor.current());

editor.undo();
console.log("Após 1º undo: " + editor.current());

editor.undo();
console.log("Após 2º undo: " + editor.current());

editor.undo();
console.log("Após 3º undo: " + editor.current());
console.log("");

// Testa o redo para voltar
console.log("--- Testando REDO ---");
editor.redo();
console.log("Após 1º redo: " + editor.current());

editor.redo();
console.log("Após 2º redo: " + editor.current());
console.log("");

// Teste IMPORTANTE: nova ação depois de dar undo
console.log("--- Nova ação após UNDO (teste importante) ---");
editor.undo(); // Volta uma ação
console.log("Voltei para: " + editor.current());

editor.execute("Adicionei uma imagem"); // Faz algo novo
console.log("Fiz nova ação: " + editor.current());
console.log("Agora tem " + editor.size() + " ações no total");
console.log("");

// Testa limpar tudo
console.log("--- Limpando todo o histórico ---");
editor.clearAll();
console.log("Após limpar tudo:");
console.log("Ação atual: " + editor.current());
console.log("Total de ações: " + editor.size());
console.log("");

// Testa com só uma ação
console.log("--- Teste com uma única ação ---");
editor.execute("Só isso aqui");
console.log("Ação única: " + editor.current());

editor.undo();
console.log("Dei undo: " + editor.current());

editor.redo();
console.log("Dei redo: " + editor.current());
console.log("");

// Testa remover uma ação específica
console.log("--- Removendo uma ação ---");
editor.execute("Primeira ação");
editor.execute("Segunda ação");
editor.execute("Terceira ação");

console.log("Antes de remover: " + editor.current());
editor.removeByValue("Segunda ação");
console.log("Após remover 'Segunda ação': " + editor.current());
console.log("Ficou com " + editor.size() + " ações");

console.log("\n=== Fim dos testes ===");