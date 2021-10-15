export default interface ActionTrigger {
  manual?: boolean;
  gameObjectId?: string;
  actionId?: string;
  sibling?: boolean;
  sameLevel?: boolean;
}
