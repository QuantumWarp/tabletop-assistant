import { Entity, EntityAction } from '@/common';

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
