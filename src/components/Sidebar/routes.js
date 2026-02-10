
import {
    PieChart as PieChartIcon,
    People as PeopleIcon,
    AccountTree as AccountTreeIcon,
    Feedback as FeedbackIcon,
    TrendingUp as TrendingUpIcon,
    Search as SearchIcon,
} from "@material-ui/icons";

// import Dot from "./components/Dot";

const routes = [
    {
        id: "INDICADORES",
        label: "Indicadores",
        link: "/app/indicadores",
        icon: <PieChartIcon />
    },
    {
        id: "USUARIOS",
        label: "Usuarios",
        link: "/app/usuarios",
        icon: <PeopleIcon />
    },
    {
        id: "PROVEDORES",
        label: "Provedores",
        link: "/app/provedores",
        icon: <AccountTreeIcon />,
    },
    {
        id: "AVALIACOES",
        label: "Avaliações",
        link: "/app/avaliacoes",
        icon: <FeedbackIcon />
    },
     {
         id: "ADS",
         label: "Impulsionamentos",
         link: "/app/impulsionamentos",
         icon: <TrendingUpIcon />,
     },
    {
        id: "LOG_PESQUISAS",
        label: "Log de pesquisas",
        link: "/app/log-pesquisas",
        icon: <SearchIcon />,
    },
];

export default routes;