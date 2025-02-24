
import { Title } from '../../../shared/components/Title';
import './styles.scss';
import { Page } from '../../../shared/components/Page';
import { AppButton } from '../../../shared/components/Button';

import './styles.scss';
import { useAPI } from '../../../providers/api/hooks';
import { useState } from 'react';
import { useAuthenticatedUser } from '../../../providers/authentication/authenticated-user/hooks';

export const SelectRole: React.FC = () => {
  const api = useAPI();
  const { user } = useAuthenticatedUser();
  const [isLoading, setIsLoading] = useState<string>();

  const onRoleSelect = async (profile: string) => {
    setIsLoading(profile);
    try {
      await api.from('user').update({ profile }).eq('id', user.id);
    }
    finally {
      setIsLoading(undefined);
    }
  }

  const renderRoleButton = (role: string, name: string) => (
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
      <Title>Sélectionne ton rôle</Title>
      <div className='content'>
        <p className='description'>
          Tu pourras alterner entre les deux à tout moment.
        </p>
        <div className='buttons'>
          {renderRoleButton('master', 'Maitre du jeu')}
          {renderRoleButton('player', 'Joueur')}
        </div>
      </div>
    </Page>
  )
}