import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import "./styles.scss";

export const ProfileButton: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button className="profile-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <AccountCircleIcon fontSize="large" />
      </button>
      {isMenuOpen && (
        <div className="profile-menu">
          <button className="profile-menu-item">Profile</button>
          <button className="profile-menu-item">Settings</button>
          <button className="profile-menu-item">Logout</button>
        </div>
      )}
    </>
  )
}