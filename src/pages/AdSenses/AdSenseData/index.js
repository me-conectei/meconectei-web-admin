import React, { useEffect } from "react";
import {
    Breadcrumbs,
    Link,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    FormControl,
    Tooltip,
    Button,
    TextField,
} from "@material-ui/core";
import Image from "material-ui-image";

import {
    ImageOutlined as ImageIcon
} from "@material-ui/icons";

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { useHistory, useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";

import masks from "utils/mask";

import MaskedTextField from "components/MaskedTextField";

import { useSessionContext } from "context/UserSessionContext";
import { useCompanieContext } from "pages/Companies/context";

const useStyles = makeStyles(theme => ({
    breadcrumb: {
        cursor: "default",
    },
    breadcrumbLink: {
        cursor: "pointer",
    },
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
        width: "40%"
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
        borderRadius: 10,
        transition: "border 200ms",
        "&:hover": {
            border: "2px dashed #536dfe",
        },
        "&:nth-child(1)": {
            border: "none",
        }
    },
    labelImage: {
        width: 200,
        height: 200, 
        color: "#c1c1c2",
        transition: "color 200ms",
        "&:hover": {
            cursor: "pointer",
            color: "#536dfe",
            
        },
    },
    sectionLabel: {
        fontWeight: "bold",
        fontSize: 16,
        paddingTop: 20,
        paddingBottom: 10,
        "&:first-child": {
            paddingTop: 5,
        }
    },
    largeIcon: {
        width: "100%",
        height: "100%",     
    }
}));

const acceptedAttachTypes = [
    "image/png",
    "image/gif",
    "image/jpeg",
];

