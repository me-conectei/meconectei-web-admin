import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useSessionContext } from "context/UserSessionContext";
import { useEvaluationContext } from "./context";

import { Grid } from "@material-ui/core";
import DataTable from "components/DataTable";
import PageTitle from "components/PageTitle";

import columns from "./columns";

import { makeStyles } from "@material-ui/styles";

const useColumnStyles = makeStyles(theme => ({
    general: {
        color: "#3d81e8",
    },
    instalation: {
        color: "#d48a1b",
    },
    wifi: {
        color: "#3d81e8",
    },
    support: {
        color: "#179048",
    },
}));

export default function Evaluations() {
    const history = useHistory();
    const styles = useColumnStyles();
    const { evaluations, fetchEvaluations } = useEvaluationContext();
    const { isLoading, startLoading, finishLoading } = useSessionContext();

    const asyncFetch = async () => {
        startLoading();
        await fetchEvaluations();
        finishLoading();
    }
    
    useEffect(() => {
        asyncFetch();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) {
        return null;
    }

    return (
        <>
            <PageTitle title="Avaliações" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                <DataTable
                    data={evaluations}
                    columns={columns(styles)}
                    options={{
                        onRowClick: ([idCompany]) => {
                          history.push(`/app/avaliacoes/${idCompany}`);
                        },
                    }}
                />
                </Grid>
            </Grid>
        </>
  );
}
