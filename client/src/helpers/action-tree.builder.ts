import {
  Entity, EntityAction, RollCombo, Values,
} from 'tabletop-assistant-common';
import RollHelper from './roll.helper';

interface EntityActionId {
  entityId: string;
  actionKey: string;
}

export interface ActionTreeNode {
  level: number;
  entity: Entity;
  action: EntityAction;
  children: ActionTreeNode[];
  resolvedRoll?: RollCombo,
}

type ActionTree = ActionTreeNode[];

export default ActionTree;

export class ActionTreeBuilder {
  constructor(
    private entities: Entity[],
    private values: Values[],
  ) {}

  build(entityId: string, actionKey: string): ActionTree {
    return this.processNodes(
      [this.createNode({ entityId, actionKey }, 0)],
      1,
    );
  }

  processNodes(nodes: ActionTreeNode[], level: number) {
    let index = 0;

    while (nodes[index]) {
      const node = nodes[index];
      const childActions = this.getRelatedActions(node, false);
      const childNodes: ActionTreeNode[] = childActions
        .map((x) => this.createNode(x, level));
      node.children = this.processNodes(childNodes, level + 1);

      const sibActions = this.getRelatedActions(node, true);
      const sibNodes: ActionTreeNode[] = sibActions
        .map((x) => this.createNode(x, level));
      nodes.push(...sibNodes);

      index += 1;
    }

    return nodes;
  }

  getRelatedActions(
    node: ActionTreeNode,
    sibling: boolean,
  ): EntityActionId[] {
    return this.entities.reduce((related, entity) => {
      const isCurrentEntity = entity === node.entity;
      const actions = entity.actions
        .filter((x) => x.triggers
          .find((trigger) => !trigger.manual
            && Boolean(trigger.sibling) === Boolean(sibling)
            && trigger.entityId === (isCurrentEntity ? '-' : node.entity._id)
            && trigger.actionKey === node.action.key));
      const eaIds = actions.map((x) => ({ entityId: entity._id, actionKey: x.key }));
      return related.concat(eaIds);
    }, [] as EntityActionId[]);
  }

  createNode(eaId: EntityActionId, level: number): ActionTreeNode {
    const entity = this.entities.find((x) => x._id === eaId.entityId);
    if (!entity) throw new Error('No entity found with that id');

    const action = entity.actions.find((x) => x.key === eaId.actionKey);
    if (!action) throw new Error('No action on entity with key');

    return {
      level,
      entity,
      action,
      children: [],
      resolvedRoll: action.roll && RollHelper.resolveComputed(
        action.roll,
        this.entities,
        this.values,
      ),
    };
  }
}
