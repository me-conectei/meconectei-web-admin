import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import {
    Grid,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import BackButton from "components/BackButton";
import PageTitle from "components/PageTitle";

import { useSessionContext } from "context/UserSessionContext";
import { useSolicitacoesNovoServicoContext } from "../context";

import toast from "utils/toast";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    field: {
        marginBottom: theme.spacing(2),
    },
    actions: {
        marginTop: theme.spacing(3),
        display: "flex",
        gap: theme.spacing(2),
    },
}));

const STATUS_OPTIONS = [
    { value: "ABERTO", label: "Aberto" },
    { value: "EM_ATENDIMENTO", label: "Em atendimento" },
    { value: "FECHADO", label: "Fechado" },
    { value: "CANCELADO", label: "Cancelado" },
];

const SERVICO_LABELS = {
    CAMERAS: "Câmeras",
    "NOVO PONTO DE WIFI": "Novo ponto de WiFi",
};

export default function SolicitacaoData() {
    const { id } = useParams();
    const history = useHistory();
    const styles = useStyles();

    const { current, fetchOne, updateOne, deleteOne, clearCurrent } =
        useSolicitacoesNovoServicoContext();
    const { isLoading, startLoading, finishLoading } = useSessionContext();

    const [status, setStatus] = useState("");

    useEffect(() => {
        startLoading();
        fetchOne(id)
            .then(() => {})
            .finally(() => finishLoading());
        return () => clearCurrent();
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (current) setStatus(current.status);
    }, [current]);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        updateOne(Number(id), { status: newStatus })
            .then(() => toast.success("Status atualizado"))
            .catch(() => toast.error("Erro ao atualizar status"));
    };

    const handleDelete = () => {
        if (!window.confirm("Excluir esta solicitação?")) return;
        startLoading();
        deleteOne(Number(id))
            .then(() => {
                toast.success("Solicitação excluída");
                history.push("/app/solicitacoes-novo-servico");
            })
            .catch(() => toast.error("Erro ao excluir"))
            .finally(() => finishLoading());
    };

    if (isLoading && !current) {
        return null;
    }

    if (!current) {
        return (
            <>
                <BackButton onClick={() => history.push("/app/solicitacoes-novo-servico")} />
                <Typography>Solicitação não encontrada.</Typography>
            </>
        );
    }

    return (
        <>
            <Box display="flex" alignItems="center" marginBottom={2}>
                <BackButton onClick={() => history.push("/app/solicitacoes-novo-servico")} />
            </Box>
            <PageTitle title={`Solicitação #${current.id}`} />
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" className={styles.field}>
                                Nome: {current.nome}
                            </Typography>
                            <Typography variant="body1" className={styles.field}>
                                Telefone: {current.telefone}
                            </Typography>
                            <Typography variant="body1" className={styles.field}>
                                Serviço: {SERVICO_LABELS[current.servico] || current.servico}
                            </Typography>
                            <Typography variant="body1" className={styles.field}>
                                Data:{" "}
                                {current.createdAt
                                    ? moment(current.createdAt).utc().format("DD/MM/YYYY HH:mm")
                                    : "-"}
                            </Typography>
                            {current.servico === "CAMERAS" && (
                                <>
                                    <Typography variant="body1" className={styles.field}>
                                        Quantidade de câmeras:{" "}
                                        {current.quantidade_cameras != null
                                            ? current.quantidade_cameras
                                            : "-"}
                                    </Typography>
                                    <Typography variant="body1" className={styles.field}>
                                        Câmera interna: {current.camera_interna ? "Sim" : "Não"}
                                    </Typography>
                                    <Typography variant="body1" className={styles.field}>
                                        Câmera externa: {current.camera_externa ? "Sim" : "Não"}
                                    </Typography>
                                    <Typography variant="body1" className={styles.field}>
                                        Tempo de gravação (dias):{" "}
                                        {current.tempo_gravacao_dias != null
                                            ? current.tempo_gravacao_dias
                                            : "-"}
                                    </Typography>
                                </>
                            )}
                            <Typography variant="body1" className={styles.field}>
                                Provedor de internet:{" "}
                                {current.provedor_internet || "-"}
                            </Typography>

                            <FormControl variant="outlined" fullWidth className={styles.field}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={status}
                                    onChange={handleStatusChange}
                                    label="Status"
                                >
                                    {STATUS_OPTIONS.map((opt) => (
                                        <MenuItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <div className={styles.actions}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleDelete}
                                >
                                    Excluir solicitação
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
