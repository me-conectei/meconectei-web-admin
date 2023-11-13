import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

export default function Error() {
  var classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotype}>
        <Typography variant="h3" color="white" className={classes.logotypeText}>
          Me Conectei
        </Typography>
      </div>
      <Paper classes={{ root: classes.paperRoot }}>
        <Typography variant="h3" color="primary" className={classes.textRow}>
          Página não encontrada
        </Typography>
        <Typography variant="h3" color="primary" className={classes.textRow}>
          Talvez você não esteja logado
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          size="large"
          className={classes.backButton}
        >
          Ir para Login
        </Button>
      </Paper>
    </Grid>
  );
}
