import DisplayType from '../layout/display-type';

export default interface AppObjectDisplay {
  type: DisplayType;
  mapping: {
    [key: string]: string;
  };
}
