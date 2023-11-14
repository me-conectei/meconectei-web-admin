import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  FormControl,
  Tooltip,
  Button,
  TextField,
} from "@material-ui/core";

import toast from "utils/toast";
import Image from "material-ui-image";
import ImageOutlined from "@material-ui/icons/ImageOutlined";

import { useHistory } from "react-router-dom";
import firebase from "../../../firebase/index";
import { makeStyles } from "@material-ui/styles";

import masks from '../../../utils/masks'
//import MaskedTextField from "components/MaskedTextField";
import BackButton from "components/BackButton";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  buttonAccess: {
    marginRight: 20,
    ...theme.button.default,
  },
  buttonSave: theme.button.save,
  flexibleBox: {
    display: "flex",
  },
  columnFlexDirection: {
    display: "flex",
    flexDirection: "column",
  },
  expandedField: {
    flexGrow: 1,
  },
  containerCards: {
    display: "flex",
  },
  column: {
    paddingTop: "10px",
  },
  firstColumn: {
    width: "60%",
    paddingRight: "20px",
  },
  secondColumn: {
    width: "40%",
  },
  card: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  formControl: {
    paddingTop: 10,
  },
  cardContentImage: {
    padding: 10,
  },
  containerImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 220,
    minWidth: 220,
    border: "2px dashed #c1c1c2",
    color: "#c1c1c2",
    borderRadius: 10,
    transition: "border 200ms, color 200ms",
    "&:hover": {
      color: "#536dfe",
      border: "2px dashed #536dfe",
      cursor: "pointer",
    },
    "&:nth-child(1)": {
      border: "none",
    },
  },
  labelImage: {
    width: 200,
    height: 200,
  },
  sectionLabel: {
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 10,
    "&:first-child": {
      paddingTop: 5,
    },
  },
  largeIcon: {
    width: "100%",
    height: "100%",
  },
}));

const acceptedAttachTypes = ["image/png", "image/gif", "image/jpeg"];

