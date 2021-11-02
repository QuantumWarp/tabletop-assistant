export default interface ConfigInfo {
  shortName: string;
  name: string;
  description: string;
  image: string;
}

export const defaultConfigInfo: () => ConfigInfo = () => ({
  shortName: '',
  name: '',
  description: '',
  image: '',
});
