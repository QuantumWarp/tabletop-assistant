import React from 'react';
import {
  Casino,
  AcUnit,
  AccessTime,
  Air,
  Anchor,
  BrightnessHigh,
  Check,
  Close,
  DarkMode,
  Delete,
  Error,
  Favorite,
  FilterDrama,
  FitnessCenter,
  FlashOn,
  GppGood,
  GppBad,
  Grade,
  Hardware,
  HourglassTop,
  ImportContacts,
  Info,
  NightsStay,
  Sailing,
  School,
  Science,
  Sick,
  Terrain,
  Visibility,
  VpnKey,
  Water,
  Restaurant,
  Map,
  VolumeOff,
  Replay,
  Person,
  Explore,
  AirlineSeatIndividualSuite,
  Settings,
  Note,
  BackupTable,
  Autorenew,
  History,
  PlayCircle,
  TextSnippet,
} from '@mui/icons-material';
import { Icon } from '@iconify/react';

enum TabletopIconType {
  anchor = 'Anchor',
  ant = 'Ant',
  apple = 'Apple',
  axe = 'Axe',
  backpack = 'Backpack',
  bed = 'Bed',
  beer = 'Beer',
  bin = 'Bin',
  biohazard = 'Biohazard',
  bird = 'Bird',
  bone = 'Bone',
  book = 'Book',
  bowAndArrow = 'Bow and Arrow',
  brain = 'Brain',
  bridge = 'Bridge',
  butterfly = 'Butterfly',
  campfire = 'Campfire',
  castle = 'Castle',
  chain = 'Chain',
  church = 'Church',
  climb = 'Climb',
  cloud = 'Cloud',
  coinHand = 'Coin Hand',
  coinPurse = 'Coin Purse',
  coins = 'Coins',
  compass = 'Compass',
  cross = 'Cross',
  chest = 'Chest',
  d4 = 'D4',
  d6 = 'D6',
  d8 = 'D8',
  d10 = 'D10',
  d12 = 'D12',
  d20 = 'D20',
  d20Outline = 'D20 Outline',
  die = 'Die',
  doorOpen = 'Door Open',
  doubleDice = 'Double Dice',
  doubleSword = 'Double Sword',
  dragon = 'Dragon',
  eat = 'Eat',
  eclipse = 'Eclipse',
  educate = 'Educate',
  egg = 'Egg',
  exclamation = 'Exclamation',
  eye = 'Eye',
  feet = 'Feet',
  fire = 'Fire',
  fish = 'Fish',
  fist = 'Fist',
  flower = 'Flower',
  frost = 'Frost',
  gem = 'Gem',
  glasses = 'Glasses',
  guitar = 'Guitar',
  grass = 'Grass',
  hammer = 'Hammer',
  health = 'Health',
  heart = 'Heart',
  heavy = 'Heavy',
  history = 'History',
  home = 'Home',
  horse = 'Horse',
  hourglass = 'Hourglass',
  info = 'Info',
  inject = 'Inject',
  key = 'Key',
  keyhole = 'Keyhole',
  knife = 'Knife',
  layout = 'Layout',
  leaf = 'Leaf',
  light = 'Light',
  lightning = 'Lightning',
  loud = 'Loud',
  map = 'Map',
  moon = 'Moon',
  mountain = 'Mountain',
  muscle = 'Muscle',
  necklace = 'Necklace',
  note = 'Note',
  peoplePair = 'People Pair',
  person = 'Person',
  pickaxe = 'Pickaxe',
  play = 'Play',
  potion = 'Potion',
  pray = 'Pray',
  question = 'Question',
  rabbit = 'Rabbit',
  rain = 'Rain',
  redo = 'Redo',
  religion = 'Religion',
  ring = 'Ring',
  run = 'Run',
  sailing = 'Sailing',
  scales = 'Scales',
  setting = 'Setting',
  shieldCross = 'Shield Cross',
  shieldTick = 'Shield Tick',
  skull = 'Skull',
  sick = 'Sick',
  silent = 'Silent',
  speech = 'Speech',
  staff = 'Staff',
  star = 'Star',
  starBubble = 'Star Bubble',
  switch = 'Switch',
  sword = 'Sword',
  tent = 'Tent',
  text = 'Text',
  tick = 'Tick',
  time = 'Time',
  tree = 'Tree',
  tshirt = 'T-Shirt',
  water = 'Water',
  wand = 'Wand',
  wind = 'Wind',
}

export { TabletopIconType };

interface TabletopIconProps {
  icon: TabletopIconType;
}

