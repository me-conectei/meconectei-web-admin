import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useSessionContext } from "context/UserSessionContext";
import { useCompanieContext } from "pages/Companies/context";

import { Button, Grid } from "@material-ui/core";
import DataTable from "components/DataTable";
import PageTitle from "components/PageTitle";

import columns from "./columns";

export default function Companies() {
  const history = useHistory();
  const { companies, fetchCompanies } = useCompanieContext();
  const { isLoading, startLoading, finishLoading } = useSessionContext();

  const asyncFetch = async () => {
    startLoading();
    await fetchCompanies();
    finishLoading();
  };

  useEffect(() => {
    asyncFetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageTitle title="Provedores" />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/app/provedores/new");
          }}
        >
          Adicionar provedor
        </Button>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <DataTable
            data={companies}
            columns={columns}
            options={{
              onRowClick: ([idCompany]) => {
                history.push(`/app/provedores/${idCompany}`);
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
