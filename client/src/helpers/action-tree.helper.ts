import { Entity } from 'tabletop-assistant-common';
import RollCombo from '../models/rolling/roll-combo';
import RollComboParser from '../models/rolling/roll-combo-parser';

interface EntityActionId {
  entityId: string;
  actionKey: string;
}

export interface ActionTreeNode {
  entityId: string;
  actionKey: string;
  combo?: RollCombo;
  results: RollCombo[];
  children: ActionTreeNode[];
}

type ActionTree = ActionTreeNode[];

export default ActionTree;

export class ActionTreeHelper {
  static createActionTree(
    entityId: string,
    actionKey: string,
    entities: Entity[],
  ): ActionTree {
    return this.processNodes(
      [this.createNode({ entityId, actionKey }, entities)],
      entities,
    );
  }

  static createNode(eaId: EntityActionId, entities: Entity[]): ActionTreeNode {
    const entity = entities.find((x) => x._id === eaId.entityId);
    if (!entity) throw new Error('No entity found with that id');

    const action = entity.actions.find((x) => x.key === eaId.actionKey);
    if (!action) throw new Error('No action on entity with key');

    return {
      entityId: entity._id,
      actionKey: action.key,
      combo: action.roll ? RollComboParser.parse(action.roll, action.key) : undefined,
      results: [],
      children: [],
    };
  }

  static processNodes(nodes: ActionTreeNode[], entities: Entity[]) {
    let index = 0;

    while (nodes[index]) {
      const node = nodes[index];
      const childActions = this.getRelatedActions(node, entities, false);
      const childNodes: ActionTreeNode[] = childActions.map((x) => this.createNode(x, entities));
      node.children = this.processNodes(childNodes, entities);

      const sibActions = this.getRelatedActions(node, entities, true);
      const sibNodes: ActionTreeNode[] = sibActions.map((x) => this.createNode(x, entities));
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
      const actions = entity.actions
        .filter((x) => x.triggers
          .find((trigger) => !trigger.manual
            && Boolean(trigger.sibling) === Boolean(sibling)
            && trigger.entityId === node.entityId
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
}
