import EventAction from './event-action';

export default interface GameObject {
  id: string;
  name: string;
  description?: string;
  value: any;
  actions?: EventAction[];
}
