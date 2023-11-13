import { createCommandService, APIMethods } from "services";
import debounce from "lodash/debounce";
import { DEBOUNCE_TIME } from "utils/constans";

import toast from "utils/toast";

const actions = dispatch => {
    const fulfillUsers = users => ({
        type: "FETCH_USERS",
        users,
    });

    const fulfillUserData = userData => ({
        type: "FETCH_USER",
        userData,
    });

    const fulfillSpecificData = ({ dataIndex, value }) => dispatch({
        type: "FULFILL_SPECIFIC_DATA",
        dataIndex,
        value,
    });

    const fulfillSstatus = value => fulfillSpecificData({ dataIndex: "status", value });

    const fetchUsers = () =>
        createCommandService({
            url: "users",
            onSuccess: ({ data }) => {
                dispatch(fulfillUsers(data.data));
            },
            onCustomError: e => {
                debugger;
            }
        });
    
    const fetchUserData = uidUser =>
        createCommandService({
            url: `users/${uidUser}`,
            onSuccess: ({ data }) => {
                dispatch(fulfillUserData(data.data));
            },
            onCustomError: e => {
                debugger;
            }
        });
    
    const updateData = data =>
        createCommandService({
            method: APIMethods.PUT,
            payload: data,
            url: `users/${data.uidUser}`,
            onSuccess: ({ data }) => {
                toast.success("Registro salvo com sucesso!");
            },
            onCustomError: e => {
                debugger;
            }
        });

    return {
        updateData,
        fetchUsers,
        fetchUserData,
        fulfillSstatus,
        fulfillSpecificData: debounce(fulfillSpecificData, DEBOUNCE_TIME),
    };
}

export default actions;
