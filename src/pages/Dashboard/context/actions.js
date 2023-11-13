import { APIMethods, createCommandService } from "services";

const actions = dispatch => {
    const fulfillTotals = totals => ({
        type: "FETCH_TOTALS",
        totals,
    });

    const fulfillTop5CompaniesUsers = top5CompaniesUsers => ({
        type: "FETCH_TOP_5_COMPANIES_USERS",
        top5CompaniesUsers,
    });

    const fulfillTop5CompaniesEvals = top5CompaniesEvals => ({
        type: "FETCH_TOP_5_COMPANIES_EVALS",
        top5CompaniesEvals,
    });

    const fetchTotals = () =>
        createCommandService({
            url: "statistics/totals",
            method: APIMethods.GET,
            onSuccess: ({ data }) => {
                dispatch(fulfillTotals(data.data));
            },
            onCustomError: e => {
                debugger;
            }
        });
    
    const fetchTop5CompaniesUsers = () =>
        createCommandService({
            url: "statistics/top5CompaniesUsers",
            method: APIMethods.GET,
            onSuccess: ({ data }) => {
                dispatch(fulfillTop5CompaniesUsers(data.data));
            },
            onCustomError: e => {
                debugger;
            }
        });
    
    const fetchTop5CompaniesEvals = () =>
        createCommandService({
            url: "statistics/top5CompaniesEvals",
            method: APIMethods.GET,
            onSuccess: ({ data }) => {
                dispatch(fulfillTop5CompaniesEvals(data.data));
            },
            onCustomError: e => {
                debugger;
            }
        });

    return {
        fetchTotals,
        fetchTop5CompaniesUsers,
        fetchTop5CompaniesEvals,
    };
}

export default actions;