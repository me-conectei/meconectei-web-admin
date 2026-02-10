import React, { useEffect, useState } from "react";

import { useSessionContext } from "context/UserSessionContext";
import { useSearchLogsContext } from "./context";

import { Grid, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import DataTable from "components/DataTable";
import PageTitle from "components/PageTitle";
import InfoIconCard from "components/InfoIconCard";

import SearchIcon from "@material-ui/icons/Search";

import columns from "./columns";

const DAYS_OPTIONS = [
    { value: "", label: "Todo o período" },
    { value: 7, label: "Últimos 7 dias" },
    { value: 30, label: "Últimos 30 dias" },
    { value: 60, label: "Últimos 60 dias" },
];

export default function SearchLogs() {
    const { fetchSearchLogs, total, list } = useSearchLogsContext();
    const { isLoading, startLoading, finishLoading } = useSessionContext();
    const [days, setDays] = useState("");

    const load = (daysFilter) => {
        startLoading();
        const param = daysFilter === "" ? undefined : Number(daysFilter);
        fetchSearchLogs(param).finally(() => finishLoading());
    };

    useEffect(() => {
        load(days);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleDaysChange = (e) => {
        const value = e.target.value;
        setDays(value);
        load(value);
    };

    if (isLoading && list.length === 0) {
        return null;
    }

    return (
        <>
            <PageTitle title="Log de pesquisas de planos" />
            <Grid container spacing={4}>
                <Grid item lg={3} xs={12}>
                    <InfoIconCard
                        Icon={SearchIcon}
                        totalNumber={total}
                        description="Total de pesquisas"
                        iconColor="#1565c0"
                        iconBoxColor="#e3f2fd"
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel>Período</InputLabel>
                        <Select
                            value={days}
                            onChange={handleDaysChange}
                            label="Período"
                        >
                            {DAYS_OPTIONS.map((opt) => (
                                <MenuItem key={String(opt.value)} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <DataTable data={list} columns={columns} />
                </Grid>
            </Grid>
        </>
    );
}
