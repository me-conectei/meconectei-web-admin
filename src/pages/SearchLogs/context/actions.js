import { createCommandService } from "services";
import mock from "../mock";

const actions = dispatch => {
    const fulfillSearchLogs = (total, list) => ({
        type: "FETCH_SEARCH_LOGS",
        total,
        list,
    });

    const fetchSearchLogs = (days) => {
        if (process.env.NODE_ENV === "development") {
            return Promise.resolve(mock).then(({ data }) => {
                dispatch(fulfillSearchLogs(data.total, data.list));
            });
        }
        const url = days ? `searchLogs?days=${days}` : "searchLogs";
        return createCommandService({
            url,
            method: "get",
            onSuccess: ({ data }) => {
                dispatch(fulfillSearchLogs(data.data.total, data.data.list));
            },
            onCustomError: () => {},
        });
    };

    return {
        fetchSearchLogs,
    };
};

export default actions;
