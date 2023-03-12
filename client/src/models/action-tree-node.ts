import { Entity, EntityAction } from 'tabletop-assistant-common';

export default interface ActionTreeNode {
  level: number;
  entity: Entity;
  action: EntityAction;

  previous?: ActionTreeNode;
  next?: ActionTreeNode;
  parent?: ActionTreeNode;
  triggeredBy?: ActionTreeNode;
  children: ActionTreeNode[];
}
