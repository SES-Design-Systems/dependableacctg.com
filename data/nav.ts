export interface NavItem {
  name: string;
  href: string;
}

export const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "contact" },
  { name: "Tax Deadlines", href: "tax-deadlines" },
];