export default function Users() {
    const {
        companieData,
        fetchCompanieData,
        fulfillSpecificData,
        fulfillImage,
        saveData,
    } = useCompanieContext();
    const { isLoading, startLoading, finishLoading } = useSessionContext();

    const { idCompany } = useParams();

    const asyncFetch = async () => {
        startLoading();
        await fetchCompanieData(idCompany);
        finishLoading();
    }

    useEffect(() => {
        asyncFetch();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    console.log(companieData);
    
    const styles = useStyles();

    const history = useHistory();

    const goBack = () => {
        history.goBack()
    }

    if (isLoading) {
        return null;
    }

    const fulfillData = (dataIndex, { target: { value } }) => {
        if (companieData[dataIndex] === value) {
            return null;
        }

        fulfillSpecificData({ dataIndex, value });
    };

    const handleImage = ({ target: { files } }) => {
        const image = files?.[0];        

        if (!acceptedAttachTypes.includes(image.type)) {
            alert("Selecione apenas arquivos de imagem!");

            return null;
        }

        fulfillImage(image);
    };

    let imageComponent = <ImageIcon className={styles.largeIcon} />;

    if (companieData?.image) {
        let formattedURL = companieData.image;

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

    const onSave = async () => {
        startLoading();
        await saveData(companieData)
        finishLoading();
    };

    return (
        <>
            <Breadcrumbs className={styles.breadcrumb} separator={<NavigateNextIcon fontSize="small" />}>
                <Link className={styles.breadcrumbLink} onClick={goBack}>Provedores</Link>
                <Typography color="textPrimary">
                    {companieData?.fantasyName}
                </Typography>
                <Button variant="contained" color="primary" onClick={onSave}>
                    Salvar
                </Button>
            </Breadcrumbs>
            <Grid container spacing={2}>
                <Grid item lg={3} md={12} sm={12} xs={12}>
                    <Card className={styles.card}>
                        <CardContent className={styles.cardContentImage}>
                            <Box className={styles.sectionLabel}>
                                Minha logo
                            </Box>
                            <Tooltip title="Buscar imagem">
                                <div className={styles.containerImage}>
                                    <label htmlFor="image" className={styles.labelImage}>
                                        <div>                                            
                                            {imageComponent}
                                        </div>
                                    </label>
                                    <input
                                        id="image"
                                        type="file"
                                        hidden
                                        accept={acceptedAttachTypes.toString()}
                                        onChange={handleImage}
                                    />
                                </div>
                            </Tooltip>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={9} md={12} sm={12} xs={12}>
                    <Card className={styles.card}>
                        <CardContent>
                            <Box className={styles.sectionLabel}>
                                Informações do Usuário
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item lg={12} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <TextField
                                            label="Nome Fantasia"
                                            variant="outlined"
                                            size="small"
                                            defaultValue={companieData?.fantasyName}
                                            onChange={fulfillData.bind(null, "fantasyName")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <TextField
                                            label="Razão social"
                                            variant="outlined"
                                            size="small"
                                            defaultValue={companieData?.socialReason}
                                            onChange={fulfillData.bind(null, "socialReason")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <MaskedTextField
                                            label="CNPJ"
                                            variant="outlined"
                                            size="small"
                                            mask={masks.CNPJ}
                                            defaultValue={companieData?.CNPJ}
                                            onChange={fulfillData.bind(null, "CNPJ")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <TextField
                                            label="Inscrição Estadual"
                                            variant="outlined"
                                            size="small"
                                            defaultValue={companieData?.IE}
                                            onChange={fulfillData.bind(null, "IE")}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Box className={styles.sectionLabel}>
                                Contato
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item lg={6} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <TextField
                                            label="E-mail"
                                            variant="outlined"
                                            size="small"
                                            defaultValue={companieData?.emailCommercial}
                                            onChange={fulfillData.bind(null, "emailCommercial")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <MaskedTextField
                                            label="Telefone"
                                            variant="outlined"
                                            mask={masks.CELLPHONE}
                                            defaultValue={companieData?.phoneCommercial}
                                            onChange={fulfillData.bind(null, "phoneCommercial")}
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
                                            defaultValue={companieData?.emailProvider}
                                            onChange={fulfillData.bind(null, "emailProvider")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <MaskedTextField
                                            label="Telefone"
                                            variant="outlined"
                                            size="small"
                                            mask={masks.CELLPHONE}
                                            defaultValue={companieData?.phoneProvider}
                                            onChange={fulfillData.bind(null, "phoneProvider")}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={styles.card}>
                        <CardContent>
                            <Box className={styles.sectionLabel}>
                                Suporte
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item lg={6} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <TextField
                                            label="E-mail"
                                            variant="outlined"
                                            size="small"
                                            defaultValue={companieData?.emailSupport}
                                            onChange={fulfillData.bind(null, "emailSupport")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <MaskedTextField
                                            label="Telefone"
                                            variant="outlined"
                                            size="small"
                                            mask={masks.CELLPHONE}
                                            defaultValue={companieData?.phoneSupport}
                                            onChange={fulfillData.bind(null, "phoneSupport")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <MaskedTextField
                                            label="Whatsapp de suporte"
                                            variant="outlined"
                                            size="small"
                                            mask={masks.CELLPHONE}
                                            defaultValue={companieData?.whatsapp}
                                            onChange={fulfillData.bind(null, "whatsapp")}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={styles.card}>
                        <CardContent>
                            <Box className={styles.sectionLabel}>
                                Endereço
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item lg={6} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <MaskedTextField
                                            label="CEP"
                                            variant="outlined"
                                            size="small"
                                            mask={masks.CEP}
                                            defaultValue={companieData?.CEP}
                                            onChange={fulfillData.bind(null, "CEP")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <TextField
                                            label="Rua"
                                            variant="outlined"
                                            size="small"
                                            defaultValue={companieData?.street}
                                            onChange={fulfillData.bind(null, "street")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <TextField
                                            label="Número"
                                            variant="outlined"
                                            size="small"
                                            defaultValue={companieData?.addressNumber}
                                            onChange={fulfillData.bind(null, "addressNumber")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <TextField
                                            label="Complemento"
                                            variant="outlined"
                                            size="small"
                                            defaultValue={companieData?.addressComplement}
                                            onChange={fulfillData.bind(null, "addressComplement")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <TextField
                                            label="Cidade"
                                            variant="outlined"
                                            size="small"
                                            defaultValue={companieData?.city}
                                            onChange={fulfillData.bind(null, "city")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <FormControl className={styles.formControl} fullWidth>
                                        <TextField
                                            label="Estado"
                                            variant="outlined"
                                            size="small"
                                            defaultValue={companieData?.addressDistrict}
                                            onChange={fulfillData.bind(null, "addressDistrict")}
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
}
