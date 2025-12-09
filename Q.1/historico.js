import { DoublyLinkedList } from "./doubly-linked-list.js";

/**
 * Gerencia o histórico de ações de um editor de texto usando DoublyLinkedList.
 */
export class ActionHistory {
  constructor() {
    this.history = new DoublyLinkedList(); // Usa a lista duplamente encadeada
    this.currentAction = null; // Ponteiro para o nó da ação atual (head por padrão)
  }

  // --- Métodos obrigatórios ---

  /**
   * execute(actionDescription)
   * Insere a nova ação no final do histórico, limpando o "futuro" se necessário.
   */
  execute(actionDescription) {
    // 1. Verificar se o usuário está em um estado de "undo"
    // Se o currentAction não for o tail, significa que há ações no "futuro"
    if (this.currentAction && this.currentAction !== this.history.tail) {
      // 2. Limpar o futuro (Remove todos os nós a partir do próximo do currentAction)
      this.history.clearFrom(this.currentAction.next);
      // O currentAction agora é o tail (já ajustado em clearFrom)
    } else if (this.currentAction === null && !this.history.isEmpty()) {
      // Se currentAction for null, mas a lista tiver conteúdo (situação após clearAll),
      // garante que o ponteiro volte para o tail (ou null se for totalmente vazia)
      this.currentAction = this.history.tail;
    }

    // 3. Insere a nova ação no final (append)
    this.history.insert(actionDescription);

    // 4. Atualiza o ponteiro atual para a nova ação (que é o novo tail)
    this.currentAction = this.history.tail;
  }

  /**
   * undo()
   * Move o ponteiro atual para a ação anterior, se existir.
   */
  undo() {
    if (this.currentAction && this.currentAction.prev) {
      this.currentAction = this.currentAction.prev;
      return true;
    }
    // Se já estiver na primeira ação ou lista vazia, não faz nada.
    return false;
  }

  /**
   * redo()
   * Move o ponteiro atual para a próxima ação, se existir.
   */
  redo() {
    if (this.currentAction && this.currentAction.next) {
      this.currentAction = this.currentAction.next;
      return true;
    }
    // Se estiver na última ação, permanece onde está.
    return false;
  }

  /**
   * current()
   * Retorna a descrição da ação atual.
   */
  current() {
    if (this.currentAction) {
      return this.currentAction.element;
    }
    return null; // Se não houver ações, retorna null.
  }

  /**
   * Limpa todo o histórico.
   */
  clearAll() {
    this.history.clearFrom(this.history.head); // Limpa toda a lista
    this.currentAction = null; // Ponteiro atual deve ser definido como null.
  }

  // --- Métodos acessórios delegados ---

  isEmpty() {
    return this.history.isEmpty();
  }
  
  size() {
    return this.history.size();
  }

<<<<<<< Updated upstream
  /*
  Remove um item da lista pelo valor informado
*/

}
