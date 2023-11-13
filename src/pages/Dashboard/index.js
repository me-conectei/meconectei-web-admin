import React, { useEffect, useState } from "react";
import { Grid, Card } from "@material-ui/core";
import {
  ResponsiveContainer,
  Cell,
  YAxis,
  XAxis,
  BarChart,
  Bar,
  CartesianGrid,
  Text,
  LabelList,
  Rectangle,
} from "recharts";
import axios from "axios"
import { useSessionContext } from "context/UserSessionContext";
import firebase from "../../firebase/index";
import ReactLoading from 'react-loading';

import useStyles from "./styles";

import Widget from "components/Widget/Widget";
import PageTitle from "components/PageTitle/PageTitle";
import { Typography } from "components/Wrappers/Wrappers";

import {
  People as PeopleIcon,
  CheckBox as CheckBoxIcon,
  AccountTree as AccountTreeIcon,
  TrendingUp as TrendingUpIcon,
} from "@material-ui/icons";


import InfoCard from "components/InfoCard";
import InfoIconCard from "components/InfoIconCard";

import { useDashboardContext } from "./context";

const barchartColors = [
  "#26a0fb",
  "#26e7a6",
  "#febc3b",
  "#ff6178",
  "#8b75d7",
];

const acceptedAttachTypes = ["image/png", "image/gif", "image/jpeg"];

