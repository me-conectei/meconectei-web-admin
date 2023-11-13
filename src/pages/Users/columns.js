const columns = [
    {
        name: "uidUser",
        options: {
            display: "excluded",
            filter: false,
            sort: false,
        }
    },
    {
        name: "userName",
        label: "Nome",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "email",
        label: "E-mail",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "phone",
        label: "Telefone",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "companyName",
        label: "Provedor",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "city",
        label: "Cidade",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
        }
    },
];

export default columns;