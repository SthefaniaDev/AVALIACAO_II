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
    // Volta 1 ação
    return this.currentAction?.prev
      ? ((this.currentAction = this.currentAction.prev), true)
      : false;
  }

  redo() {
    // Avança 1 ação
    return this.currentAction?.next
      ? ((this.currentAction = this.currentAction.next), true)
      : false;
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
<<<<<<< HEAD:Q.1/historico.js
=======

  /*
  Remove um item da lista pelo valor informado
*/

>>>>>>> 1ca8d476677d4086517f92fb7987b813f982fe00:Q.1/action-history.js
}
