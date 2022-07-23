import { Entity, EntityAction, RollCombo } from 'tabletop-assistant-common';

export default interface ActionTreeNode {
  level: number;
  entity: Entity;
  action: EntityAction;
  children: ActionTreeNode[];
  resolvedRoll?: RollCombo,
}
