import React, { useEffect } from "react";
import {
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    FormControl,
    TextField,
    Select,
    MenuItem,
} from "@material-ui/core";

import MaskedTextField from "components/MaskedTextField";
import FieldLabel from "components/FieldLabel";
import BackButton from "components/BackButton";

import { useHistory, useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";

import { useSessionContext } from "context/UserSessionContext";
import { useUserContext } from "pages/Users/context";

import masks from "utils/mask";

const useStyles = makeStyles(theme => ({
    divider: theme.divider,
    buttonSave: theme.button.save,
    card: {
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    sectionLabel: {
        fontWeight: "bold",
        fontSize: 16,
        paddingTop: 20,
        paddingBottom: 10,
        "&:first-child": {
            paddingTop: 5,
            paddingBottom: 20,
        }
    },
    attachLabel: {
        fontWeight: "bold",
        fontSize: 14,
    },
    formControl: {
        paddingTop: 10,
    },
    cardPlan: {
        marginTop: 15,
        backgroundColor: "#f8f8f8",
    },
    formLabel: {
        fontWeight: "bold",
    },
    growFieldLabel: {
        flexGrow: 1,
        color: "#b6b6b6",
    },
    totalPrice: {
        color: "black",
        fontWeight: "bold",
    }
}));

const planDetailsWIFI = {
    1: "Incluso",
    2: "Não incluso",
};

const formatInstalationPrice = price => {
    if (price !== 0 && !price) {
        return null;
    }

    if (price === 0) {
        return "Grátis";
    }

    return `R$ ${price}`;
};

export default function Users() {
    const {
        isLoading,
        startLoading,
        finishLoading
    } = useSessionContext();
    const {
        userData,
        updateData,
        fetchUserData,
        fulfillSpecificData,
    } = useUserContext();

    const { uidUser } = useParams();

    const asyncFetch = async () => {
        startLoading();
        await fetchUserData(uidUser);
        finishLoading();
    };

    useEffect(() => {
        asyncFetch();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const onSave = async () => {
        startLoading();
        await updateData(userData);
        finishLoading();
    };
    
    const styles = useStyles();

    const history = useHistory();

    const goBack = () => {
        history.goBack()
    }

    if (isLoading) {
        return null;
    };

     const fulfillData = (dataIndex, { target: { value } }) => {
        if (userData[dataIndex] === value) {
            return null;
        }

        fulfillSpecificData({ dataIndex, value });
    };

    return (
        <>
            <Box display="flex">
                <Box>
                    <BackButton
                        onClick={goBack}
                        label={userData.userName}
                        simpleOnMobile
                    />
                </Box>
                <Box display="flex" justifyContent="flex-end" flexGrow="1">
                    <Button
                        variant="contained"
                        onClick={onSave}
                        className={styles.buttonSave}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={2}>
                <Grid item lg={8} md={12} sm={12} xs={12}>
                    <Card className={styles.card}>
                        <CardContent>
                            <Box className={styles.sectionLabel}>
                                Informações do Usuário
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item container spacing={2}>
                                    <Grid item lg={6} xs={12}>
                                        <FieldLabel
                                            fullWidth
                                            label="Nome do cliente"
                                            fieldValue={userData?.userName}
                                        />
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                        <FieldLabel
                                            label="E-mail"
                                            fieldValue={userData?.email}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item lg={6} xs={12}>
                                        <FieldLabel
                                            fullWidth
                                            label="Telefone"
                                            fieldValue={userData?.phone}
                                        />
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                        <FieldLabel
                                            label="CPF"
                                            fieldValue={userData?.CPF}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Typography className={styles.sectionLabel}>
                                Endereço
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item container spacing={2}>
                                    <Grid item lg={4} xs={12}>
                                        <FormControl className={styles.formControl} fullWidth>
                                            <MaskedTextField
                                                label="CEP"
                                                variant="outlined"
                                                size="small"
                                                mask={masks.CEP}
                                                defaultValue={userData?.CEP}
                                                onChange={fulfillData.bind(null, "CEP")}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={8} xs={12}>
                                        <FormControl className={styles.formControl} fullWidth>
                                            <TextField
                                                label="Rua"
                                                variant="outlined"
                                                size="small"
                                                defaultValue={userData?.street}
                                                onChange={fulfillData.bind(null, "street")}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item lg={4} xs={12}>
                                        <FormControl className={styles.formControl} fullWidth>
                                            <TextField
                                                label="Número"
                                                variant="outlined"
                                                size="small"
                                                defaultValue={userData?.addressNumber}
                                                onChange={fulfillData.bind(null, "addressNumber")}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} xs={12}>
                                        <FormControl className={styles.formControl} fullWidth>
                                            <TextField
                                                label="Complemento"
                                                variant="outlined"
                                                size="small"
                                                defaultValue={userData?.addressComplement}
                                                onChange={fulfillData.bind(null, "addressComplement")}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item lg={4} xs={12}>
                                        <FormControl className={styles.formControl} fullWidth>
                                            <TextField
                                                label="Cidade"
                                                variant="outlined"
                                                size="small"
                                                defaultValue={userData?.city}
                                                onChange={fulfillData.bind(null, "city")}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} xs={12}>
                                        <FormControl className={styles.formControl} fullWidth>
                                            <TextField
                                                label="Estado"
                                                variant="outlined"
                                                size="small"
                                                defaultValue={userData?.state}
                                                onChange={fulfillData.bind(null, "state")}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={styles.card}>
                        <CardHeader
                            title="Detalhes do plano"
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item container spacing={2}>
                                    <Grid item lg={6} xs={12}>
                                        <Box display="flex">
                                            <Typography>Provedor:</Typography>
                                            <Typography>{userData?.companyName}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                        <Box display="flex">
                                            <Typography>Data início do plano:</Typography>
                                            <Typography>{userData?.effectedAt}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item lg={6} xs={12}>
                                        <Box display="flex">
                                            <Typography>Número do pedido:</Typography>
                                            <Typography>N° #{userData?.idOrder}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                        <Box display="flex">
                                            <Typography>Data final do plano:</Typography>
                                            <Typography>{userData?.expiredAt}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Card className={styles.cardPlan}>
                                <CardContent>
                                    <Typography variant="h6">{userData?.planName}</Typography>
                                    <Box display="flex">
                                        <span className={styles.divider} />
                                    </Box>
                                    <Box display="flex">
                                        <Typography className={styles.growFieldLabel}>Tecnologia:</Typography>
                                        <Typography>{userData?.technology}</Typography>
                                    </Box>
                                    <Box display="flex">
                                        <Typography className={styles.growFieldLabel}>WIFI:</Typography>
                                        <Typography>{planDetailsWIFI[userData?.wifi]}</Typography>
                                    </Box>
                                    <Box display="flex">
                                        <Typography className={styles.growFieldLabel}>Instalação:</Typography>
                                        <Typography>{formatInstalationPrice(userData?.priceInstallation)}</Typography>
                                    </Box>
                                    <Box display="flex">
                                        <Typography className={styles.growFieldLabel}>Tempo de fidelidade:</Typography>
                                        <Typography>{userData?.fidelity}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                    <Card className={styles.card}>
                        <CardHeader
                            title="Status"
                        />
                        <CardContent>
                            <Box display="flex" flexGrow="1">
                                O usuário se encontra:
                            </Box>
                            <Select value={userData?.status} onChange={fulfillData.bind(null, "status")} fullWidth>
                                <MenuItem value={"ativo"}>
                                    <Typography fullWidth>
                                        ATIVO
                                    </Typography>
                                </MenuItem>
                                <MenuItem value={"inativo"}>INATIVO</MenuItem>
                            </Select>
                        </CardContent>
                    </Card>
                    <Card className={styles.card}>
                        <CardHeader
                            title="Detalhes do pagamento"
                        />
                        <CardContent>
                            <Box display="flex">
                                <Typography className={styles.growFieldLabel}>Subtotal:</Typography>
                                <Typography>{userData?.price}</Typography>
                            </Box>
                            <Box display="flex">
                                <Typography className={styles.growFieldLabel}>Instalação:</Typography>
                                <Typography>{planDetailsWIFI[userData?.priceInstallation]}</Typography>
                            </Box>
                            <Box display="flex">
                                <span className={styles.divider} />
                            </Box>
                            <Box display="flex">
                                <Typography className={`${styles.growFieldLabel} ${styles.totalPrice}`}>TOTAL</Typography>
                                <Typography>{planDetailsWIFI[userData?.price]}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    {/*<Card className={styles.card}>
                        <CardHeader
                            title="Anexos"
                        />
                        <CardContent>
                            <Box>
                                <Typography className={styles.attachLabel}>Contratos</Typography>
                                <Box>

                                </Box>
                            </Box>
                            <Box>
                                <Typography className={styles.attachLabel}>Faturas</Typography>
                                <Box>
                                    
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>*/}
                </Grid>
            </Grid>
        </>
  );
}
