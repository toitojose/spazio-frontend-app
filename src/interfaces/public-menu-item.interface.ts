export interface PublicMenuItemInterface {
  label: string;
  icon?: string;
  command?: () => void;
  items?: PublicMenuItemInterface[];
}
