import { DoublyLinkedList } from "./doubly-linked-list.js";
export class ActionHistory {
  constructor() {
    // Começa vazio
    this.history = new DoublyLinkedList();
    this.currentAction = null; // Ponteiro da ação atual
  }

  execute(actionDescription) {
    // Adiciona nova ação
    if (this.currentAction && this.currentAction !== this.history.tail)
      this.history.clearFrom(this.currentAction.next); // Apaga futuro
    this.history.insert(actionDescription); // Insere no fim
    this.currentAction = this.history.tail; // Atualiza ponteiro
  }

  undo() {
    if (this.currentAction && this.currentAction.previous) {
      this.currentAction = this.currentAction.previous;
      return true;
    }
    return false;
  }

  redo() {
    if (this.currentAction && this.currentAction.next) {
      this.currentAction = this.currentAction.next;
      return true;
    }
    return false;
  }

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
  isEmpty() {
    return this.history.isEmpty();
  }

  size() {
    return this.history.size();
  }
}
