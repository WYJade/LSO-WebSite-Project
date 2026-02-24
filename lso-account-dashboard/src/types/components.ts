import { User, Address, Shipment, AccountUser, NewUserData } from './models';

// Menu Item Interface
export interface MenuItem {
  id: string;
  label: string;
  href: string;
}

// NavigationBar Props
export interface NavigationBarProps {
  currentUser: User | null;
  onLogoClick: () => void;
  onMenuItemClick: (menuItem: MenuItem) => void;
  onSearch: (query: string) => void;
  onLanguageChange: (language: string) => void;
}

// WelcomeHeader Props
export interface WelcomeHeaderProps {
  userName: string;
  illustrationUrl?: string;
}

// Tab Interface
export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

// TabNavigation Props
export interface TabNavigationProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
}

// TrackingCard Props
export interface TrackingCardProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

// ShipmentSection Props
export interface ShipmentSectionProps {
  shipments: Shipment[];
  onOptionSelect: (option: string) => void;
}

// AddressBook Props
export interface AddressBookProps {
  addresses: Address[];
  onAdd: (address: Address) => void;
  onEdit: (id: string, address: Address) => void;
  onDelete: (id: string) => void;
}

// UserManagement Props
export interface UserManagementProps {
  users: AccountUser[];
  onAddUser: (user: NewUserData) => void;
  onRemoveUser: (userId: string) => void;
}
