export interface TabType {
  title: string;
  isActive: boolean;
  render: JSX.Element;
  count?: number;
}