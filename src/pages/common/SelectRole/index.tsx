
import { useState } from 'react';

import { Title } from '../../../shared/components/Title';
import { useUser } from '../../../providers/user/hooks';
import { UserProfile } from '../../../providers/user/types';
import { AppButton } from '../../../shared/components/Button';
import { InfoText } from '../../../shared/components/InfoText';
import { Page } from '../../../shared/components/Page';

import './styles.scss';

export const SelectRole: React.FC = () => {
  const { updateUser } = useUser();
  const [isLoading, setIsLoading] = useState<UserProfile>();

  const onRoleSelect = async (profile: UserProfile) => {
    setIsLoading(profile);
    try {
      await updateUser({ profile });
    }
    finally {
      setIsLoading(undefined);
    }
  }

  const renderRoleButton = (role: UserProfile, name: string) => (
    <AppButton
      center
      variant='contained'
      color='primary'
      size='large'
      loading={isLoading === role}
      disabled={![undefined, role].includes(isLoading)}
      onClick={() => onRoleSelect(role)}
    >
      {name}
    </AppButton>
  )

  return (
    <Page id="select-role-page">
      <Title>Première connexion</Title>
      <div className='content'>
        <InfoText title="Sélectionne ton rôle" variant='info'>
          Tu pourras alterner entre les deux à tout moment.
        </InfoText>
        <div className='buttons'>
          {renderRoleButton('master', 'Maitre du jeu')}
          {renderRoleButton('player', 'Joueur')}
        </div>
      </div>
    </Page>
  )
}