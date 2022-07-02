import {
  CreateEntity, Entity, EntityActionTrigger, Macro, RollCombo, RollResult, Values,
} from 'tabletop-assistant-common';
import RollHelper from './roll.helper';

interface EntityActionId {
  entityId: string;
  actionKey: string;
}

export interface ActionTreeNode {
  entityId: string;
  actionKey: string;
  combo?: RollCombo;
  macros?: Macro[];
  results: RollResult[];
  children: ActionTreeNode[];
}

type ActionTree = ActionTreeNode[];

export default ActionTree;

export class ActionTreeHelper {
  static createActionTree(
    entityId: string,
    actionKey: string,
    entities: Entity[],
    values: Values[],
  ): ActionTree {
    return this.processNodes(
      [this.createNode({ entityId, actionKey }, entities, values)],
      entities,
      values,
    );
  }

  static createNode(eaId: EntityActionId, entities: Entity[], values: Values[]): ActionTreeNode {
    const entity = entities.find((x) => x._id === eaId.entityId);
    if (!entity) throw new Error('No entity found with that id');

    const action = entity.actions.find((x) => x.key === eaId.actionKey);
    if (!action) throw new Error('No action on entity with key');

    return {
      entityId: entity._id,
      actionKey: action.key,
      combo: action.roll && RollHelper.resolveComputed(action.roll, entities, values),
      macros: action.macros,
      results: [],
      children: [],
    };
  }

  static processNodes(nodes: ActionTreeNode[], entities: Entity[], values: Values[]) {
    let index = 0;

    while (nodes[index]) {
      const node = nodes[index];
      const childActions = this.getRelatedActions(node, entities, false);
      const childNodes: ActionTreeNode[] = childActions
        .map((x) => this.createNode(x, entities, values));
      node.children = this.processNodes(childNodes, entities, values);

      const sibActions = this.getRelatedActions(node, entities, true);
      const sibNodes: ActionTreeNode[] = sibActions
        .map((x) => this.createNode(x, entities, values));
      nodes.push(...sibNodes);

      index += 1;
    }

    return nodes;
  }

  static getRelatedActions(
    node: ActionTreeNode,
    entities: Entity[],
    sibling: boolean,
  ): EntityActionId[] {
    return entities.reduce((related, entity) => {
      const isCurrentEntity = entity._id === node.entityId;
      const actions = entity.actions
        .filter((x) => x.triggers
          .find((trigger) => !trigger.manual
            && Boolean(trigger.sibling) === Boolean(sibling)
            && trigger.entityId === (isCurrentEntity ? '-' : node.entityId)
            && trigger.actionKey === node.actionKey));
      const eaIds = actions.map((x) => ({ entityId: entity._id, actionKey: x.key }));
      return related.concat(eaIds);
    }, [] as EntityActionId[]);
  }

  static findNode(tree: ActionTree, actionId: string): ActionTreeNode {
    return this.findNodes(tree, actionId)[0];
  }

  static findNodes(tree: ActionTree, actionKey: string): ActionTreeNode[] {
    return tree.reduce((arr, node) => {
      const match = node.actionKey === actionKey;
      return arr
        .concat(match ? [node] : [])
        .concat(this.findNodes(node.children, actionKey));
    }, [] as ActionTree);
  }

  static getTriggerString(
    trigger: EntityActionTrigger, current: CreateEntity, entities?: Entity[],
  ): string {
    let text = trigger.manual ? 'Manual' : 'Triggered';
    text += trigger.sibling ? ' (Sibling)' : '';

    const triggerEntity = trigger.entityId === '-'
      ? current
      : entities?.find((x) => x._id === trigger.entityId);
    text += triggerEntity ? ` - ${triggerEntity.name}` : '';
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
}
