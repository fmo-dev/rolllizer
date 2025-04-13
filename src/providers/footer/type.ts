export interface FooterAction {
  icon: React.ReactNode;
  onClick: VoidFunction;
  disabled?: boolean;
  loading?: boolean;
}