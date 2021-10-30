import RollCombo from '../rolling/roll-combo';
import RollComboParser from '../rolling/roll-combo-parser';
import GameAction from './game-action';

export interface ActionTreeNode {
  action: GameAction,
  combo?: RollCombo,
  results: RollCombo[],
  children: ActionTreeNode[],
}

type ActionTree = ActionTreeNode[];

export default ActionTree;

export class ActionTreeHelper {
  static createActionTree(action: GameAction, actions: GameAction[]): ActionTree {
    return this.processNodes([this.createNode(action)], actions);
  }

  static processNodes(nodes: ActionTreeNode[], actions: GameAction[]) {
    let index = 0;

    while (nodes[index]) {
      const node = nodes[index];
      const childActions = this.getRelatedActions(node.action, actions, false);
      const childNodes: ActionTreeNode[] = childActions.map((x) => this.createNode(x));
      node.children = this.processNodes(childNodes, actions);

      const sibActions = this.getRelatedActions(node.action, actions, true);
      const sibNodes: ActionTreeNode[] = sibActions.map((x) => this.createNode(x));
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

  static createNode(action: GameAction): ActionTreeNode {
    return {
      action,
      combo: action.roll ? RollComboParser.parse(action.roll, action.id) : undefined,
      results: [],
      children: [],
    };
  }

  static findNode(tree: ActionTree, actionId: string): ActionTreeNode {
    const matches = tree.reduce((arr, node) => {
      const match = node.action.id === actionId;
      return arr
        .concat(match ? [node] : [])
        .concat(this.findNode(node.children, actionId));
    }, [] as ActionTree);

    return matches[0];
  }
}
