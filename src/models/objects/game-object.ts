import { TabletopIconType } from '../../components/common/TabletopIcon';

export default interface GameObject {
  id: string;
  name: string;
  disabled: boolean;
  icon?: TabletopIconType;
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