const TabletopIcon = ({ icon }: TabletopIconProps) => {
  switch (icon) {
    case TabletopIconType.anchor: return (<Anchor />);
    case TabletopIconType.bed: return (<AirlineSeatIndividualSuite />);
    case TabletopIconType.bin: return (<Delete />);
    case TabletopIconType.book: return (<ImportContacts />);
    case TabletopIconType.cloud: return (<FilterDrama />);
    case TabletopIconType.compass: return (<Explore />);
    case TabletopIconType.cross: return (<Close />);
    case TabletopIconType.die: return (<Casino />);
    case TabletopIconType.eat: return (<Restaurant />);
    case TabletopIconType.eclipse: return (<DarkMode />);
    case TabletopIconType.educate: return (<School />);
    case TabletopIconType.exclamation: return (<Error />);
    case TabletopIconType.eye: return (<Visibility />);
    case TabletopIconType.frost: return (<AcUnit />);
    case TabletopIconType.hammer: return (<Hardware />);
    case TabletopIconType.heart: return (<Favorite />);
    case TabletopIconType.heavy: return (<FitnessCenter />);
    case TabletopIconType.history: return (<History />);
    case TabletopIconType.hourglass: return (<HourglassTop />);
    case TabletopIconType.info: return (<Info />);
    case TabletopIconType.key: return (<VpnKey />);
    case TabletopIconType.layout: return (<BackupTable />);
    case TabletopIconType.light: return (<BrightnessHigh />);
    case TabletopIconType.lightning: return (<FlashOn />);
    case TabletopIconType.map: return (<Map />);
    case TabletopIconType.moon: return (<NightsStay />);
    case TabletopIconType.mountain: return (<Terrain />);
    case TabletopIconType.note: return (<Note />);
    case TabletopIconType.person: return (<Person />);
    case TabletopIconType.play: return (<PlayCircle />);
    case TabletopIconType.potion: return (<Science />);
    case TabletopIconType.redo: return (<Replay />);
    case TabletopIconType.sailing: return (<Sailing />);
    case TabletopIconType.shieldCross: return (<GppBad />);
    case TabletopIconType.shieldTick: return (<GppGood />);
    case TabletopIconType.setting: return (<Settings />);
    case TabletopIconType.sick: return (<Sick />);
    case TabletopIconType.silent: return (<VolumeOff />);
    case TabletopIconType.star: return (<Grade />);
    case TabletopIconType.switch: return (<Autorenew />);
    case TabletopIconType.text: return (<TextSnippet />);
    case TabletopIconType.tick: return (<Check />);
    case TabletopIconType.time: return (<AccessTime />);
    case TabletopIconType.water: return (<Water />);
    case TabletopIconType.wind: return (<Air />);

    case TabletopIconType.beer: return (<Icon icon="fa:beer" />);
    case TabletopIconType.biohazard: return (<Icon icon="fa-solid:biohazard" />);
    case TabletopIconType.brain: return (<Icon icon="fa-solid:brain" />);
    case TabletopIconType.chain: return (<Icon icon="fa:chain" />);
    case TabletopIconType.church: return (<Icon icon="fa-solid:church" />);
    case TabletopIconType.d20Outline: return (<Icon icon="fa-solid:dice-d20" />);
    case TabletopIconType.doorOpen: return (<Icon icon="fa-solid:door-open" />);
    case TabletopIconType.doubleDice: return (<Icon icon="fa-solid:dice" />);
    case TabletopIconType.dragon: return (<Icon icon="fa-solid:dragon" />);
    case TabletopIconType.fish: return (<Icon icon="fa-solid:fish" />);
    case TabletopIconType.fist: return (<Icon icon="fa-solid:fist-raised" />);
    case TabletopIconType.gem: return (<Icon icon="fa-solid:gem" />);
    case TabletopIconType.glasses: return (<Icon icon="fa-solid:glasses" />);
    case TabletopIconType.guitar: return (<Icon icon="fa-solid:guitar" />);
    case TabletopIconType.leaf: return (<Icon icon="fa-solid:leaf" />);
    case TabletopIconType.peoplePair: return (<Icon icon="fa-solid:people-arrows" />);
    case TabletopIconType.question: return (<Icon icon="fa-solid:question" />);
    case TabletopIconType.rain: return (<Icon icon="fa-solid:cloud-rain" />);
    case TabletopIconType.religion: return (<Icon icon="fa-solid:bible" />);
    case TabletopIconType.scales: return (<Icon icon="fa-solid:balance-scale" />);
    case TabletopIconType.skull: return (<Icon icon="fa-solid:skull-crossbones" />);
    case TabletopIconType.tree: return (<Icon icon="fa-solid:tree" />);
    case TabletopIconType.tshirt: return (<Icon icon="fa-solid:tshirt" />);
    case TabletopIconType.wand: return (<Icon icon="fa:magic" />);

    case TabletopIconType.axe: return (<Icon icon="mdi:axe-battle" />);
    case TabletopIconType.bowAndArrow: return (<Icon icon="mdi:bow-arrow" />);
    case TabletopIconType.bird: return (<Icon icon="mdi:bird" />);
    case TabletopIconType.butterfly: return (<Icon icon="mdi:butterfly" />);
    case TabletopIconType.campfire: return (<Icon icon="mdi:campfire" />);
    case TabletopIconType.chest: return (<Icon icon="mdi:treasure-chest" />);
    case TabletopIconType.coinHand: return (<Icon icon="mdi:hand-coin" />);
    case TabletopIconType.d4: return (<Icon icon="mdi:dice-d4" />);
    case TabletopIconType.d6: return (<Icon icon="mdi:dice-d6" />);
    case TabletopIconType.d8: return (<Icon icon="mdi:dice-d8" />);
    case TabletopIconType.d10: return (<Icon icon="mdi:dice-d10" />);
    case TabletopIconType.d12: return (<Icon icon="mdi:dice-d12" />);
    case TabletopIconType.d20: return (<Icon icon="mdi:dice-d20" />);
    case TabletopIconType.egg: return (<Icon icon="mdi:egg-outline" />);
    case TabletopIconType.horse: return (<Icon icon="mdi:horse-variant" />);
    case TabletopIconType.knife: return (<Icon icon="mdi:knife" />);
    case TabletopIconType.necklace: return (<Icon icon="mdi:necklace" />);
    case TabletopIconType.pickaxe: return (<Icon icon="mdi:pickaxe" />);
    case TabletopIconType.rabbit: return (<Icon icon="mdi:rabbit" />);
    case TabletopIconType.run: return (<Icon icon="mdi:run" />);
    case TabletopIconType.staff: return (<Icon icon="mdi:magic-staff" />);

    case TabletopIconType.apple: return (<Icon icon="fluent:food-apple-20-filled" />);
    case TabletopIconType.home: return (<Icon icon="fluent:home-12-filled" />);
    case TabletopIconType.loud: return (<Icon icon="fluent:megaphone-loud-20-filled" />);
    case TabletopIconType.tent: return (<Icon icon="fluent:tent-12-filled" />);

    case TabletopIconType.bridge: return (<Icon icon="icon-park-outline:bridge-one" />);
    case TabletopIconType.keyhole: return (<Icon icon="icon-park-outline:keyhole" />);
    case TabletopIconType.muscle: return (<Icon icon="icon-park-outline:muscle" />);
    case TabletopIconType.ring: return (<Icon icon="icon-park-outline:diamond-ring" />);

    case TabletopIconType.bone: return (<Icon icon="si-glyph:bone" />);
    case TabletopIconType.feet: return (<Icon icon="si-glyph:foot-sign" />);

    case TabletopIconType.castle: return (<Icon icon="ic:baseline-castle" />);
    case TabletopIconType.grass: return (<Icon icon="ic:baseline-grass" />);

    case TabletopIconType.ant: return (<Icon icon="twemoji:ant" />);
    case TabletopIconType.backpack: return (<Icon icon="jam:backpack-f" />);
    case TabletopIconType.climb: return (<Icon icon="map:climbing" />);
    case TabletopIconType.coinPurse: return (<Icon icon="clarity:coin-bag-solid" />);
    case TabletopIconType.coins: return (<Icon icon="system-uicons:coins" />);
    case TabletopIconType.doubleSword: return (<Icon icon="ri:sword-line" />);
    case TabletopIconType.fire: return (<Icon icon="ant-design:fire-filled" />);
    case TabletopIconType.flower: return (<Icon icon="ph:flower-lotus-fill" />);
    case TabletopIconType.health: return (<Icon icon="healthicons:health" />);
    case TabletopIconType.inject: return (<Icon icon="whh:antivirus" />);
    case TabletopIconType.pray: return (<Icon icon="la:praying-hands" />);
    case TabletopIconType.starBubble: return (<Icon icon="emojione-monotone:right-anger-bubble" />);
    case TabletopIconType.sword: return (<Icon icon="vaadin:sword" />);
    case TabletopIconType.speech: return (<Icon icon="cil:speech" />);

    default: return (<div>Icon not found</div>);
  }
};

export default TabletopIcon;
