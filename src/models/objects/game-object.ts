import { TabletopIconType } from '../../components/common/TabletopIcon';

export default interface GameObject {
  id: string;
  name: string;
  icon?: TabletopIconType;
  description?: string;
  value?: any;
}
