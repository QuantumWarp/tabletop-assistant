import GameAction from './game-action';

export interface ActionTreeNode {
  action: GameAction,
  children: ActionTreeNode[],
}

type ActionTree = ActionTreeNode[];

export default ActionTree;

export class ActionTreeHelper {
  static createActionTree(action: GameAction, actions: GameAction[]): ActionTree {
    return this.processNodes([{ action, children: [] }], actions);
  }

  static processNodes(nodes: ActionTreeNode[], actions: GameAction[]) {
    let index = 0;

    while (nodes[index]) {
      const node = nodes[index];
      const childActions = this.getRelatedActions(node.action, actions, false);
      const childNodes: ActionTreeNode[] = childActions.map((x) => ({ action: x, children: [] }));
      node.children = this.processNodes(childNodes, actions);

      const sibActions = this.getRelatedActions(node.action, actions, true);
      const sibNodes: ActionTreeNode[] = sibActions.map((x) => ({ action: x, children: [] }));
      nodes.push(...sibNodes);

      index += 1;
    }

    return nodes;
  }

  static getRelatedActions(action: GameAction, actions: GameAction[], sibling: boolean) {
    return actions
      .filter((x) => x.triggers
        .find((trigger) => !trigger.manual
          && Boolean(trigger.sibling) === Boolean(sibling)
          && ((trigger.actionId === action.id)
          || (!trigger.actionId && trigger.gameObjectId === action.objectId))));
  }
}