const NewCompanie = () => {
  const [fantasyName, setFantasyName] = useState("");
  const [socialReason, setSocialReaseon] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [ie, setIe] = useState("");
  const [emailCommercial, setEmailCommercial] = useState("");
  const [phoneCommercial, setPhoneCommercial] = useState("");
  const [emailProvider, setEmailProvider] = useState("");
  const [phoneProvider, setPhoneProvider] = useState("");
  const [emailSupport, setEmailSupport] = useState("");
  const [phoneSupport, setPhoneSupport] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [addressNumber, setAddressNumber] = useState(" ");
  const [addressComplement, setAddressComplement] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  //const { isLoading, startLoading, finishLoading } = useSessionContext();

  const styles = useStyles();

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const uploadFiles = (files) => {
    const uploadTask = firebase
      .storage()
      .ref(`imageCompany/${files.name}`)
      .put(files);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        console.log(prog)
        //setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        firebase
          .storage()
          .ref("imageCompany")
          .child(`${files.name}`)
          .getDownloadURL()
          .then((url) => {
              console.log('URL', url)
            setImageUrl(url);
          });
      },
    );
  };

  const handleImage = ({ target: { files } }) => {
    const image = files[0];
    console.log('File', image)
    uploadFiles(image);
  };

  

  const onSave = () => {
     // startLoading()      
        const body = {
          fantasyName: fantasyName,
          socialReason: socialReason,
          CNPJ: cnpj,
          IE: ie,
          emailCommercial: emailCommercial,
          phoneCommercial: phoneCommercial,
          emailProvider: emailProvider,
          phoneProvider: phoneProvider,
          emailSupport: emailSupport,
          phoneSupport: phoneSupport,
          whatsapp: whatsapp,
          CEP: cep,
          street: street,
          addressNumber: addressNumber,
          addressComplement: addressComplement,
          addressDistrict: state,
          city: city,
          state: state,
          image: imageUrl,
        };
        try {
          axios.post('https://api-ieaqui.avamobile.com.br/admin/companies/add', body,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
            }
          }).then(()=>{
            toast.success("Registro criado com sucesso!")
          }).error((error)=>{
            toast.error("Por favor preencha todos os dados")
            console.log(error)
          })
        } catch (error) {
          toast.error("Por favor preencha todos os dados")
        }
     
  };


  let imageComponent = <ImageOutlined className={styles.largeIcon} />; 

  if (imageUrl) {
    let formattedURL = imageUrl;

    if (typeof formattedURL === "object") {
        formattedURL = URL.createObjectURL(formattedURL);
    }

    imageComponent = (
        <Image
            src={formattedURL}
            disableTransition
            loading={null}
            imageStyle={{ borderRadius: 15 }}
        />
    );
  }

  const onChangeCEP = async (e) => {
    setCep(e.target.value);

    try {
      const cep = e.target.value.replace('-','');
      if(cep.length === 8) {
        const cepInfos = (await axios.get(`https://viacep.com.br/ws/${cep}/json/`)).data;
        const { logradouro, localidade, uf } = cepInfos;

        if(logradouro)
          setStreet(logradouro);
        if(localidade)
          setCity(localidade);
        if(uf)
          setState(uf);
        if(logradouro && localidade && uf) {
          setAddressNumber('');
          setAddressComplement('');
        }
      }
    } catch (error) {}
  }

  return (
    <>
      <Box display="flex">
        <Box>
          <BackButton
            onClick={goBack}
            label="Provedores"
            simpleOnMobile
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" flexGrow="1">
          <Button variant="contained" className={styles.buttonSave} onClick={onSave}>
            Salvar
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={3} md={12} sm={12} xs={12}>
          <Card className={styles.card}>
            <CardContent className={styles.cardContentImage}>
              <Box className={styles.sectionLabel}>Minha logo</Box>
              <Tooltip title="Buscar imagem">
                <Box className={styles.containerImage}>
                  <label htmlFor="image" className={styles.labelImage}>
                    <div>{imageComponent}</div>
                  </label>
                  <input
                    id="image"
                    type="file"
                    hidden
                    accept={acceptedAttachTypes.toString()}
                    onChange={handleImage}
                  />
                </Box>
              </Tooltip>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={9} md={12} sm={12} xs={12}>
          <Card className={styles.card}>
            <CardContent>
              <Box className={styles.sectionLabel}>Informações do Provedor</Box>
              <Grid container spacing={2}>
                <Grid item lg={12} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="Nome Fantasia"
                      variant="outlined"
                      size="small"
                      value={fantasyName}
                      onChange={(e) => setFantasyName(e.target.value)}
                      // defaultValue={companieData?.fantasyName}
                      //onChange={fulfillData.bind(null, "fantasyName")}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="Razão social"
                      variant="outlined"
                      size="small"
                      value={socialReason}
                      onChange={(e) => setSocialReaseon(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="CNPJ"
                      variant="outlined"
                      size="small"
                      //mask={masks.CNPJ}
                      //defaultValue={cnpj}
                      value={masks.cnpj(cnpj)}
                      onChange={(e) => setCnpj(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="Inscrição Estadual"
                      variant="outlined"
                      size="small"
                      value={ie}
                      onChange={(e) => setIe(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box className={styles.sectionLabel}>Contato</Box>
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="E-mail"
                      variant="outlined"
                      size="small"
                      value={emailCommercial}
                      onChange={(e) => setEmailCommercial(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="Telefone"
                      variant="outlined"
                      size="small"
                      //mask={masks.CELLPHONE}
                      value={masks.phone(phoneCommercial)}
                      onChange={(e) => setPhoneCommercial(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box className={styles.sectionLabel}>
                Responsável pelo Provedor
              </Box>
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="E-mail"
                      variant="outlined"
                      size="small"
                      value={emailProvider}
                      onChange={(e) => setEmailProvider(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="Telefone"
                      variant="outlined"
                      size="small"
                      mask={masks.CELLPHONE}
                      value={masks.phone(phoneProvider)}
                      onChange={(e) => setPhoneProvider(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card className={styles.card}>
            <CardContent>
              <Box className={styles.sectionLabel}>Suporte</Box>
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="E-mail"
                      variant="outlined"
                      size="small"
                      value={emailSupport}
                      onChange={(e) => setEmailSupport(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="Telefone"
                      variant="outlined"
                      size="small"
                      
                      value={masks.phone(phoneSupport)}
                      onChange={(e) => setPhoneSupport(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="Whatsapp de suporte"
                      variant="outlined"
                      size="small"
                     
                      value={masks.phone(whatsapp)}
                      onChange={(e) => setWhatsapp(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card className={styles.card}>
            <CardContent>
              <Box className={styles.sectionLabel}>Endereço</Box>
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="CEP"
                      variant="outlined"
                      size="small"
                      //mask={masks.CEP}
                      value={masks.cep(cep)}
                      onChange={onChangeCEP}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="Rua"
                      variant="outlined"
                      size="small"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={3} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="Número"
                      variant="outlined"
                      size="small"
                      value={addressNumber}
                      onChange={(e) => setAddressNumber(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={3} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="Complemento"
                      variant="outlined"
                      size="small"
                      value={addressComplement}
                      onChange={(e) => setAddressComplement(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={3} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="Cidade"
                      variant="outlined"
                      size="small"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={3} xs={12}>
                  <FormControl className={styles.formControl} fullWidth>
                    <TextField
                      label="Estado"
                      variant="outlined"
                      size="small"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default NewCompanie;
