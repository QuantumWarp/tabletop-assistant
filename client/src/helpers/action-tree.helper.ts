import { EntityActionTrigger, CreateEntity, Entity } from '@/common';
import ActionTree from '../models/action-tree';
import ActionTreeNode from '../models/action-tree-node';

export default class ActionTreeHelper {
  static findNode(tree: ActionTree, actionId: string): ActionTreeNode {
    return this.findNodes(tree, actionId)[0];
  }

  static findNodes(tree: ActionTree, actionKey: string): ActionTreeNode[] {
    return tree.reduce((arr, node) => {
      const match = node.action.key === actionKey;
      return arr
        .concat(match ? [node] : [])
        .concat(this.findNodes(node.children, actionKey));
    }, [] as ActionTree);
  }

  static getTriggerString(
    trigger: EntityActionTrigger, current: CreateEntity, entities?: Entity[],
  ): string {
    let text = trigger.manual ? 'Manual' : '';

    const triggerEntity = trigger.entityId === '-'
      ? current
      : entities?.find((x) => x._id === trigger.entityId);
    text += triggerEntity ? `${triggerEntity.name}` : '';
    text += trigger.entityId === '-' ? ' (Current)' : '';

    const triggerAction = triggerEntity?.actions
      .find((x) => x.key === trigger.actionKey);
    text += triggerAction ? ` - ${triggerAction.name}` : '';

    return text;
  }

  static triggerCompare(triggerA: EntityActionTrigger, triggerB: EntityActionTrigger): number {
    if (triggerA.manual && !triggerB.manual) return -1;
    if (!triggerA.manual && triggerB.manual) return 1;
    if (triggerA.sibling && !triggerB.sibling) return -1;
    if (!triggerA.sibling && triggerB.sibling) return 1;
    return 0;
  }

  static hasOutput(node?: ActionTreeNode): boolean {
    return Boolean(node
      && (node.action.macros
        || node.action.roll));
  }

  static isBelow(node: ActionTreeNode, other?: ActionTreeNode): boolean {
    return !other || node.level < other.level;
  }
}
