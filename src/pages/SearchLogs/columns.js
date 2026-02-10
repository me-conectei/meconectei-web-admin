import moment from "moment";

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
        name: "locationLabel",
        label: "Local",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, rowMeta) => {
                const row = rowMeta.rowData;
                const lat = row[2];
                const lng = row[3];
                if (value) return value;
                if (lat != null && lng != null) return `${lat}, ${lng}`;
                return "Sem local";
            },
        },
    },
    {
        name: "lat",
        label: "Lat",
        options: {
            filter: false,
            sort: true,
            display: "excluded",
        },
    },
    {
        name: "lng",
        label: "Lng",
        options: {
            filter: false,
            sort: true,
            display: "excluded",
        },
    },
    {
        name: "fidelityFree",
        label: "Sem fidelidade",
        options: {
            filter: true,
            sort: true,
            customBodyRender: value => (value ? "Sim" : "Não"),
        },
    },
    {
        name: "velocity",
        label: "Velocidade (Mbps)",
        options: {
            filter: true,
            sort: true,
            customBodyRender: value => (value != null ? value : "-"),
        },
    },
    {
        name: "technology",
        label: "Tecnologia",
        options: {
            filter: true,
            sort: true,
            customBodyRender: value => value || "-",
        },
    },
    {
        name: "installationFree",
        label: "Instalação grátis",
        options: {
            filter: true,
            sort: true,
            customBodyRender: value => (value ? "Sim" : "Não"),
        },
    },
    {
        name: "resultsCount",
        label: "Planos",
        options: {
            filter: false,
            sort: true,
        },
    },
    {
        name: "uidUser",
        label: "Usuário",
        options: {
            filter: true,
            sort: true,
            customBodyRender: value => value || "Anônimo",
        },
    },
    {
        name: "createdAt",
        label: "Data",
        options: {
            filter: true,
            sort: true,
            customBodyRender: value => {
                const date = moment(value);
                return date.utc().format("DD/MM/YYYY HH:mm");
            },
        },
    },
];

export default columns;
