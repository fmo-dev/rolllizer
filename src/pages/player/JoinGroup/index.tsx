import React from "react";

import "./styles.scss";
import Check from '@mui/icons-material/Check';
import { Page } from "../../../shared/components/Page";
import { Content } from "../../../shared/components/Content";
import "./styles.scss"
import { InputLabel, Paper } from "@mui/material";
export const JoinGroup: React.FC = () => {
  const [code, setCode] = React.useState('');

  const onClick = () => {
    console.log(code);
  }

  return (
    <Page
      id="join-group-page"
      title='Rejoindre un groupe'
      footerAction={{
        icon: <Check />,
        onClick,
      }}
    >
      <Content>
        <Paper className="join-group-paper">
          <InputLabel>Entrez le code du groupe</InputLabel>
          <div className="code-input">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="code-input-item">
                {code[index] || '_'}
              </div>
            ))}
            <input
              autoFocus
              onChange={({ target }) => setCode(target.value.replace(/_/g, ''))}
              value={code}
            />
          </div>
        </Paper>
      </Content>
    </Page>
  );
}
