export interface MenuItem {
  id: string;
  icon: string;
  label: string;
  to?: string;
  expanded?: boolean;
  children?: MenuItem[];
}
