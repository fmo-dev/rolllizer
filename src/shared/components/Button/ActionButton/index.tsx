import './styles.scss';
import { cn } from "../../../utils";
import { AppButton, AppButtonProps } from "..";

export const ActionButton: React.FC<AppButtonProps> = ({ center, ...props }) => (
  <div className='action-button-wrapper'>
    <AppButton {...props} className={cn(props.className, 'action-button', { center })} />
  </div>
)