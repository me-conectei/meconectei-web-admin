export const initialState = {
    list: [],
    current: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_LIST":
            return {
                ...state,
                list: action.list,
            };
        case "FETCH_ONE":
            return {
                ...state,
                current: action.data,
                list: action.data
                    ? state.list.map((item) =>
                          item.id === action.data.id ? action.data : item
                      )
                    : state.list,
            };
        case "CLEAR_CURRENT":
            return {
                ...state,
                current: null,
            };
        case "UPDATE_CURRENT":
            return {
                ...state,
                current: action.data,
                list: state.list.map((item) =>
                    item.id === action.data.id ? action.data : item
                ),
            };
        case "REMOVE_FROM_LIST":
            return {
                ...state,
                list: state.list.filter((item) => item.id !== action.id),
                current: state.current?.id === action.id ? null : state.current,
            };
        default:
            return state;
    }
};

export default reducer;
