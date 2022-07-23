import { Entity, ValueMap } from 'tabletop-assistant-common';
import ActionTree from '../models/action-tree';
import ActionTreeNode from '../models/action-tree-node';
import RollHelper from './roll.helper';

interface EntityActionId {
  entityId: string;
  actionKey: string;
}

export default class ActionTreeBuilder {
  latest?: ActionTreeNode;

  constructor(
    private entities: Entity[],
    private valueMaps: ValueMap[],
  ) {}

  build(entityId: string, actionKey: string): ActionTree {
    return this.processNodes([
      this.createNode({ entityId, actionKey }),
    ]);
  }

  processNodes(nodes: ActionTreeNode[]) {
    let index = 0;

    while (nodes[index]) {
      const node = nodes[index];

      if (this.latest) {
        this.latest.next = node;
        node.previous = this.latest;
      }
      this.latest = node;

      const childActions = this.getRelatedActions(node, false);
      const childNodes: ActionTreeNode[] = childActions
        .map((x) => this.createNode(x, node, node));
      node.children = this.processNodes(childNodes);

      const sibActions = this.getRelatedActions(node, true);
      const sibNodes: ActionTreeNode[] = sibActions
        .map((x) => this.createNode(x, node, node.parent));
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

  createNode(
    eaId: EntityActionId, triggeredBy?: ActionTreeNode, parent?: ActionTreeNode,
  ): ActionTreeNode {
    const entity = this.entities.find((x) => x._id === eaId.entityId);
    if (!entity) throw new Error('No entity found with that id');

    const action = entity.actions.find((x) => x.key === eaId.actionKey);
    if (!action) throw new Error('No action on entity with key');

    return {
      level: parent ? parent.level + 1 : 0,
      entity,
      action,
      resolvedRoll: action.roll && RollHelper.resolveComputed(
        action.roll,
        this.entities,
        this.valueMaps,
      ),

      parent,
      triggeredBy,
      children: [],
    };
  }
}