export default function Dashboard(props) {
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [bannerUrl, setBannerUrl] = useState('https://firebasestorage.googleapis.com/v0/b/ieaqui.appspot.com/o/banner%2FbannerFile?alt=media&token=d19c79a1-fa82-462e-96ed-29996eb13572');
  var classes = useStyles();
  
  const CustomizedLabelVertical = ({ x, y, fill, value, barSize }) => {
    let formattedValue = Number(value).toFixed(3);
  
    formattedValue = String(formattedValue).replace(".", ",");
  
    return (
      <Text
        x={x + barSize / 2}
        y={y}
        dy={-6}
        fontSize='16'
        fontFamily='sans-serif'
        fill={fill}
        textAnchor="middle"
      >
        {formattedValue}
      </Text>
    );
  };

  const CustomizedLabelHorizontal = ({ x, y, width, height, value }) => {
  
    const valueSize = String(value).length;

    return (
      <Text
        x={x + width - valueSize - 35}
        y={y + 10 + height / 2} 
        fontSize="24"
        fill="white"
      >
        {value}
      </Text>
    );
  };
  
  const {
    totals,
    top5CompaniesUsers,
    top5CompaniesEvals,
    fetchTotals,
    fetchTop5CompaniesUsers,
    fetchTop5CompaniesEvals,
  } = useDashboardContext();
  const { isLoading, startLoading, finishLoading } = useSessionContext();
  
  const asyncFetch = async () => {
    startLoading();
      await Promise.all([
        fetchTotals(),
        fetchTop5CompaniesUsers(),
        fetchTop5CompaniesEvals(),
      ]);
      finishLoading();
  }


  useEffect(() => {  
   asyncFetch() 
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  
  const valueToMoneyMask = (val) => {
    const value = isNaN(val) ? 0 : val/100
    return `R$ ${value.toFixed(2)}`.replace('.', ',');
  }

  const barSize = 80;

  const handleImage = ({ target: { files } }) => {
    const file = files?.[0];
    if(file) {
      setLoadingBanner(true)
      const uploadTask = firebase
        .storage()
        .ref(`banner/bannerFile`)
        .put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => setLoadingBanner(false),
        () => {
          firebase
          .storage()
          .ref("banner/")
          .child('bannerFile')
          .getDownloadURL()
          .then((url) => {
            setBannerUrl(url);
            setLoadingBanner(false);
          });
        },
      );
    }
  }

  if (isLoading) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <div>
        <PageTitle title="Dashboard" />
        <Grid container spacing={4}>
          <Grid container item spacing={4}>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                  <InfoIconCard
                      Icon={PeopleIcon}
                      totalNumber={totals.totalUsers || 0}
                      description="Usuários Total"
                      iconColor="#ffb200"
                      iconBoxColor="#fff2d5"
                  />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                  <InfoIconCard
                      Icon={CheckBoxIcon}
                      totalNumber={totals.totalUsersPlan || 0}
                      description="Usuários com plano"
                      iconColor="#e41743"
                      iconBoxColor="#fbdce3"
                  />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                  <InfoIconCard
                      Icon={AccountTreeIcon}
                      totalNumber={totals.companies || 0}
                      description="Provedores"
                      iconColor="#4017e4"
                      iconBoxColor="#f0f2fb"
                  />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                  <InfoIconCard
                      Icon={TrendingUpIcon}
                      totalNumber={valueToMoneyMask(totals.totalSales)}
                      description="Total de vendas mês"
                      iconColor="#208069"
                      iconBoxColor="#e1f7f2"
                  />
              </Grid>          
          </Grid>
          <Grid item container spacing={3}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                      <div className={classes.mainChartHeader}>
                          <Typography
                          variant="h3"
                          color="text"
                          >
                          Provedor com mais usuários
                          </Typography>
                      </div>
                      }
                  >
                      <ResponsiveContainer width="100%" minWidth={200} height={350}>
                      <BarChart data={top5CompaniesUsers}  layout="vertical" margin={{ right: 40, left: 40 }}>
                          <XAxis type="number" hide />
                          <YAxis type="category" dataKey="fantasyName" />
                          <CartesianGrid 
                              vertical={false}
                              stroke="#ebf3f0"
                          />
                          <Bar
                          dataKey="quantity"
                          barSize={60}
                          fill="#26a0fb"
                          shape={<Rectangle radius={[0, 8, 8, 0]} />}
                          >
                          <LabelList
                              dataKey="quantity"
                              content={CustomizedLabelHorizontal}
                          />
                          </Bar>
                      </BarChart>
                      </ResponsiveContainer>
                  </Widget>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                      <div className={classes.mainChartHeader}>
                          <Typography
                          variant="h3"
                          color="text"
                          >
                          Melhores Avaliados
                          </Typography>
                      </div>
                      }
                  >
                      <ResponsiveContainer width="100%" minWidth={200} height={350}>
                      <BarChart data={top5CompaniesEvals} >
                          <XAxis dataKey="fantasyName" />
                          <YAxis />
                          <CartesianGrid 
                              vertical={false}
                              stroke="#ebf3f0"
                          />
                          <Bar
                          dataKey="eval"
                          barSize={barSize}
                          label={<CustomizedLabelVertical barSize={barSize} />}
                          >
                          {top5CompaniesEvals.map((evalData, index) => (
                              <Cell key={index} fill={barchartColors[index]}/>
                          ))}
                          <Cell></Cell>
                          </Bar>
                      </BarChart>
                      </ResponsiveContainer>
                  </Widget>
              </Grid>
          </Grid>
          {/*<Grid container item lg={12} xs={12} spacing={4}>
            <Grid item lg={3} md={4} sm={6} xs={12}>  
              <InfoCard
                totalNumber={totals.totalSales}
                description="Faturado Mês"
              />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <InfoCard
                totalNumber={totals.totalEvaluations}
                description="Avaliações"
              />
            </Grid>
          </Grid>*/}
        </Grid>
      </div>
      <div
        style={{
          maxWidth: "250px",
          width: "250px",
          marginLeft: "8px",
          height: "750px",
        }}
      >

        <input
            id="image"
            type="file"
            hidden
            accept={acceptedAttachTypes.toString()}
            onChange={handleImage}
        />
        <div
          style={{width: 250, display: 'flex', justifyContent: 'center', marginBottom: 10}}>
          <label htmlFor="image" style={{color:'blue', textAlign: 'center', cursor: 'pointer'}}>
            <div>Trocar Banner</div>
          </label>
        </div>
        <Card
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loadingBanner ?
            <div style={{width: '250px', height: '750px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <ReactLoading type={'spin'} color={'blue'} height={40} width={40} />
              <label>Carregando</label>
            </div>
          :
            <img src={bannerUrl} alt="banner" style={{width: '250px', height: '750px', objectFit: 'cover'}}/>
          }
        </Card>
      </div>
    </div>
  );
}