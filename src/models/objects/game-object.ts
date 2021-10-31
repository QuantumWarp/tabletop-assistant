import { TabletopIconType } from '../../components/common/TabletopIcon';

export default interface GameObject {
  id: string;
  name: string;
  description?: string;
  icon?: TabletopIconType;
  fields: {
    title?: string;
    text?: string;
    value?: number;
    maxValue?: number;
    disabled?: boolean;
  };
}
