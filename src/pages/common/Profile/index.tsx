import { Button } from "@mui/material"
import { Page } from "../../../shared/components/Page"
import { useAuthentication } from "../../../providers/authentication/hooks"

export const Profile: React.FC = () => {
  const { logout } = useAuthentication();
  return (
    <Page cantGoBack id="profile-page" title='Profile'>
      <div className="profile-page-content">
        <Button variant="contained" color="primary" onClick={logout}>
          Se déconnecter
        </Button>
      </div>
    </Page>
  )
}