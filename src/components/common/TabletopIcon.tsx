import React from 'react';
import Casino from '@mui/icons-material/Casino';
import { Icon } from '@iconify/react';

enum TabletopIconType {
  bow = 'Bow and Arrow',
  die = 'Die',
  doubleSword = 'Double Sword',
  health = 'Health',
  sword = 'Sword',
}

export { TabletopIconType };

interface TabletopIconProps {
  icon: TabletopIconType;
}

const TabletopIcon = ({ icon }: TabletopIconProps) => {
  switch (icon) {
    case TabletopIconType.bow: return (<Icon icon="mdi:bow-arrow" />);
    case TabletopIconType.die: return (<Casino />);
    case TabletopIconType.doubleSword: return (<Icon icon="ri:sword-line" />);
    case TabletopIconType.health: return (<Icon icon="healthicons:health" />);
    case TabletopIconType.sword: return (<Icon icon="vaadin:sword" />);
    default: return (<div>Icon not found</div>);
  }
};

export default TabletopIcon;
