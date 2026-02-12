export const initialState = {
    total: 0,
    list: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_SEARCH_LOGS":
            return {
                ...state,
                total: action.total,
                list: action.list,
            };
        default:
            return state;
    }
};

export default reducer;
