export default interface EventAction {
  id: string;
  name: string;
  trigger: 'manual' | 'action';
  macro: string;
}
