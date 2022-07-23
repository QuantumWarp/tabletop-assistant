import { Entity, EntityAction, RollCombo } from 'tabletop-assistant-common';

export default interface ActionTreeNode {
  level: number;
  entity: Entity;
  action: EntityAction;
  resolvedRoll?: RollCombo;

  previous?: ActionTreeNode;
  next?: ActionTreeNode;
  parent?: ActionTreeNode;
  triggeredBy?: ActionTreeNode;
  children: ActionTreeNode[];
}
