import { Button } from "@mui/material"
import { Page } from "../../../shared/components/Page"
import { useAuthentication } from "../../../providers/authentication/hooks"
import "./styles.scss";
import { Content } from "../../../shared/components/Content";

export const Profile: React.FC = () => {
  const { logout } = useAuthentication();
  return (
    <Page cantGoBack id="profile-page" title='Profile'>
      <Content id="profile-page-content">
        <Button variant="contained" color="primary" onClick={logout}>
          Se déconnecter
        </Button>
      </Content>
    </Page>
  )
}