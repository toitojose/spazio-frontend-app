import type { MenuItem } from 'primevue/menuitem';

export interface PublicMenuItemInterface extends MenuItem {
  label: string;
  icon: string;
  command?: () => void;
  items?: PublicMenuItemInterface[];
}
