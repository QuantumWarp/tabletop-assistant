import DisplayType from '../layout/display-type';

export default interface GameObject {
  id: string;
  name: string;
  disabled: boolean;
  defaultDisplay: DisplayType;
  icon?: string;
  description?: string;
  fields: {
    title?: string;
    text?: string;
    value?: number;
    secondaryValue?: number;
    toggle?: boolean;
    secondaryToggle?: boolean;
  };
}
