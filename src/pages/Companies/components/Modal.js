import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import toast from "utils/toast";
import firebase from '../../../firebase'
import { useSessionContext } from "context/UserSessionContext";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  Divider,
  FormGroup,
  CardHeader,
  TextField,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonBtn: {
    backgroundColor: "#0147E9",
    color: "#ffffff",
    width: 262,
    height: 48,
  },
  sendBtn: {
    backgroundColor: "#46CE7D",
    color: "#ffffff",
    width: 177,
    height: Box,
    borderRadius: 8,
  },
  cancelBtn: {
    backgroundColor: "#a7a7a7",
    color: "#ffffff",
    width: 177,
    height: Box,
    borderRadius: 8,
  },
  buttonAccess: {
    marginRight: 20,
    ...theme.button.default,
  },
}));

const checkedOptions = (value) => {
  if (value === false) {
    return 0;
  } else if (value === true) {
    return 1;
  }
};

export default function ModalDialog({idCompany}) {
 // const { isLoading, startLoading, finishLoading } = useSessionContext();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState('adminpassword')

  const styles = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addUser = () => {
    if(!name) {
      toast.error("Por favor preencha o nome");
      return;
    }
    if(!surname) {
      toast.error("Por favor preencha o sobrenome");
      return;
    }
    if(!email) {
      toast.error("Por favor preencha o e-mail");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((users) => {
        firebase.auth().sendPasswordResetEmail(email).then(()=>{
          console.log('email enviado')
          const body = {
            uidUser: users.user.uid,
            name: name,
            surname: surname,
            email: email,
          };  
          axios.post(
            `https://api-ieaqui.avamobile.com.br/admin/companiesAdmin/${idCompany}`,
            body,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem("sessionToken")}`
              }
            }).then(()=>{
              toast.success(`Convite enviado para ${email}`);
              handleClose()
            }).catch((err)=>{
              console.log(err)
            })  
        }).catch((err)=>{
          console.log(err)
        })      
      })
      .catch((err) => {
        if(err.code == "auth/email-already-in-use")
          toast.error("Este e-mail já foi utilizado na plataforma");
        else if(err.code == "auth/invalid-email")
          toast.error("E-mail inválido");
        else
          toast.error("E-mail inválido para registrar");
        console.log(err);
      });
   
  };
  
  return (
    <React.Fragment>
        <Button
            variant="contained"
            onClick={handleClickOpen}
            className={styles.buttonAccess}
          >
            Adicionar Administrador
          </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar administrador para acesso a plataforma</DialogTitle>
        <DialogContent>
          <Grid item>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item container spacing={2}>
                  <Grid item lg={12} xs={12}>
                    <FormControl className={styles.formControl} fullWidth>
                      <TextField
                        label="Nome"
                        variant="outlined"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item lg={12} xs={12}>
                    <FormControl className={styles.formControl} fullWidth>
                      <TextField
                        label="Sobrenome"
                        variant="outlined"
                        size="small"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item lg={12} xs={12}>
                    <FormControl className={styles.formControl} fullWidth>
                      <TextField
                        label="E-mail"
                        variant="outlined"
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className={styles.cancelBtn} onClick={handleClose}>
            Cancelar
          </Button>
          <Button className={styles.sendBtn} onClick={addUser}>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
