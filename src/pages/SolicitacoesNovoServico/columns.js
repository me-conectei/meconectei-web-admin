import React from "react";
import moment from "moment";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const STATUS_LABELS = {
    ABERTO: "Aberto",
    EM_ATENDIMENTO: "Em atendimento",
    FECHADO: "Fechado",
    CANCELADO: "Cancelado",
};

const useStatusStyles = makeStyles({
    ABERTO: {
        backgroundColor: "#fff3e0",
        color: "#e65100",
        fontWeight: 600,
    },
    EM_ATENDIMENTO: {
        backgroundColor: "#e3f2fd",
        color: "#1565c0",
        fontWeight: 600,
    },
    FECHADO: {
        backgroundColor: "#e8f5e9",
        color: "#2e7d32",
        fontWeight: 600,
    },
    CANCELADO: {
        backgroundColor: "#fafafa",
        color: "#616161",
        fontWeight: 600,
    },
});

function StatusBadge({ value }) {
    const classes = useStatusStyles();
    const label = STATUS_LABELS[value] || value;
    const statusClass = classes[value] || classes.CANCELADO;
    if (!value) return null;
    return (
        <Chip
            size="small"
            label={label}
            className={statusClass}
            style={{ cursor: "default" }}
        />
    );
}

const SERVICO_LABELS = {
    CAMERAS: "Câmeras",
    "NOVO PONTO DE WIFI": "Novo ponto de WiFi",
};

const columns = [
    {
        name: "id",
        label: "ID",
        options: {
            filter: false,
            sort: true,
        },
    },
    {
        name: "nome",
        label: "Nome",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "telefone",
        label: "Telefone",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "servico",
        label: "Serviço",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => SERVICO_LABELS[value] || value,
        },
    },
    {
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => <StatusBadge value={value} />,
        },
    },
    {
        name: "quantidade_cameras",
        label: "Qtd. câmeras",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value) => (value != null ? value : "-"),
        },
    },
    {
        name: "camera_interna",
        label: "Câmera interna",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? "Sim" : "Não"),
        },
    },
    {
        name: "camera_externa",
        label: "Câmera externa",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? "Sim" : "Não"),
        },
    },
    {
        name: "tempo_gravacao_dias",
        label: "Gravação (dias)",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value) => (value != null ? value : "-"),
        },
    },
    {
        name: "provedor_internet",
        label: "Provedor",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value || "-",
        },
    },
    {
        name: "createdAt",
        label: "Data",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) =>
                value ? moment(value).utc().format("DD/MM/YYYY HH:mm") : "-",
        },
    },
];

export default columns;
