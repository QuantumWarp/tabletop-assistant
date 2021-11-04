import { TabletopIconType } from '../../components/common/TabletopIcon';

export default interface GameObject {
  id: string;
  name: string;
  disabled?: boolean;
  description?: string;
  icon?: TabletopIconType;
  fields: {
    title?: string;
    text?: string;
    value?: number;
    secondaryValue?: number;
    toggle?: boolean;
  };
}
