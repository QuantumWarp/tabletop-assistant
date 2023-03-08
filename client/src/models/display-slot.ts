export default interface DisplaySlot {
  name: string;
  key: string;
  type: string;
  inverse?: string;
  auto?: string[];
  field?: string;
  value?: any;
}
