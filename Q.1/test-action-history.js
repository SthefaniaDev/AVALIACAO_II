import { ActionHistory } from "./action-history.js";

function print(title, value) {
  console.log("\n===== ${title} =====");
  console.log(value);
}

console.log("======== INICIANDO TESTES DO SISTEMA DE HISTÓRICO ========");

// --------------------------------------------------------------
// 1. Registrar múltiplas ações (A → B → C)
// --------------------------------------------------------------
const history = new ActionHistory();

history.execute("A");
history.execute("B");
history.execute("C");

print("1) Tamanho da lista após A → B → C", history.size());
print("1) Ação atual deve ser 'C'", history.current());

// --------------------------------------------------------------
// 2. Executar múltiplos undos (C → B → A)
// --------------------------------------------------------------
history.undo(); // C → B
history.undo(); // B → A

print("2) Ação atual após 2 undos (deve ser 'A')", history.current());

// --------------------------------------------------------------
// 3. Executar múltiplos redos
// --------------------------------------------------------------
// A → B → C (já existente)
// ponteiro está em A
history.redo(); // A → B
history.redo(); // B → C

print("3) Ação atual após 2 redos (deve ser 'C')", history.current());

// --------------------------------------------------------------
// 4. Executar nova ação após undo
// Cenário fundamental
// A → B → C
// undo até B
// executar D
// C deve ser apagado do futuro
// --------------------------------------------------------------

const history2 = new ActionHistory();

history2.execute("A");
history2.execute("B");
history2.execute("C");
history2.undo(); // volta para B
history2.execute("D"); // adiciona nova ação, apaga o futuro (C)

print("4) Ação atual deve ser 'D'", history2.current());
print(
  "4) Tamanho da lista após remover futuro (A, B, D) → size=3",
  history2.size()
);

const redoPossible = history2.redo();
print("4) Redo deve falhar após nova ação", redoPossible);

// --------------------------------------------------------------
// 5. Limpar todo o histórico (clearAll)
// --------------------------------------------------------------

const history3 = new ActionHistory();
history3.execute("X");
history3.execute("Y");
history3.clearAll();

print("5) current() após clearAll (deve ser null)", history3.current());
print("5) size() após clearAll (deve ser 0)", history3.size());

// Testando se undo ou redo quebram
print("5) Undo após clearAll (deve ser false e não quebrar)", history3.undo());
print("5) Redo após clearAll (deve ser false e não quebrar)", history3.redo());

// --------------------------------------------------------------
// 6. Testes de métodos acessórios
// --------------------------------------------------------------

const history4 = new ActionHistory();

print("6) isEmpty() em histórico vazio (true)", history4.isEmpty());
history4.execute("Hello");
print("6) isEmpty() após inserir ação (false)", history4.isEmpty());
print("6) size() após 1 ação (deve ser 1)", history4.size());

// Testando clearFrom() diretamente
history4.execute("World");
history4.undo(); // volta para "Hello"
history4.history.clearFrom(history4.currentAction.next); // apaga futuro

print(
  "6) size() após clearFrom() apagar 'World' (deve ser 1)",
  history4.size()
);

console.log("\n======== FIM DOS TESTES ========");