import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

import useStyles from "./styles";

import Header from "components/Header";
import Sidebar from "components/Sidebar";

import Dashboard from "pages/Dashboard";
import Users from "pages/Users";
import UserData from "pages/Users/UserData";
import Companies from "pages/Companies";
import CompanieData from "pages/Companies/CompanieData";
import Evaluations from "pages/Evaluations";
import EvaluationData from "pages/Evaluations/EvaluationData";
import AdSenses from "pages/AdSenses";
import Support from "pages/Support";

import { useLayoutState } from "context/LayoutContext";

import NewCompanie from "pages/Companies/NewCompanie";

function Layout(props) {
  var classes = useStyles();
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/indicadores" component={Dashboard} />
              <Route exact path="/app/usuarios" component={Users} />
              <Route path="/app/usuarios/:uidUser" component={UserData} />
              <Route exact path="/app/provedores" component={Companies} />
              <Route path="/app/provedores/new" component={NewCompanie} />
              <Route path="/app/provedores/:idCompany" component={CompanieData} />
              <Route exact path="/app/avaliacoes" component={Evaluations} />
              <Route path="/app/avaliacoes/:idCompany" component={EvaluationData} />
              <Route path="/app/impulsionamentos" component={AdSenses} />
              <Route path="/app/suporte" component={Support} />
            </Switch>          
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
