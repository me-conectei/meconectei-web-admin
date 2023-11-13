import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

import { Grid } from "@material-ui/core";
import DataTable from "components/DataTable";
import PageTitle from "components/PageTitle";

import columns from "./columns";

import { useUserContext } from "./context";
import { useSessionContext } from "context/UserSessionContext";

export default function Users() {
    const history = useHistory();
    const { users, fetchUsers } = useUserContext();
    const { isLoading, startLoading, finishLoading } = useSessionContext();

    const asyncFetch = async () => {
        startLoading();
        await fetchUsers();
        finishLoading();
    }
    useEffect(() => {
        asyncFetch();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) {
        return null;
    }

    return (
        <>
            <PageTitle title="Usuários" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                <DataTable
                    data={users}
                    columns={columns}
                    options={{
                        onRowClick: ([uidUser]) => {
                            history.push(`/app/usuarios/${uidUser}`);
                        },
                    }}
                />
                </Grid>
            </Grid>
        </>
  );
}
