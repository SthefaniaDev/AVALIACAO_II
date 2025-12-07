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

  /*
  Remove um item da lista pelo valor informado
*/
  removeByValue(value) {
    // Se a lista estiver vazia, não há o que remover
    if (this.history.isEmpty()) {
      return false;
    }

    // Começa a busca pelo início da lista (head)
    let current = this.history.head;

    // Percorre toda a lista enquanto houver nós
    while (current) {
      // Verifica se o valor do nó atual é igual ao valor procurado
      if (current.element === value) {
        // Se o nó a ser removido for o nó atual (currentAction),
        // ajusta o ponteiro para o anterior ou para o próximo
        if (this.currentAction === current) {
          this.currentAction = current.prev ? current.prev : current.next;
        }

        // Caso 1: O nó a ser removido é o primeiro da lista (head)
        if (current === this.history.head) {
          this.history.head = current.next; // O próximo vira o novo head

          if (this.history.head) {
            this.history.head.prev = undefined; // Remove o vínculo com o nó antigo
          } else {
            this.history.tail = null; // Se não sobrar nenhum nó, limpa tail também
          }
        }

        // Caso 2: O nó a ser removido é o último da lista (tail)
        else if (current === this.history.tail) {
          this.history.tail = current.prev; // O anterior vira o novo tail

          if (this.history.tail) {
            this.history.tail.next = undefined; // Remove o vínculo com o nó antigo
          }
        }

        // Caso 3: O nó está no meio da lista
        else {
          current.prev.next = current.next; // O anterior agora aponta para o próximo
          current.next.prev = current.prev; // O próximo agora aponta para o anterior
        }

        // Diminui a contagem de elementos da lista
        this.history.count--;

        // Retorna true pois o valor foi encontrado e removido
        return true;
      }

      // Passa para o próximo nó da lista
      current = current.next;
    }

    // Se chegou aqui, o valor não foi encontrado
    return false;
  }
}
