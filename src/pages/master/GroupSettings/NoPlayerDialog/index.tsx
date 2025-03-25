import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface NoPlayerDialogProps {
  onClose(): void;
  onConfirm(): void;
}

export const NoPlayerDialog: React.FC<NoPlayerDialogProps> = ({
  onConfirm,
  onClose
}) => {
  const confirm = () => {
    onConfirm();
    onClose();
  }

  return (
    <Dialog open onClose={onClose} >
      <DialogTitle className="dialog-title">
        Ce groupe ne contient aucun joueur
      </DialogTitle>
      <DialogContent className="dialog-content">
        Désirez-vous l'enregistrer quand même ?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Non</Button>
        <Button onClick={confirm}
        >
          Oui
        </Button>
      </DialogActions>
    </Dialog>
  )
}