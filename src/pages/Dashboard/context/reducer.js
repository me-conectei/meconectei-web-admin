export const initialState = {
    totals: {
        companies: null,
        totalEvaluations: null,
        totalSales: null,
        totalUsers: null,
        totalUsersPlan: null,
    },
    top5CompaniesUsers: [],
    top5CompaniesEvals: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_TOTALS":
            return {
                ...state,
                totals: action.totals,
            };
        
        case "FETCH_TOP_5_COMPANIES_USERS":
            return {
                ...state,
                top5CompaniesUsers: action.top5CompaniesUsers,
            };
        
        case "FETCH_TOP_5_COMPANIES_EVALS":
            return {
                ...state,
                top5CompaniesEvals: action.top5CompaniesEvals,
            };
            
        default:
            return state;
    }
};

export default reducer;