import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { useSessionContext } from "context/UserSessionContext";
import { useSolicitacoesNovoServicoContext } from "./context";

import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import DataTable from "components/DataTable";
import PageTitle from "components/PageTitle";

import columns from "./columns";

const STATUS_OPTIONS = [
    { value: "", label: "Todos" },
    { value: "ABERTO", label: "Aberto" },
    { value: "EM_ATENDIMENTO", label: "Em atendimento" },
    { value: "FECHADO", label: "Fechado" },
    { value: "CANCELADO", label: "Cancelado" },
];

const SERVICO_OPTIONS = [
    { value: "", label: "Todos" },
    { value: "CAMERAS", label: "Câmeras" },
    { value: "NOVO PONTO DE WIFI", label: "Novo ponto de WiFi" },
];

export default function SolicitacoesNovoServico() {
    const history = useHistory();
    const { list, fetchList } = useSolicitacoesNovoServicoContext();
    const { isLoading, startLoading, finishLoading } = useSessionContext();
    const [status, setStatus] = useState("");
    const [servico, setServico] = useState("");

    const load = () => {
        startLoading();
        fetchList({
            status: status || undefined,
            servico: servico || undefined,
            limit: 50,
            offset: 0,
        }).finally(() => finishLoading());
    };

    useEffect(() => {
        load();
    }, [status, servico]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleStatusChange = (e) => setStatus(e.target.value);
    const handleServicoChange = (e) => setServico(e.target.value);

    if (isLoading && list.length === 0) {
        return null;
    }

    return (
        <>
            <PageTitle title="Solicitações de novo serviço" />
            <Grid container spacing={4}>
                <Grid item lg={2} xs={12}>
                    <FormControl fullWidth variant="outlined" size="small">
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
                </Grid>
                <Grid item lg={2} xs={12}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel>Serviço</InputLabel>
                        <Select
                            value={servico}
                            onChange={handleServicoChange}
                            label="Serviço"
                        >
                            {SERVICO_OPTIONS.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <DataTable
                        data={list}
                        columns={columns}
                        options={{
                            onRowClick: (_, rowMeta) => {
                                const id = list[rowMeta.rowIndex]?.id;
                                if (id) history.push(`/app/solicitacoes-novo-servico/${id}`);
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}
