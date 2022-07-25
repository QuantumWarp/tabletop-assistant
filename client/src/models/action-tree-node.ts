import { Entity, EntityAction, ResolvedRollCombo } from 'tabletop-assistant-common';

export default interface ActionTreeNode {
  level: number;
  entity: Entity;
  action: EntityAction;
  resolvedRoll?: ResolvedRollCombo;

  previous?: ActionTreeNode;
  next?: ActionTreeNode;
  parent?: ActionTreeNode;
  triggeredBy?: ActionTreeNode;
  children: ActionTreeNode[];
}
